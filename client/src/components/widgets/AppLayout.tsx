import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface IAppLayout {
	bodyClassName?: string;
	className?: string;
	errorMsg?: string;
	header: IAppLayoutHeader;
	isLoading?: boolean;
	children?: React.ReactNode;
}

export interface IAppLayoutHeader {
	title: React.ReactNode | string;
	children?: React.ReactNode;
	loading?: boolean;
	className?: string;
}

const AppLayout = (props: IAppLayout) => {
	const { className, header, isLoading, errorMsg } = props;

	return (
		<div className={cn('flex flex-col h-full', className)}>
			<AppLayoutHeader loading={isLoading} {...header} />

			<div className={cn('flex-1 overflow-auto p-4 flex flex-col', props.bodyClassName)}>
				{props.errorMsg ? (
					<div className='flex flex-col justify-center items-center flex-1'>{errorMsg}</div>
				) : isLoading ? (
					<Loader2 className='h-4 w-4 animate-spin' />
				) : (
					props.children
				)}
			</div>
		</div>
	);
};

const AppLayoutHeader = (props: IAppLayoutHeader) => {
	return (
		<div className='border-b h-[80px] flex flex-row px-4 overflow-x-auto overflow-y-hidden justify-between items-center'>
			<div className='whitespace-nowrap text-2xl font-semibold'>{props.title}</div>
			{!props.loading && <div className='flex items-center justify-end'>{props.children}</div>}
		</div>
	);
};

export default AppLayout;
