import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
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
				{...props}
			/>
			{error ? <p className='text-xs text-red-500 mt-1'>{error}</p> : null}
		</div>
	);
});
Input.displayName = 'Input';

export { Input };
