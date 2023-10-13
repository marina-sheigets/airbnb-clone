import React from 'react';
import ClientOnlyProvider from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../actions/getfavoriteListings';
import getCurrentUser from '../actions/getCurrentUser';
import FavoritesClient from './FavoritesClient';

async function ListingPage() {
	const listings = await getFavoriteListings();
	const currentUser = await getCurrentUser();
	if (!listings.length) {
		return (
			<ClientOnlyProvider>
				<EmptyState
					title='No favorites found'
					subtitle='Looks like you have no favorite listings'
				/>
			</ClientOnlyProvider>
		);
	}
	return (
		<ClientOnlyProvider>
			FavoritesClient
			<FavoritesClient listings={listings} currentUser={currentUser} />
		</ClientOnlyProvider>
	);
}

export default ListingPage;
