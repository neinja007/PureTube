import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma-client';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await currentUser();
		const { id } = await params;

		if (!user) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const collection = await prisma.collection.findUnique({
			where: {
				id,
				userUsername: user.username
			},
			include: {
				channels: true
			}
		});

		if (!collection) {
			return NextResponse.json({ message: 'Collection not found' }, { status: 404 });
		}

		return NextResponse.json(collection, { status: 200 });
	} catch (error) {
		console.error('Error fetching collection:', error);
		return NextResponse.json(
			{ message: 'Error retrieving collection', error: (error as Error).message },
			{ status: 500 }
		);
	}
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await currentUser();
		const { id } = await params;
		const body = await request.json();

		if (!user) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const collection = await prisma.collection.update({
			where: {
				id,
				userUsername: user.username
			},
			data: body
		});

		return NextResponse.json(collection, { status: 200 });
	} catch (error) {
		console.error('Error updating collection:', error);
		return NextResponse.json(
			{ message: 'Error updating collection', error: (error as Error).message },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		const user = await currentUser();
		const { id } = params;

		if (!user) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		await prisma.collection.delete({
			where: {
				id,
				userUsername: user.username
			}
		});

		return NextResponse.json({ message: 'Collection deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting collection:', error);
		return NextResponse.json(
			{ message: 'Error deleting collection', error: (error as Error).message },
			{ status: 500 }
		);
	}
}
