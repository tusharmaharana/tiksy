import { ITicket, ZTicket, IAgent, ZAgent } from '../types/common';
import { HttpError } from '../utils/HttpError';
import { HttpStatusCode } from '../utils/HttpStatusCodes';

export class ValidatorOps {
	static validateTicket(ticket: ITicket): ITicket {
		const res = ZTicket.safeParse(ticket);
		if (res.success === false) {
			throw new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, `System encountered an internal error.`, {
				message: 'Failed to validate schema before saving ticket',
				objects: res.error.errors
			});
		}
		const newTicket: ITicket = res.data as ITicket;
		return newTicket;
	}

	static validateAgent(agent: IAgent): IAgent {
		const res = ZAgent.safeParse(agent);
		if (res.success === false) {
			throw new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, `System encountered an internal error.`, {
				message: 'Failed to validate schema before saving agent',
				objects: res.error.errors
			});
		}
		const newAgent: IAgent = res.data as IAgent;
		return newAgent;
	}
}
