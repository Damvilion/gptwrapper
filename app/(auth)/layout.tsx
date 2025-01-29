'use client';

import React, { useEffect } from 'react';
import { current_profile } from '../lib/types/current_profile';
import { useRouter } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const getUser = async () => {
        const user = await current_profile();
        if (user) {
            router.push('/');
        }
    };
    useEffect(() => {
        getUser();
    }, []);

    return <main>{children}</main>;
};

export default Layout;
