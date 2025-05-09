'use client';

import Link from 'next/link';
import Logo from './logo';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useCollections } from '@/hooks/collection/use-collections';
import { Button } from './ui/button';

const Navbar = () => {
	const { user } = useUser();
	const { data: collections } = useCollections();

	return (
		<div className='bg-purple-200 w-full sticky border-b border-gray-400 top-0 flex justify-between items-center px-6'>
			<div className='flex items-center gap-6'>
				<Link href={user ? '/profile/default' : '/'} className='py-4 border-r border-gray-400 pr-6'>
					<Logo size='md' />
				</Link>
				<SignedOut>
					<div className='flex gap-5 items-center'>
						<Link href='/auth/sign-in' className='text-black'>
							Sign in
						</Link>
						<Link href='/auth/sign-up' className='text-black'>
							Sign up
						</Link>
					</div>
				</SignedOut>
				<SignedIn>
					<div className='flex gap-6 items-center'>
						{collections?.map((collection) => (
							<Link href={`/profile/${collection.id}`} key={collection.id}>
								{collection.name}
							</Link>
						))}
						<Link href='/profile/new' className='text-black'>
							<Button>New Collection</Button>
						</Link>
					</div>
				</SignedIn>
			</div>
			<div>
				App by{' '}
				<Link href='https://neinja.dev' className='text-blue-500 hover:underline'>
					neinja.dev
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
