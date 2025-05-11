import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useYoutubeChannel } from '@/hooks/use-youtube-channel';

interface ChannelDisplayProps {
	id: string;
	onClick?: () => void;
	showAddButton?: boolean;
}

export const ChannelDisplay = ({ id, onClick, showAddButton = false }: ChannelDisplayProps) => {
	const { data: channelData } = useYoutubeChannel(id);

	const content = (
		<div
			className={`flex items-center gap-2 p-2 rounded-md ${onClick ? 'hover:bg-gray-100 cursor-pointer' : ''} group`}
		>
			{channelData?.[0]?.thumbnail && (
				<Image
					src={channelData[0].thumbnail}
					alt={channelData[0].name}
					width={30}
					height={30}
					className='rounded-full'
				/>
			)}
			<div className='flex-1 min-w-0'>
				<div className='truncate'>{channelData?.[0]?.name || 'Loading...'}</div>
				{channelData?.[0]?.subscribers && (
					<Badge variant='secondary' className='text-xs'>
						{parseInt(channelData[0].subscribers).toLocaleString('en-US', { notation: 'compact' })}
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
