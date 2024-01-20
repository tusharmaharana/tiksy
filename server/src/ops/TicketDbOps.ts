import { IPrisma, ITicket, ZTicket } from '../types/common';
import { HttpError } from '../utils/HttpError';
import { HttpStatusCode } from '../utils/HttpStatusCodes';

export class TicketDbOps {
	static async insertTicketToDb(prisma: IPrisma, ticketData: ITicket) {
		const ticketQuery = prisma.supportTicket.create({
			data: {
				topic: ticketData.topic,
				description: ticketData.description,
				type: ticketData.type,
				severity: ticketData.severity,
				status: ticketData.status,
				dateCreated: ticketData.dateCreated,
				assignedTo: ticketData.assignedTo
			}
		});
		const ticket = await ticketQuery;
		return ticket.id;
	}
}
