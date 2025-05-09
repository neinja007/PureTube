import Image from 'next/image';

const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
	return (
		<div className={`flex items-center ${size === 'sm' ? 'gap-2' : size === 'md' ? 'gap-3' : 'gap-4'}`}>
			<Image
				src='/icon.png'
				alt='PureTube'
				width={size === 'sm' ? 24 : size === 'md' ? 32 : 75}
				height={size === 'sm' ? 24 : size === 'md' ? 32 : 75}
			/>
			<span className={`font-bold ${size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-3xl' : 'text-6xl'}`}>
				PureTube
			</span>
		</div>
	);
};

export default Logo;
