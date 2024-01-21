interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return <div className='mx-auto h-screen flex flex-col justify-between overflow-auto'>{children}</div>;
};

export default Container;
