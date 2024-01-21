import { Loader } from 'lucide-react';
import React from 'react';

const AppLoader = () => {
	return (
		<div className='flex h-full items-center justify-center'>
			<Loader className='h-12 w-12 animate-spin' />
		</div>
	);
};

export default AppLoader;
