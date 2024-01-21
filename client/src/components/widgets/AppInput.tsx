import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { label, ...restProps } = props;
	return (
		<div className='grid w-full max-w-sm items-center gap-1.5'>
			<Label htmlFor='email'>{label}</Label>
			<Input id='email' placeholder='Email' ref={ref} {...restProps} />
		</div>
	);
});
