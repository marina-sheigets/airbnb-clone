import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnlyProvider from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

const page = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnlyProvider>
				<EmptyState title='Unauthorized' subtitle='Please, log in' />
			</ClientOnlyProvider>
		);
	}

	const reservations = await getReservations({ authorId: currentUser.id });

	if (!reservations.length) {
		return (
			<ClientOnlyProvider>
				<EmptyState
					title='No reservations found'
					subtitle='It looks like you have no reservations on your page'
				/>
			</ClientOnlyProvider>
		);
	}
	return (
		<ClientOnlyProvider>
			<ReservationsClient reservations={reservations} currentUser={currentUser} />
		</ClientOnlyProvider>
	);
};

export default page;
