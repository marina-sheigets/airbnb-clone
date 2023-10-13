import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ClientOnlyProvider from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<body className={font.className}>
				<ClientOnlyProvider>
					<ToasterProvider />
					<RegisterModal />
					<RentModal />
					<LoginModal />
					<SearchModal />
					<Navbar currentUser={currentUser} />
				</ClientOnlyProvider>
				<div className='pb-20 pt-28'>{children}</div>
			</body>
		</html>
	);
}
