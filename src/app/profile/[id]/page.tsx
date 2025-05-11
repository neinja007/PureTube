'use client';

import { Button } from '@/components/ui/button';
import { useCollection } from '@/hooks/collection/use-collection';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Page = () => {
	const params = useParams();
	const id = params.id as string;

	console.log(id);
	const { data: collection } = useCollection(id || '');

	return (
		<div className='flex flex-col gap-4 mt-10'>
			<h1 className='text-2xl font-bold flex justify-between items-center'>
				{collection?.name}
				<Link href={`/profile/${id}/edit`}>
					<Button variant='ghost' size='icon'>
						<Settings className='size-5' />
					</Button>
				</Link>
			</h1>
		</div>
	);
};

export default Page;
