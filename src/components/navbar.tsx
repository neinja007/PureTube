import Link from 'next/link';
import Logo from './logo';

const Navbar = () => {
	return (
		<div className='h-16 bg-purple-200 w-full sticky top-0 flex justify-between items-center px-4'>
			<Link href='/'>
				<Logo size='md' />
			</Link>
			<div>
				Developed by{' '}
				<Link href='https://neinja.dev' className='text-blue-500 hover:underline'>
					neinja.dev
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
