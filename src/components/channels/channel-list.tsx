import { ChannelDisplay } from './channel-display';

interface ChannelListProps {
	channels: string[];
}

export const ChannelList = ({ channels }: ChannelListProps) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{channels.map((channel) => (
				<ChannelDisplay key={channel} id={channel} />
			))}
		</div>
	);
};
