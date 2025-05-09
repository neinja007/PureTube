import Image from 'next/image';

const Logo = () => {
	return (
		<div className='flex items-center gap-2'>
			<Image src='/icon.png' alt='PureTube' width={50} height={50} />
			<span className='text-4xl font-bold'>PureTube</span>
		</div>
	);
};

export default Logo;
