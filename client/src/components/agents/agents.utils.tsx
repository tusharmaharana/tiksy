export const getAgentsSelectOptions = (agents) => {
	if (!agents) {
		return [];
	}
	return agents.map((agent) => ({
		label: agent.name,
		value: agent.id,
	}));
};
