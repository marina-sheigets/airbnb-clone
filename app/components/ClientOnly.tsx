'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
	children: React.ReactNode;
}
function ClientOnlyProvider({ children }: ClientOnlyProps) {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) {
		return null;
	}
	return <>{children}</>;
}

export default ClientOnlyProvider;
