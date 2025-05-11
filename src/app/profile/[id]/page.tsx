import { CollectionFeed } from '@/components/collection-feed';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	return (
		<div className='flex flex-col gap-4 mt-10'>
			<h1 className='text-2xl font-bold flex justify-between items-center'>
				Default Profile
				<Link href={`/profile/${id}/edit`}>
					<Button variant='ghost' size='icon'>
						<Settings className='size-5' />
					</Button>
				</Link>
			</h1>
			<CollectionFeed id={id} />
		</div>
	);
};

export default Page;
