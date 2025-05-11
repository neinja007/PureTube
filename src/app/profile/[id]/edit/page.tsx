'use client';

import { useEffect } from 'react';

import { useCollection } from '@/hooks/collection/use-collection';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Plus, X } from 'lucide-react';

const Page = () => {
	const params = useParams();
	const id = params.id as string;

	const [channel, setChannel] = useState<string | null>(null);
	const [channels, setChannels] = useState<string[]>([]);

	const { data: collection, status } = useCollection(id || '');

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
					{typeof channel === 'string' ? (
						<div className='flex items-center gap-2 size-full'>
							<Input
								placeholder='Paste Channel ID'
								className='size-full'
								value={channel}
								onChange={(e) => setChannel(e.target.value)}
							/>
							{channel && (
								<Button variant='outline' onClick={() => setChannel('')}>
									<Check />
								</Button>
							)}
							<Button variant='destructive' onClick={() => setChannel(null)}>
								<X />
							</Button>
						</div>
					) : (
						<Button className='size-full' variant='outline' onClick={() => setChannel('')}>
							<Plus /> Add Channel
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Page;
