import Image from 'next/image';
import ClientOnlyProvider from './components/ClientOnly';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getListings from './actions/getListings';
import { Listing } from '@prisma/client';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser';
import { SafeListing } from './types';

export default async function Home() {
	const listings = await getListings();
	const currentUser = await getCurrentUser();
	const isEmpty = true;

	if (!listings.length) {
		return (
			<ClientOnlyProvider>
				<EmptyState showReset />
			</ClientOnlyProvider>
		);
	}

	return (
		<ClientOnlyProvider>
			<Container>
				<div
					className={`
					pt-24
					grid
					grid-cols-1
					sm:grid-cols-2
					md:grid-cols-3
					lg:grid-cols-4
					xl:grid-cols-5
					2xl:grid-cols-6
					gap-8
				`}>
					{listings.map((listing: SafeListing) => {
						return (
							<ListingCard
								currentUser={currentUser}
								key={listing.id}
								data={listing}
							/>
						);
					})}
				</div>
			</Container>
		</ClientOnlyProvider>
	);
}
