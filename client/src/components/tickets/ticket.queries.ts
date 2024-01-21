import { performRequest } from '@/utility/utility';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTickets = (params: object) => {
	const urlParams = new URLSearchParams();
	for (const [key, val] of Object.entries(params ?? {})) {
		if (val) {
			urlParams.append(key, val);
		} else {
			urlParams.delete(key);
		}
	}
	return useQuery({
		queryKey: ['tickets', params],
		queryFn: () => performRequest(`/api/support-tickets?${urlParams.toString()}`),
		refetchOnMount: true,
		refetchOnReconnect: true,
		staleTime: 60000,
	});
};

export const useSaveTickets = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (body) => {
			const reqBody = { ticket: body };
			await performRequest(`/api/support-tickets`, { body: reqBody });
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['tickets'] });
		},
	});
};
