import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnlyProvider from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnlyProvider>
				<EmptyState title='Unauthorized' subtitle='Please, log in' />
			</ClientOnlyProvider>
		);
	}

	const listings = await getListings({
		userId: currentUser.id,
	});

	if (!listings.length) {
		return (
			<ClientOnlyProvider>
				<EmptyState
					title='No properties found'
					subtitle='It looks like you have no properties'
				/>
			</ClientOnlyProvider>
		);
	}
	return (
		<ClientOnlyProvider>
			<PropertiesClient listings={listings} currentUser={currentUser} />
		</ClientOnlyProvider>
	);
};

export default PropertiesPage;
