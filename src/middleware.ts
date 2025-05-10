import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
	const { userId } = await auth();

	if (!userId && isProtectedRoute(req)) {
		return NextResponse.redirect(new URL('/', req.url));
	}

	if (userId && isAuthorizationRoute(req)) {
		return NextResponse.redirect(new URL('/profile/default', req.url));
	}
});

const isProtectedRoute = createRouteMatcher(['/((?!api|trpc|auth/sign-in|auth/sign-up|$).*)']);
const isAuthorizationRoute = createRouteMatcher(['/auth/sign-in', '/auth/sign-up', '/']);

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)'
	]
};
