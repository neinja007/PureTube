'use client';

import { useEffect } from 'react';

import { useCollection } from '@/hooks/collection/use-collection';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useYoutubeChannels } from '@/hooks/use-youtube-channels';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const Page = () => {
	const params = useParams();
	const id = params.id as string;

	const [channels, setChannels] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const { data: collection, status } = useCollection(id || '');
	const { data: searchResult, status: channelsStatus } = useYoutubeChannels(searchQuery);

	useEffect(() => {
		if (collection?.channels) {
			setChannels(collection.channels.map((channel) => channel.name));
		}
	}, [collection]);

	return (
		<div className='flex flex-col gap-4 mt-10'>
			<h1 className='text-2xl font-bold flex justify-between items-center'>Edit {collection?.name}</h1>
			<div className='grid grid-cols-5 gap-4'>
				{status === 'pending' ? (
					<div>Loading...</div>
				) : (
					channels.map((channel) => (
						<div className='h-10' key={channel}>
							{channel}
						</div>
					))
				)}
				<div className='h-10'>
					<Button className='size-full' variant='outline' onClick={() => setIsOpen(true)}>
						<Plus /> Add Channel
					</Button>
				</div>
			</div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Channel</DialogTitle>
					</DialogHeader>
					<div className='py-4'>
						<Input
							placeholder='Search for a channel...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					{channelsStatus === 'pending' ? (
						<div>Loading...</div>
					) : (
						searchResult?.map((channel) => (
							<button
								key={channel.id}
								className='flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md group'
								onClick={() => {
									setChannels([...channels, channel.name]);
								}}
							>
								<Image src={channel.thumbnail} alt={channel.name} width={30} height={30} />
								<div>{channel.name}</div>
								<Badge>{parseInt(channel.subscribers).toLocaleString('en-US', { notation: 'compact' })}</Badge>
								<Plus className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />
							</button>
						))
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Page;
