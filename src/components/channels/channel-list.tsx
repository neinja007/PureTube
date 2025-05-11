import { ChannelDisplay } from './channel-display';

interface ChannelListProps {
	channels: string[];
	status: 'pending' | 'error' | 'success';
}

export const ChannelList = ({ channels, status }: ChannelListProps) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{status === 'pending' ? (
				<div>Loading...</div>
			) : (
				channels.map((channel) => <ChannelDisplay key={channel} name={channel} />)
			)}
		</div>
	);
};
