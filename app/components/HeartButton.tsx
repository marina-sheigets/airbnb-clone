'use client';

import { SafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
interface HeartButtonProps {
	currentUser?: SafeUser | null;
	listingId: string;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
	const hasFavorited = true;
	const toggleFavorite = () => {};
	return (
		<div
			onClick={toggleFavorite}
			className={`
            relative
            hover:opacity-80
            transition
            cursor-pointer `}>
			<AiOutlineHeart
				size={28}
				className={`
                fill-white
                absolute
                -top-[2px]
                -right-[2px]`}
			/>
			<AiFillHeart
				size={24}
				className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500'}
			/>
		</div>
	);
};

export default HeartButton;
