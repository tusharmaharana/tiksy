import { IAgent, IPrisma, ZAgent } from '../types/common';
import { HttpError } from '../utils/HttpError';
import { HttpStatusCode } from '../utils/HttpStatusCodes';

export class AgentDbOps {
	static async insertAgentToDb(prisma: IPrisma, agentData: IAgent) {
		const agentQuery = prisma.supportAgent.create({
			data: {
				name: agentData.name,
				email: agentData.email,
				phone: agentData.phone,
				description: agentData.description ?? null,
				active: agentData.active,
				dateCreated: agentData.dateCreated,
				lastActivityOn: agentData.lastActivityOn
			}
		});
		const agent = await agentQuery;
		return agent.id;
	}

	static async fetchAgentWithLeastActivity(prisma: IPrisma) {
		return await prisma.supportAgent.findMany({
			take: 1,
			orderBy: {
				lastActivityOn: 'asc'
			}
		});
	}

	static async updateLastActivityOn(prisma: IPrisma, agentId: string, lastActivityOn: Date) {
		const updateAgentQuery = prisma.supportAgent.update({
			where: {
				id: agentId
			},
			data: {
				lastActivityOn: lastActivityOn
			}
		});
		await updateAgentQuery;
	}
}
