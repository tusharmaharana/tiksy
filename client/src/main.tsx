import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App.tsx';
import './index.css';

// react query client
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>
);
