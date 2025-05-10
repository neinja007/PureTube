import Link from 'next/link';
import Logo from './logo';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const Navbar = () => {
	return (
		<div className='bg-purple-200 w-full sticky border-b border-gray-400 top-0 flex justify-between items-center px-5'>
			<div className='flex items-center gap-5'>
				<Link href='/' className='py-4 border-r border-gray-400 pr-5'>
					<Logo size='md' />
				</Link>
				<SignedOut></SignedOut>
				<SignedIn>
					<div className='flex gap-5 items-center'>
						<Link href='/auth/sign-in' className='text-gray-700 hover:text-black'>
							Sign in
						</Link>
						<Link href='/auth/sign-up' className='text-gray-700 hover:text-black'>
							Sign up
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
