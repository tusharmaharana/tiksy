import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAppRoute() {
	const navigate = useNavigate();

	const getAppUrl = useCallback((path: string) => {
		return `/${path}`.replace(/\/\//g, '/');
	}, []);

	const goto = useCallback(
		(path: string, options?: { replace?: boolean }) => {
			navigate(getAppUrl(path), options);
		},
		[navigate, getAppUrl]
	);

	const goBack = useCallback(
		(path?: string) => {
			if (navigate) {
				if (path) {
					navigate(getAppUrl(path), { replace: true, state: { goBack: true } });
				} else {
					navigate(-1);
				}
			} else {
				window.history.go(-1);
			}
		},
		[navigate]
	);

	return { goto, getAppUrl, goBack };
}
