'use client';

import { Button } from '@/components/ui/button';
import { useCollection } from '@/hooks/collection/use-collection';
import { useUser } from '@clerk/nextjs';
import { Settings } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChannelList } from '@/components/channels/channel-list';
import { ChannelSearch } from '@/components/channels/channel-search';

const Page = () => {
	const params = useParams();
	const id = params.id as string;
	const [isOpen, setIsOpen] = useState(false);
	const [channels, setChannels] = useState<string[]>([]);

	const { user } = useUser();
	const { replace } = useRouter();

	useEffect(() => {
		if (user?.username && id === 'default' && user.username !== 'default') {
			replace(`/profile/${user.username}`);
		}
	}, [user, replace, id]);

	const { data: collection, status } = useCollection(id || '');

	useEffect(() => {
		if (collection?.channels) {
			setChannels(collection.channels.map((channel) => channel.name));
		}
	}, [collection]);

	return (
		<div className='flex flex-col gap-4 mt-10'>
			<h1 className='text-2xl font-bold flex justify-between items-center'>
				{collection?.name}
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button variant='ghost' size='icon'>
							<Settings className='size-5' />
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-3xl'>
						<DialogHeader>
							<DialogTitle>Edit {collection?.name}</DialogTitle>
						</DialogHeader>
						<ChannelList channels={channels} status={status} />
						<ChannelSearch onChannelSelect={(channelName) => setChannels([...channels, channelName])} />
					</DialogContent>
				</Dialog>
			</h1>
			<div className='flex flex-col gap-4'>
				{collection?.channels.length && collection?.channels.length > 0 ? (
					collection?.channels.map((channel) => <div key={channel.id}>{channel.name}</div>)
				) : (
					<div>
						No channels found.{' '}
						<button onClick={() => setIsOpen(true)} className='hover:underline text-blue-500'>
							You can add some here.
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Page;
