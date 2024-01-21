import React, { useEffect, useState } from 'react';
import AppLoader from './AppLoader';
import { cn } from '@/lib/utils';

let toggleBackdropFn: {
	({ open, message }: { open: boolean; message?: string }): void;
	(arg0: { open: boolean; message?: string }): void;
};

export function AppBackdrop() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const toggleBackdrop = ({ open }: { open: boolean; message?: string }) => {
			setOpen(open);
		};
		toggleBackdropFn = toggleBackdrop;
	}, []);

	return (
		<div className={cn("absolute top-0 left-0 bottom-0 right-0 bg-black/[0.5] content-[''] hidden", { block: open })}>
			<AppLoader />
		</div>
	);
}

export function toggleBackdrop({ open, message }: { open: boolean; message?: string }) {
	toggleBackdropFn({ open, message: message });
}

export function openBackdrop({ message }: { message?: string }) {
	toggleBackdropFn({ open: true, message: message });
}

export function closeBackdrop() {
	toggleBackdropFn({ open: false });
}
