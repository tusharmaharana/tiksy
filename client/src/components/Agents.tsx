import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import AppLayout, { IAppLayoutHeader } from './widgets/AppLayout';

const Agents = () => {
	const layoutHeader: IAppLayoutHeader = {
		title: 'Agents',
		children: (
			<Button variant='default' className='gap-2'>
				<Plus size={20} />
				Agent
			</Button>
		),
	};
	return <AppLayout header={layoutHeader}>hello</AppLayout>;
};

export default Agents;
