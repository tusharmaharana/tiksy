import { Request } from 'express';
import { AgentDbOps } from '../ops/AgentDbOps';
import { TicketDbOps } from '../ops/TicketDbOps';
import { ValidatorOps } from '../ops/ValidatorOps';
import { ITicket, ITicketReqBody, ITicketWithId, TicketSeverity, TicketSortById, TicketStatus, TicketType } from '../types/common';
import { HttpError } from '../utils/HttpError';
import { HttpStatusCode } from '../utils/HttpStatusCodes';
import { createDate, getPrismaClient } from '../utils/utility';

export const addTicketApi = async (req: Request) => {
	const prismaClient = getPrismaClient();
	const ticketReqBody = req.body.ticket as ITicketReqBody;
	const now = createDate();
	let ticketResponse: ITicketWithId | null = null;
	await prismaClient.$transaction(
		async prisma => {
			// fetching the agent with least activity
			const assignAgentsList = await AgentDbOps.fetchAgentWithLeastActivity(prisma);
			if (!assignAgentsList.length) {
				throw new HttpError(HttpStatusCode.NOT_FOUND, 'No support agents found');
			}
			const assignedTo = assignAgentsList[0].id;

			const ticket: ITicket = {
				...ticketReqBody,
				status: TicketStatus.Assigned,
				dateCreated: now,
				resolvedOn: null,
				assignedTo: assignedTo
			};
			const ticketForSubmit = ValidatorOps.validateTicket(ticket);

			// updating the last activity of the assigned agent to current date
			await AgentDbOps.updateLastActivityOn(prisma, assignedTo, now);
			const ticketId = await TicketDbOps.insertTicketToDb(prisma, ticketForSubmit);
			ticketResponse = { ...ticketForSubmit, id: ticketId };
		},
		{
			maxWait: 60000, // default: 2000
			timeout: 60000 // default: 5000
		}
	);
	return { isSuccess: true, ticket: ticketResponse };
};
export const getAllTicketsApi = async (req: Request) => {
	const prisma = getPrismaClient();
	const pNo: string | null = (req.query['pageNo'] as string) ?? null;
	const pageNo = pNo ? Number(pNo) : null;
	const assignedTo: string | null = (req.query['assignedTo'] as string) ?? null;
	const status: TicketStatus | null = (req.query['status'] as TicketStatus) ?? null;
	const severity: TicketSeverity | null = (req.query['severity'] as TicketSeverity) ?? null;
	const type: TicketType | null = (req.query['type'] as TicketType) ?? null;
	const sortBy: TicketSortById | null = (req.query['sort'] ?? null) as any;
	return await TicketDbOps.fetchAllTickets(prisma, {
		pageNo,
		assignedTo,
		severity,
		sortBy,
		status,
		type
	});
};
