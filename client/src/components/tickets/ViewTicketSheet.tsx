import React, { useState } from 'react';
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from '../ui/sheet';
import AppLayout from '../widgets/AppLayout';
import { Label } from '../ui/label';
import { formatDate } from '@/utility/utility';

const ViewTicketSheet = ({ open, setOpen, ticket }) => {
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent className='p-0 sm:max-w-[34rem]'>
				<AppLayout header={{ title: 'View Ticket' }} bodyClassName='gap-4'>
					<div className='mb-3 flex flex-col gap-2'>
						<Label className='text-base text-gray-500 uppercase'>Topic</Label>
						<Label className='text-base font-medium'>{ticket?.topic}</Label>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<Label className='text-base text-gray-500 uppercase'>Type</Label>
						<Label className='text-base font-medium'>{ticket?.type}</Label>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<Label className='text-base text-gray-500 uppercase'>Severity</Label>
						<Label className='text-base font-medium'>{ticket?.severity}</Label>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<Label className='text-base text-gray-500 uppercase'>status</Label>
						<Label className='text-base font-medium'>{ticket?.status}</Label>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<Label className='text-base text-gray-500 uppercase'>Description</Label>
						<Label className='text-base font-medium'>{ticket?.description}</Label>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<Label className='text-base text-gray-500 uppercase'>Assigned To</Label>
						<Label className='text-base font-medium'>{ticket?.agent?.name}</Label>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<Label className='text-base text-gray-500 uppercase'>Created On</Label>
						<Label className='text-base font-medium'>{formatDate(ticket?.dateCreated)}</Label>
					</div>
					{ticket?.resolvedOn ? (
						<div className='mb-3 flex flex-col gap-2'>
							<Label className='text-base text-gray-500 uppercase'>Resolved On</Label>
							<Label className='text-base font-medium'>{formatDate(ticket?.resolvedOn)}</Label>
						</div>
					) : null}
				</AppLayout>
			</SheetContent>
		</Sheet>
	);
};

export default ViewTicketSheet;
