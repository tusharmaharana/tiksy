import { ReqInit } from '@/types';
import dayjs from 'dayjs';

export function getEndpoint(urlPart: string): string {
	return `${import.meta.env.VITE_server_uri}${urlPart}`;
}

export const performRequest = async <B, R>(urlPart: string, config: ReqInit<B> = {}): Promise<R> => {
	const { body, headers, ...customConfig } = config;
	const endpoint = getEndpoint(urlPart);

	const reqConfig: RequestInit = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		body: body ? JSON.stringify(body) : null,
		headers: { 'content-type': 'application/json', ...headers },
	};

	return fetch(endpoint, reqConfig).then(async (response) => {
		if (!response.ok) {
			const error = await response.json();
			return Promise.reject(error.message);
		}

		return response.json();
	});
};

export type DateType = string | number | Date | dayjs.Dayjs | undefined;

export function formatDate(date: DateType): string {
	return dayjs(date).format('MMM D, YYYY');
}
