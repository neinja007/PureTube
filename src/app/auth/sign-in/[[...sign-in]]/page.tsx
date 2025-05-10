import Logo from '@/components/logo';
import { SignIn } from '@clerk/nextjs';

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center mt-16'>
			<Logo size='lg' />
			<p className='text-xl text-gray-500'>YouTube, but without the junk.</p>
			<div className='mt-8'>
				<SignIn />
			</div>
		</div>
	);
}
