export enum TicketType {
	Internal = 'Internal',
	User = 'User',
}

export enum TicketSeverity {
	'Low' = 'Low',
	'Normal' = 'Normal',
	'High' = 'High',
}

export enum TicketStatus {
	New = 'New',
	Assigned = 'Assigned',
	Resolved = 'Resolved',
}

export enum TicketSortById {
	OldestTicketCreateDate = 'createdate-asc',
	NewestTicketCreateDate = 'createdate-desc',
	NewestResolvedOn = 'resolvedate-desc',
	OldestResolvedOn = 'resolvedate-asc',
}

export interface ReqInit<B> extends Omit<RequestInit, 'body'> {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: B;
}

export interface IApiResponse {
	isSuccess: boolean;
	message?: string;
}

export type ITicketWithId = {
	id: string;
	topic: string;
	description: string;
	severity: TicketSeverity;
	type: TicketType;
	status: TicketStatus;
	assignedTo: string;
	dateCreated: Date;
	resolvedOn?: Date | null | undefined;
};

export interface ITicketFilterKeys {
	pageNo?: string;
	assignedTo?: string;
	status?: string;
	severity?: string;
	type?: string;
	sort?: string;
}
