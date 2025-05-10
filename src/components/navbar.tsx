import Link from 'next/link';
import Logo from './logo';

const Navbar = () => {
	return (
		<div className='h-16 bg-purple-200 w-full sticky top-0 flex justify-between items-center px-4'>
			<Link href='/'>
				<Logo size='md' />
			</Link>
		</div>
	);
};

export default Navbar;
