import { useRouter } from 'next/navigation';

import { SafeUser } from '../types';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface IUseFavorite {
	listingId: string;
	currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];
		console.log(list);
		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request = hasFavorited
					? () => axios.delete(`/api/favourites/${listingId}`)
					: () => axios.post(`/api/favourites/${listingId}`);
				await request();
				router.refresh();
				toast.success('Added to your favorites');
			} catch (err) {
				toast.error('Something went wrong');
			}
		},
		[currentUser, hasFavorited, listingId, loginModal, router]
	);

	return {
		hasFavorited,
		toggleFavorite,
	};
};

export default useFavorite;
