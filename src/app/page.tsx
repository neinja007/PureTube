import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center mt-16'>
			<Logo size='lg' />
			{/* <p className='text-xl text-gray-500'>YouTube, but without the junk.</p> */}
			<p className='mt-4'>You are not signed into PureTube.</p>
			<div className='mt-4 flex gap-2 items-center'>
				<SignUpButton>
					<Button>Sign up to get started</Button>
				</SignUpButton>
				or
				<SignInButton>
					<Button variant='outline'>Sign in to your account</Button>
				</SignInButton>
			</div>
		</div>
	);
}
