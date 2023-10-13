import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnlyProvider from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const Page = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnlyProvider>
				<EmptyState title='Unauthorized' subtitle='Please, log in' />
			</ClientOnlyProvider>
		);
	}

	const reservations = await getReservations({
		userId: currentUser.id,
	});

	if (!reservations.length) {
		return (
			<ClientOnlyProvider>
				<EmptyState
					title='No trips found'
					subtitle='It looks like you have not reserved any trips'
				/>
			</ClientOnlyProvider>
		);
	}
	return (
		<ClientOnlyProvider>
			<TripsClient reservations={reservations} currentUser={currentUser} />
		</ClientOnlyProvider>
	);
};

export default Page;
