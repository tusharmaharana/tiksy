import { ReqInit, TicketSeverity, TicketSortById, TicketStatus, TicketType } from '@/types';

export const StatusFilterOptions = [
	{
		value: TicketStatus.New,
		label: 'New',
	},
	{
		value: TicketStatus.Assigned,
		label: 'Assigned',
	},
	{
		value: TicketStatus.Resolved,
		label: 'Resolved',
	},
];

export const SeverityFilterOptions = [
	{
		value: TicketSeverity.Low,
		label: 'Low',
	},
	{
		value: TicketSeverity.Normal,
		label: 'Normal',
	},
	{
		value: TicketSeverity.High,
		label: 'High',
	},
];

export const TypeFilterOptions = [
	{
		value: TicketType.Internal,
		label: 'Internal',
	},
	{
		value: TicketType.User,
		label: 'User',
	},
];

export const SortByFilterOptions = [
	{
		value: TicketSortById.NewestTicketCreateDate,
		label: 'Created On (Latest)',
	},
	{
		value: TicketSortById.OldestTicketCreateDate,
		label: 'Created On (Oldest)',
	},
	{
		value: TicketSortById.NewestResolvedOn,
		label: 'Resolved On (Latest)',
	},
	{
		value: TicketSortById.OldestResolvedOn,
		label: 'Resolved On (Oldest)',
	},
];
