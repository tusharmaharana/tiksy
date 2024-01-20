import { Prisma } from '@prisma/client';
import { isEmpty } from 'lodash';
import { IFetchTicketParams, IPrisma, ITicket, TicketSortById } from '../types/common';

const pageSize = 20;
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

	static async fetchAllTickets(prisma: IPrisma, params: IFetchTicketParams) {
		const { assignedTo, pageNo, severity, sortBy, status, type } = params;

		let whereClauses: Prisma.SupportTicketWhereInput | undefined = {};
		let orderClauses: Prisma.SupportTicketOrderByWithRelationInput | undefined = {};

		if (assignedTo) {
			whereClauses.assignedTo = assignedTo;
		}
		if (status) {
			whereClauses.status = status;
		}
		if (severity) {
			whereClauses.severity = severity;
		}
		if (type) {
			whereClauses.type = type;
		}
		if (sortBy) {
			switch (sortBy) {
				case TicketSortById.OldestTicketCreateDate: {
					orderClauses.dateCreated = 'asc';
					break;
				}
				case TicketSortById.NewestTicketCreateDate: {
					orderClauses.dateCreated = 'desc';
					break;
				}
				case TicketSortById.OldestResolvedOn: {
					orderClauses.resolvedOn = 'asc';
					break;
				}
				case TicketSortById.NewestResolvedOn: {
					orderClauses.resolvedOn = 'desc';
					break;
				}
			}
		}

		if (isEmpty(whereClauses)) {
			whereClauses = undefined;
		}
		if (isEmpty(orderClauses)) {
			orderClauses = undefined;
		}

		const tickets = await prisma.supportTicket.findMany({
			where: whereClauses,
			orderBy: orderClauses,
			skip: pageNo ? (pageNo - 1) * pageSize : 0,
			take: pageSize + 1,
			include: {
				agent: true
			}
		});

		let hasNextData = false;
		if (tickets.length > pageSize) {
			hasNextData = true;
			tickets.splice(tickets.length - 1, 1);
		}

		return {
			isSuccess: true,
			tickets: tickets,
			hasNextData: hasNextData
		};
	}
}
