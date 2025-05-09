import Logo from '@/components/logo';

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<Logo />
			<p className='text-sm text-gray-500'>YouTube, but without the junk.</p>
		</div>
	);
}
