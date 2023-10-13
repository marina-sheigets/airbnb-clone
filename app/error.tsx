'use client';

import { useEffect } from 'react';
import EmptyState from './components/EmptyState';

interface ErrorProps {
	error: Error;
}

const Error = ({ error }: ErrorProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return <EmptyState title='Oops' subtitle='Something went wrong' />;
};

export default Error;
