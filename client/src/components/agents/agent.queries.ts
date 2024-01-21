import { performRequest } from '@/utility/utility';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAgents = () => {
	return useQuery({
		queryKey: ['agents'],
		queryFn: () => performRequest(`/api/support-agents`),
		refetchOnMount: true,
		refetchOnReconnect: true,
		staleTime: 60000,
	});
};

export const useSaveAgents = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (body) => {
			const reqBody = { agent: body };
			await performRequest(`/api/support-agents`, { body: reqBody });
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['agents'] });
		},
	});
};
