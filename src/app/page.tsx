import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center mt-32'>
			<Logo size='lg' />
			<p className='text-xl text-gray-500'>YouTube, but without the junk.</p>
			<Button size='lg' className='mt-4'>
				Sign in to get started
			</Button>
		</div>
	);
}
