import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Plus } from 'lucide-react';

interface ChannelDisplayProps {
	name: string;
	thumbnail?: string;
	subscribers?: string;
	onClick?: () => void;
	showAddButton?: boolean;
}

export const ChannelDisplay = ({
	name,
	thumbnail,
	subscribers,
	onClick,
	showAddButton = false
}: ChannelDisplayProps) => {
	const content = (
		<div
			className={`flex items-center gap-2 p-2 rounded-md ${onClick ? 'hover:bg-gray-100 cursor-pointer' : ''} group`}
		>
			{thumbnail && <Image src={thumbnail} alt={name} width={30} height={30} className='rounded-full' />}
			<div className='flex-1 min-w-0'>
				<div className='truncate'>{name}</div>
				{subscribers && (
					<Badge variant='secondary' className='text-xs'>
						{parseInt(subscribers).toLocaleString('en-US', { notation: 'compact' })}
					</Badge>
				)}
			</div>
			{showAddButton && <Plus className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />}
		</div>
	);

	if (onClick) {
		return (
			<button onClick={onClick} className='w-full text-left'>
				{content}
			</button>
		);
	}

	return content;
};
