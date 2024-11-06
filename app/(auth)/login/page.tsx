'use client';
import React from 'react';
import CustomerLoginComponent from '@/app/components/auth/CustomerLoginComponent';

const Page = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <CustomerLoginComponent />
        </div>
    );
};

export default Page;
