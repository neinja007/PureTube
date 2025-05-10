import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/navbar';
import { QueryProvider } from '@/components/query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
			<QueryProvider>
				<html lang='en'>
					<body className={`${geistSans.className} ${geistMono.variable} antialiased`}>
						<Navbar />
						<div className='w-full max-w-screen-2xl mx-auto pb-16'>{children}</div>
					</body>
				</html>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryProvider>
		</ClerkProvider>
	);
}
