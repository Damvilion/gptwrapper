'use client';
import ChatBox, { gptResponse } from '@/app/components/chat/ChatBox';
import ChatNav from '@/app/components/chat/ChatNav';
// import Header from './components/header/Header';
import { current_profile } from '@/app/lib/types/current_profile';
import { FirebaseDb } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { chatUrl: string } }) {
    const router = useRouter();
    const [chatHistory, setChatHistory] = useState<gptResponse[]>([]);

    const getUser = async () => {
        const res = await current_profile();
        if (!res) {
            router.push('/login');
        }
    };

    const getDocument = async () => {
        const docRef = doc(FirebaseDb, 'chats', params.chatUrl);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setChatHistory(docSnap.data().responses as gptResponse[]);
            console.log('Document data:', docSnap.data().responses);
        } else {
            console.log('No such document!');
        }
    };
    useEffect(() => {
        getUser().then(() => {
            getDocument();
        });
    }, []);

    return (
        <div>
            {/* <Header /> */}
            <div className='relative flex h-full w-full overflow-hidden transition-colors z-0'>
                <div className='h-screen w-screen flex justify-center items-center'>
                    <ChatNav />
                    <ChatBox chatHistory={chatHistory} setChatHistory={setChatHistory} />
                </div>
            </div>
        </div>
    );
}
