'use client';
import ChatBox from './components/chat/ChatBox';
import ChatNav from './components/chat/ChatNav';
// import Header from './components/header/Header';
import { current_profile } from './lib/types/current_profile';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const getUser = async () => {
        const res = await current_profile();

        if (res) {
            router.push('/');
        } else {
            router.push('/login');
        }
    };
    getUser();

    return (
        <div>
            {/* <Header /> */}
            <div className='relative flex h-full w-full overflow-hidden transition-colors z-0'>
                <div className='h-screen w-screen flex justify-center items-center'>
                    <ChatNav />
                    <ChatBox />
                </div>
            </div>
        </div>
    );
}
