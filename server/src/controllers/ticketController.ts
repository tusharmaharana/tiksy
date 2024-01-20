import { Request } from 'express';
import { createDate, getPrismaClient } from '../utils/utility';
import { ITicket, ITicketReqBody, ITicketWithId, TicketStatus } from '../types/common';
import { TicketDbOps } from '../ops/TicketDbOps';
import { AgentDbOps } from '../ops/AgentDbOps';
import { HttpError } from '../utils/HttpError';
import { HttpStatusCode } from '../utils/HttpStatusCodes';
import { ValidatorOps } from '../ops/ValidatorOps';

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
export const fetchAllTickets = async (req: Request) => {};
