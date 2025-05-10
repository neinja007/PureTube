import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/navbar';

const geistSans = Geist({
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'PureTube',
	description: 'YouTube, but without the junk.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${geistSans.className} ${geistMono.variable} antialiased`}>
					<Navbar />
					<div className='w-full max-w-screen-2xl mx-auto pb-16'>{children}</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
