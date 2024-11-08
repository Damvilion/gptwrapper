// import fakeData from '@/app/lib/fakedata';
import SavedChat from './SavedChat';
import { FaPenToSquare } from 'react-icons/fa6';
import { BiSolidDockLeft } from 'react-icons/bi';
import { doc, getDoc } from 'firebase/firestore';
import { FirebaseDb } from '@/firebase/firebase-config';
import { useEffect, useState } from 'react';
import { current_profile, Profile } from '@/app/lib/types/current_profile';

type chat = {
    id: string;
    title: string;
    url: string;
};

type userChatInfo = {
    id: string;
    chats: chat[];
};

export default function ChatNav() {
    const [, setUserInfo] = useState<Profile | null>(null);
    const [userChat, setUserChat] = useState<userChatInfo | null>(null);

    const getCurrentUser = async () => {
        const current_user: Profile = (await current_profile()) as Profile;
        if (current_user) {
            setUserInfo(current_user);
            return current_user;
        }
    };
    const currentChatHistory = async (id: string) => {
        const chatHistoryRef = doc(FirebaseDb, 'users', id);
        const docSnap = await getDoc(chatHistoryRef);
        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            setUserChat(docSnap.data() as userChatInfo);
        } else {
            console.log('No such document!');
        }
    };

    useEffect(() => {
        getCurrentUser().then((user) => {
            if (user) {
                setUserInfo(user);
                currentChatHistory(user.id);
            }
        });
    }, []);

    return (
        <div className='h-full z-[1] flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary max-md:!w-0 bg-[#181818]'>
            <div className='h-full w-[260px]'>
                <div className='flex h-full min-h-0 flex-col'>
                    <nav className='flex h-full w-full flex-col px-3'>
                        <div className='flex justify-between h-[60px] items-center md:h-header-height'>
                            <span className='flex'>
                                <BiSolidDockLeft color='white' size={25} className='cursor-pointer' />
                            </span>
                            <span className='flex'>
                                <FaPenToSquare color='white' size={23} className='cursor-pointer' />
                            </span>
                        </div>
                        {/* <ol>
                            {fakeData.map((index) => (
                                <SavedChat title={index.title} key={index.id} />
                            ))}
                        </ol> */}

                        <ol>{userChat ? userChat.chats.map((index) => <SavedChat title={index.title} key={index.id} />) : null}</ol>
                    </nav>
                </div>
            </div>
        </div>
    );
}
