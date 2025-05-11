'use client';

import { Button } from '@/components/ui/button';
import { useCollection } from '@/hooks/collection/use-collection';
import { useUser } from '@clerk/nextjs';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
	const params = useParams();
	const id = params.id as string;

	const { user } = useUser();

	const { replace } = useRouter();

	useEffect(() => {
		if (user?.username && id === 'default' && user.username !== 'default') {
			replace(`/profile/${user.username}`);
		}
	}, [user, replace, id]);

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
