import React, { useMemo } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import AppLayout, { IAppLayoutHeader } from '../widgets/AppLayout';
import { useAppRoute } from '../hooks/useAppRoute';
import { AppTable, IColumn } from '../widgets/AppTable';
import { useAgents } from './agent.queries';
import { formatDate } from '@/utility/utility';
import AppLoader from '../widgets/AppLoader';

const Agents = () => {
	const { goto } = useAppRoute();
	const { data: res, isLoading } = useAgents();

	const layoutHeader: IAppLayoutHeader = {
		title: 'Agents',
		children: (
			<Button variant='default' className='text-base gap-2' onClick={() => goto('agents/add')}>
				<Plus size={20} />
				Agent
			</Button>
		),
	};

	const rows = useMemo(() => {
		const rows = [];
		(res as any)?.agents?.forEach((agent) => {
			const { name, email, description, phone, dateCreated } = agent;
			const row = {
				name,
				email,
				description,
				phone,
				dateCreated: formatDate(dateCreated),
				rowData: agent,
			};
			rows.push(row);
		});
		return rows;
	}, [res]);

	return (
		<AppLayout header={layoutHeader}>
			{isLoading ? (
				<AppLoader />
			) : rows?.length ? (
				<AppTable columns={columns} data={rows} />
			) : (
				<div className='flex flex-col justify-center items-center flex-1 h-full'>{'No Agents found'}</div>
			)}
		</AppLayout>
	);
};

export default Agents;

const columns: IColumn[] = [
	{ accessor: 'name', header: 'Name' },
	{ accessor: 'email', header: 'Email', minWidth: 275, maxWidth: 275 },
	{ accessor: 'phone', header: 'Phone', minWidth: 150, maxWidth: 150 },
	{ accessor: 'description', header: 'Description', className: 'truncate' },
	{ accessor: 'dateCreated', header: 'Created On', minWidth: 150, maxWidth: 150 },
];
