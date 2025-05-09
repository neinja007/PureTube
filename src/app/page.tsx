import Logo from '@/components/logo';

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center mt-32'>
			<Logo size='lg' />
			<p className='text-xl text-gray-500'>YouTube, but without the junk.</p>
		</div>
	);
}
