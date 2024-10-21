'use client';
import CustomerLoginComponent from './components/auth/customerLoginComponent';

export default function Home() {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <CustomerLoginComponent />
        </div>
    );
}
