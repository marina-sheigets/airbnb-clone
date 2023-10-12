import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnlyProvider from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import ListingClient from './ListingClient';

interface IParams {
	listingId?: string;
}
async function ListingPage({ params }: { params: IParams }) {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return (
			<ClientOnlyProvider>
				<EmptyState />
			</ClientOnlyProvider>
		);
	}
	return (
		<ClientOnlyProvider>
			<ListingClient listing={listing} currentUser={currentUser} />
		</ClientOnlyProvider>
	);
}

export default ListingPage;
