import { Request } from 'express';
import { AgentDbOps } from '../ops/AgentDbOps';
import { ValidatorOps } from '../ops/ValidatorOps';
import { IAgent, IAgentReqBody, IAgentWithId } from '../types/common';
import { createDate, getPrismaClient } from '../utils/utility';

export const addAgentApi = async (req: Request) => {
	const prismaClient = getPrismaClient();
	const agentReqBody = req.body.agent as IAgentReqBody;
	const now = createDate();
	let agentResponse: IAgentWithId | null = null;

	const agent: IAgent = {
		...agentReqBody,
		dateCreated: now,
		lastActivityOn: now,
		active: true
	};
	const agentForSubmit = ValidatorOps.validateAgent(agent);
	const agentId = await AgentDbOps.insertAgentToDb(prismaClient, agentForSubmit);
	agentResponse = { ...agentForSubmit, id: agentId };

	return { isSuccess: true, agent: agentResponse };
};

export const getAllAgentsApi = async (req: Request) => {
	const prismaClient = getPrismaClient();
	const allAgents = await AgentDbOps.fetchAllAgents(prismaClient);
	return { agents: allAgents };
};
