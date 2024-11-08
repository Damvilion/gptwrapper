'use client';
import React from 'react';
import CustomerSignUpComponent from '@/app/components/auth/CustomerSignUpComponent';

const Page = () => {
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <CustomerSignUpComponent />
            <div className='text-xs flex row gap-2'>
                <p className='text-xs'>already have an account?</p>
                <a className='text-gray-600' href='/login'>
                    Login
                </a>
            </div>
        </div>
    );
};

export default Page;
