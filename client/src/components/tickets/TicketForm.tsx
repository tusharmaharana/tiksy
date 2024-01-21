import React from 'react';
import AppLayout from '../widgets/AppLayout';
import { Button } from '../ui/button';
import { useAppRoute } from '../hooks/useAppRoute';
import { Field, useForm, withFormProvider } from 'react-recoil-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import AppSelect from '../widgets/AppSelect';
import { SeverityFilterOptions, TypeFilterOptions } from './ticket.utils';
import { Textarea } from '../ui/textarea';
import { closeBackdrop, openBackdrop } from '../widgets/AppBackdrop';
import { useSaveTickets } from './ticket.queries';
import toast from 'react-hot-toast';

const TicketForm = () => {
	const { goBack } = useAppRoute();
	const { handleSubmit } = useForm({
		onSubmit,
	});
	const { mutate: saveTicket } = useSaveTickets();

	function onSubmit(values) {
		openBackdrop({});
		saveTicket(values, {
			onSuccess: () => {
				toast.success(`Ticket created successfully`);
				closeBackdrop();
				goBack('/tickets');
			},
			onError: (err: any) => {
				toast.error('Failed to create ticket');
				closeBackdrop();
			},
		});
	}
	return (
		<AppLayout
			header={{
				title: 'Create a ticket',
				children: (
					<div className='flex flex-row gap-2'>
						<Button variant='outline' onClick={() => goBack()}>
							Cancel
						</Button>
						<Button variant='default' onClick={() => handleSubmit()}>
							Submit
						</Button>
					</div>
				),
			}}
			bodyClassName='p-4'
		>
			<div className='grid grid-cols-2 gap-4'>
				<div className='mb-3 flex flex-col gap-2'>
					<Label htmlFor='topic' className='text-gray-500 uppercase'>
						Topic *
					</Label>
					<Field name='topic' required>
						<Input type='text' id='topic' />
					</Field>
				</div>
				<div className='mb-3 flex flex-col gap-2'>
					<Label className='text-gray-500 uppercase'>Type *</Label>
					<Field name='type' required>
						{({ value, onChange, error }) => <AppSelect value={value} onChange={onChange} options={TypeFilterOptions} error={error} />}
					</Field>
				</div>
				<div className='mb-3 flex flex-col gap-2'>
					<Label className='text-gray-500 uppercase'>Severity *</Label>
					<Field name='severity' required>
						{({ value, onChange, error }) => (
							<AppSelect value={value} onChange={onChange} options={SeverityFilterOptions} error={error} />
						)}
					</Field>
				</div>
			</div>
			<div className='mt-4 flex flex-col gap-2'>
				<Label htmlFor='description' className='text-gray-500 uppercase'>
					Description *
				</Label>
				<Field name='description' required>
					<Textarea placeholder='Write a description' />
				</Field>
			</div>
		</AppLayout>
	);
};

export default withFormProvider(TicketForm, {
	skipRecoilRoot: true,
});
