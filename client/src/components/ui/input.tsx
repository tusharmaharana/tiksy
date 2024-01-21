import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	isNumber?: boolean;
}

const NumberRegex = /^[0-9]+$/;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, isNumber, value, onChange, ...props }, ref) => {
	const [inputValue, setInputValue] = React.useState('');

	React.useEffect(() => {
		setInputValue(value as string);
	}, [value]);

	const handleOnChange = (e) => {
		const val = e.target.value;
		let result = val;
		if (isNumber) {
			const isValidNumber = NumberRegex.test(val);
			if (isValidNumber) {
				setInputValue(val);
			} else {
				result = inputValue;
			}
		} else {
			setInputValue(val);
		}
		e.currentTarget.value = result;
		e.target.value = result;
		onChange(e);
	};

	return (
		<div>
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					{ 'ring-2 ring-red-500 ring-inset ring-offset-3': error },
					className
				)}
				ref={ref}
				value={inputValue}
				onChange={handleOnChange}
				{...props}
			/>
			{error ? <p className='text-xs text-red-500 mt-1'>{error}</p> : null}
		</div>
	);
});
Input.displayName = 'Input';

export { Input };
