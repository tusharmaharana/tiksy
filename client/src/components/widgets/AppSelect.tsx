import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';

interface IAppSelect {
	options?: ISelectOptions[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	className?: string;
	label?: string;
	error?: string;
	width?: number;
}

interface ISelectOptions {
	value: string;
	label: string;
}

const AppSelect = (props: IAppSelect) => {
	const { value, options, placeholder, className, onChange, label, error, width } = props;
	const [selectValue, setSelectValue] = useState<string>();

	useEffect(() => {
		if (value) {
			setSelectValue(value);
		} else {
			setSelectValue(null);
		}
	}, [value]);

	return (
		<div>
			<Select value={selectValue} onValueChange={(newValue) => onChange(newValue)}>
				<SelectTrigger style={{ width }} className={cn('text-base', { 'ring-2 ring-red-500 ring-inset': error }, className)}>
					<div className='flex gap-1'>
						{label ? <Label className='text-gray-500'>{selectValue ? `${label}:` : label}</Label> : null}
						<SelectValue placeholder={placeholder} />
					</div>
				</SelectTrigger>
				<SelectContent className='flex flex-row mx-0 my-0'>
					{options.map((option) => (
						<SelectItem value={option.value}>{option.label}</SelectItem>
					))}
				</SelectContent>
				{error ? <p className='text-xs text-red-500 mt-1'>{error}</p> : null}
			</Select>
		</div>
	);
};

export default AppSelect;
