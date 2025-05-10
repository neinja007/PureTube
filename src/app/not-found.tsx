'use client';

import Logo from '@/components/logo';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
	const { user } = useUser();

	return (
		<div className='flex flex-col items-center justify-center mt-16'>
			<Logo size='lg' />
			<h1 className='mt-4'>
				Page not found.{' '}
				<Link className='text-blue-500 hover:underline' href={user ? '/profile/default' : '/'}>
					Back to PureTube
				</Link>
			</h1>
		</div>
	);
}
