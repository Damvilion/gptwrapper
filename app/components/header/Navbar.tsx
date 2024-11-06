import React from 'react';
import { Button } from '../ui/button';
import { signOut } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase/firebase-config';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const signOutUser = () => {
        signOut(FirebaseAuth);
        router.push('/login');
    };
    return (
        <nav className='flex flex-row items-center justify-between my-2'>
            <div className='text-lg font-bold mx-5'>username</div>
            <Button className='text-lg font-bold mx-5' onClick={signOutUser}>
                logout
            </Button>
        </nav>
    );
}
