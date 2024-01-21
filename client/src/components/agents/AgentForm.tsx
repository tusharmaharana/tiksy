import toast from 'react-hot-toast';
import { Field, useForm, withFormProvider } from 'react-recoil-form';
import { useAppRoute } from '../hooks/useAppRoute';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { closeBackdrop, openBackdrop } from '../widgets/AppBackdrop';
import AppLayout from '../widgets/AppLayout';
import { useSaveAgents } from './agent.queries';
import { emailRegExp } from '@/utility/utility';

const AgentForm = () => {
	const { goBack } = useAppRoute();
	const { handleSubmit } = useForm({
		onSubmit,
	});
	const { mutate: saveAgent } = useSaveAgents();

	function onSubmit(values) {
		openBackdrop({});
		saveAgent(values, {
			onSuccess: () => {
				toast.success(`Agent created successfully`);
				closeBackdrop();
				goBack('/agents');
			},
			onError: (err: any) => {
				toast.error('Failed to create agent');
				closeBackdrop();
			},
		});
	}
	return (
		<AppLayout
			header={{
				title: 'Create a agent',
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
					<Label htmlFor='name' className='text-gray-500 uppercase'>
						Name *
					</Label>
					<Field name='name' required>
						<Input type='text' id='name' />
					</Field>
				</div>
				<div className='mb-3 flex flex-col gap-2'>
					<Label htmlFor='email' className='text-gray-500 uppercase'>
						email *
					</Label>
					<Field
						name='email'
						validate={(value) => {
							if (!value) return 'Required';
							if (value && !emailRegExp.test(value)) {
								return 'Invalid Email';
							}
						}}
					>
						<Input type='email' id='email' />
					</Field>
				</div>
				<div className='mb-3 flex flex-col gap-2'>
					<Label htmlFor='phone' className='text-gray-500 uppercase'>
						phone *
					</Label>
					<Field name='phone' required>
						<Input type='text' id='phone' isNumber />
					</Field>
				</div>
				<div className='mb-3 flex flex-col gap-2'>
					<Label htmlFor='description' className='text-gray-500 uppercase'>
						description *
					</Label>
					<Field name='description' required>
						<Input type='text' id='description' />
					</Field>
				</div>
			</div>
		</AppLayout>
	);
};

export default withFormProvider(AgentForm, {
	skipRecoilRoot: true,
});
