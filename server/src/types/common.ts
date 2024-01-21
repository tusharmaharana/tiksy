import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

export const ZString = () => z.string().min(1, { message: 'Required' });
const emailRegExp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export enum TicketType {
	Internal = 'Internal',
	User = 'User'
}
export const ZTicketType = z.nativeEnum(TicketType);

export enum TicketSeverity {
	'Low' = 'Low',
	'Normal' = 'Normal',
	'High' = 'High'
}
export const ZTicketSeverity = z.nativeEnum(TicketSeverity);

export enum TicketStatus {
	New = 'New',
	Assigned = 'Assigned',
	Resolved = 'Resolved'
}
export const ZTicketStatus = z.nativeEnum(TicketStatus);

export const ZTicketReqBody = z.object({
	topic: ZString(),
	description: ZString(),
	severity: ZTicketSeverity,
	type: ZTicketType
});
export type ITicketReqBody = z.infer<typeof ZTicketReqBody>;

export const ZTicket = ZTicketReqBody.extend({
	status: ZTicketStatus,
	assignedTo: ZString(),
	dateCreated: z.date(),
	resolvedOn: z.date().optional().nullable()
});
export type ITicket = z.infer<typeof ZTicket>;
export interface ITicketWithId extends ITicket {
	id: string;
}

export const ZAgentReqBody = z.object({
	name: ZString(),
	email: ZString().regex(emailRegExp),
	phone: ZString(),
	description: z.string().optional().nullable()
});
export type IAgentReqBody = z.infer<typeof ZAgentReqBody>;

export const ZAgent = ZAgentReqBody.extend({
	active: z.boolean(),
	dateCreated: z.date(),
	lastActivityOn: z.date()
});
export type IAgent = z.infer<typeof ZAgent>;
export interface IAgentWithId extends IAgent {
	id: string;
}

export type IPrisma = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

export enum TicketSortById {
	OldestTicketCreateDate = 'createdate-asc',
	NewestTicketCreateDate = 'createdate-desc',
	NewestResolvedOn = 'resolvedate-desc',
	OldestResolvedOn = 'resolvedate-asc'
}

export interface IFetchTicketParams {
	pageNo: number | null;
	assignedTo: string | null;
	status: string | null;
	severity: string | null;
	type: string | null;
	sortBy: string | null;
}
