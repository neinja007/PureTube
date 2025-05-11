import { Input } from '@/components/ui/input';
import { useYoutubeChannels } from '@/hooks/use-youtube-channels';
import { useState } from 'react';
import { ChannelDisplay } from './channel-display';

interface ChannelSearchProps {
	onChannelSelect: (channelName: string) => void;
}

export const ChannelSearch = ({ onChannelSelect }: ChannelSearchProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const { data: searchResult, status: channelsStatus } = useYoutubeChannels(searchQuery);

	return (
		<>
			<div className='py-4'>
				<Input
					placeholder='Search for a channel...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			{channelsStatus === 'pending' ? (
				searchQuery.length > 0 ? (
					<div>Loading...</div>
				) : (
					<div>Enter a search query</div>
				)
			) : (
				<div className='space-y-2'>
					{searchResult?.map((channel) => (
						<ChannelDisplay
							key={channel.id}
							name={channel.name}
							thumbnail={channel.thumbnail}
							subscribers={channel.subscribers}
							onClick={() => {
								onChannelSelect(channel.name);
								setSearchQuery('');
							}}
							showAddButton
						/>
					))}
				</div>
			)}
		</>
	);
};
