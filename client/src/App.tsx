import { Toaster } from 'react-hot-toast';
import Container from './components/ui/container';
import { Navigate, Route, Routes } from 'react-router-dom';
import Tickets from './components/tickets/Tickets';
import Agents from './components/agents/Agents';
import { Sidebar } from './components/SideBar';
import TicketForm from './components/tickets/TicketForm';
import { AppBackdrop } from './components/widgets/AppBackdrop';
import AgentForm from './components/agents/AgentForm';

function App() {
	return (
		<Container>
			<Toaster />
			<AppBackdrop />
			<div className='h-full flex'>
				<Sidebar />
				<div className='h-full flex-1 overflow-auto'>
					<AppRoutes />
				</div>
			</div>
		</Container>
	);
}

function AppRoutes() {
	return (
		<Routes>
			<Route index element={<Navigate to={'/tickets'} />} />
			<Route path='tickets' element={<Tickets />} />
			<Route path='tickets/add' element={<TicketForm />} />
			<Route path='agents' element={<Agents />} />
			<Route path='agents/add' element={<AgentForm />} />
		</Routes>
	);
}

export default App;
