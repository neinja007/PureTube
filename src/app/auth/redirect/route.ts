import { prisma } from '@/lib/prisma-client';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
	const user = await currentUser();

	if (!user || !user.username) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	await prisma.user.upsert({
		where: {
			username: user.username
		},
		update: {},
		create: {
			username: user.username,
			collections: {
				create: {
					name: 'Default'
				}
			}
		}
	});

	return NextResponse.redirect(new URL('/home', req.url));
};
