import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ClientOnlyProvider from './components/ClientOnly';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<ClientOnlyProvider>
					<Navbar />
				</ClientOnlyProvider>
				{children}
			</body>
		</html>
	);
}
