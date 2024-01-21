import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Eraser, Plus } from 'lucide-react';
import AppLayout, { IAppLayoutHeader } from '../widgets/AppLayout';
import AppSelect from '../widgets/AppSelect';
import { useTickets } from './ticket.queries';
import { AppTable, IColumn } from '../widgets/AppTable';
import { ITicketFilterKeys, ITicketWithId, TicketSortById } from '@/types';
import { formatDate } from '@/utility/utility';
import { SeverityFilterOptions, SortByFilterOptions, StatusFilterOptions, TypeFilterOptions } from './ticket.utils';
import { useAppRoute } from '../hooks/useAppRoute';
import ViewTicketSheet from './ViewTicketSheet';
import AppLoader from '../widgets/AppLoader';
import { useAgents } from '../agents/agent.queries';
import { getAgentsSelectOptions } from '../agents/agents.utils';
import { isEqual } from 'lodash';

const Tickets = () => {
	const [filters, setFilters] = useState<ITicketFilterKeys>(null);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const { data: res, isLoading } = useTickets(filters);
	const { data: agentRes, isLoading: isAgentLoading } = useAgents();
	const { goto } = useAppRoute();

	const initialFilter = { sort: TicketSortById.NewestTicketCreateDate };

	useEffect(() => {
		if (!filters) {
			setFilters(initialFilter);
		}
	}, [filters]);

	const layoutHeader: IAppLayoutHeader = {
		title: 'Tickets',
		children: (
			<Button variant='default' className='text-base gap-2' onClick={() => goto('tickets/add')}>
				<Plus size={20} />
				Ticket
			</Button>
		),
	};

	const showClear = useMemo(() => !isEqual(initialFilter, filters), [filters]);

	const agentFilterOptions = useMemo(() => getAgentsSelectOptions((agentRes as any)?.agents), [agentRes]);

	const rows = useMemo(() => {
		const rows = [];
		(res as any)?.tickets?.forEach((ticket: ITicketWithId) => {
			const { type, topic, status, severity, assignedTo, dateCreated } = ticket;
			const row = {
				type,
				topic,
				status,
				severity,
				dateCreated: formatDate(dateCreated),
				assignedTo: (ticket as any).agent?.name,
				rowData: ticket,
			};
			rows.push(row);
		});
		return rows;
	}, [res]);

	return (
		<AppLayout header={layoutHeader}>
			<div className='flex flex-wrap gap-1 pb-4'>
				<AppSelect
					value={filters?.type}
					options={TypeFilterOptions}
					onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
					label='Type'
					width={150}
				/>
				<AppSelect
					value={filters?.status}
					options={StatusFilterOptions}
					onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
					label='Status'
					width={175}
				/>
				<AppSelect
					value={filters?.severity}
					options={SeverityFilterOptions}
					onChange={(value) => setFilters((prev) => ({ ...prev, severity: value }))}
					label='Severity'
					width={175}
				/>
				<AppSelect
					value={filters?.assignedTo}
					options={agentFilterOptions}
					onChange={(value) => setFilters((prev) => ({ ...prev, assignedTo: value }))}
					label='Assigned To'
					width={250}
				/>
				<AppSelect
					value={filters?.sort}
					options={SortByFilterOptions}
					onChange={(value) => setFilters((prev) => ({ ...prev, sort: value }))}
					label='Sort By'
					width={250}
				/>
				{showClear ? (
					<Button title='Clear' variant='outline' onClick={() => setFilters(initialFilter)}>
						Clear
					</Button>
				) : null}
			</div>

			{isLoading || isAgentLoading ? (
				<AppLoader />
			) : rows?.length ? (
				<AppTable columns={columns} data={rows} onRowClick={(ticket) => setSelectedTicket(ticket)} />
			) : (
				<div className='flex flex-col justify-center items-center flex-1 h-full'>{'No tickets found'}</div>
			)}

			<ViewTicketSheet open={!!selectedTicket} setOpen={(open) => !open && setSelectedTicket(null)} ticket={selectedTicket} />
		</AppLayout>
	);
};

export default Tickets;

const columns: IColumn[] = [
	{ accessor: 'type', header: 'Type', minWidth: 100, maxWidth: 100 },
	{ accessor: 'topic', header: 'Topic', className: 'truncate' },
	{ accessor: 'status', header: 'Status', minWidth: 150, maxWidth: 150 },
	{ accessor: 'severity', header: 'Severity', minWidth: 150, maxWidth: 150 },
	{ accessor: 'assignedTo', header: 'Assigned To', minWidth: 150, maxWidth: 150 },
	{ accessor: 'dateCreated', header: 'Created On' },
];
