'use client';

import Link from 'next/link';
import Logo from './logo';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';

const Navbar = () => {
	const { user } = useUser();

	console.log(user);

	return (
		<div className='bg-purple-200 w-full sticky border-b border-gray-400 top-0 flex justify-between items-center px-5'>
			<div className='flex items-center gap-5'>
				<Link href={user ? '/home' : '/'} className='py-4 border-r border-gray-400 pr-5'>
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
					<div className='flex gap-5 items-center'>
						<Link href='/home' className='text-black'>
							Home
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
