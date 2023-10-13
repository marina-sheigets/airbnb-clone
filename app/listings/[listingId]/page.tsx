import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnlyProvider from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
	listingId?: string;
}
async function ListingPage({ params }: { params: IParams }) {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();
	const reservations = await getReservations(params);
	if (!listing) {
		return (
			<ClientOnlyProvider>
				<EmptyState />
			</ClientOnlyProvider>
		);
	}
	return (
		<ClientOnlyProvider>
			<ListingClient
				listing={listing}
				currentUser={currentUser}
				reservations={reservations}
			/>
		</ClientOnlyProvider>
	);
}

export default ListingPage;
