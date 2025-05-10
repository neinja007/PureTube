import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma-client';

export async function GET() {
	try {
		const user = await currentUser();

		if (!user) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const collections = await prisma.collection.findMany({
			where: {
				userUsername: user.username
			},
			include: {
				channels: true
			}
		});

		return NextResponse.json(
			{
				message: 'Collections retrieved successfully',
				data: collections
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error fetching collections:', error);
		return NextResponse.json(
			{ message: 'Error retrieving collections', error: (error as Error).message },
			{ status: 500 }
		);
	}
}
