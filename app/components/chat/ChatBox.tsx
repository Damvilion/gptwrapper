import React, { useState, ChangeEvent, useRef } from 'react';
import { IoMdAttach } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import UserAuthAvatar from './avatar/UserAuthAvatar';
import axios from 'axios';
import Responses, { HtmlTags } from './Responses';
import { useParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseDb } from '@/firebase/firebase-config';

export type gptResponse = {
    text: string;
    htmlTag: HtmlTags;
    gptResponse: boolean;
};

type gpt = {
    responses: gptResponse[];
};

export default function ChatBox({
    chatHistory,
    setChatHistory,
}: {
    chatHistory: gptResponse[];
    setChatHistory: React.Dispatch<React.SetStateAction<gptResponse[]>>;
}) {
    const [file, setFile] = useState<File | null>(null);
    const params = useParams();

    const attachFile = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;
        setFile(file);
    };
    const spanRef = useRef<HTMLSpanElement>(null);

    const [message, setMessage] = useState('');

    const sendToGPT = async () => {
        setChatHistory((prev) => [...prev, { text: message, htmlTag: 'p', gptResponse: false }]);
        setMessage('');
        if (spanRef.current) {
            spanRef.current.textContent = '';
        }
        try {
            const res = await axios.post('/api/openai/gptchat', { message, chatHistory });
            const gptRes = JSON.parse(res.data.message.content) as gpt;

            const gptResponseArray = gptRes.responses as gptResponse[];

            setChatHistory((prev) => [...prev, ...gptResponseArray]);

            const chatRef = doc(FirebaseDb, 'chats', params.chatUrl as string);
            // await setDoc(chatRef, gptResponse, { merge: true });
            const new_message = {
                text: message,
                htmlTag: 'p',
                gptResponse: false,
            };
            const new_doc = {
                responses: [...chatHistory, new_message, ...gptResponseArray],
            };

            await updateDoc(chatRef, new_doc);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'>
            <UserAuthAvatar />
            <main className='bg-slate-700 relative h-full w-full flex-1 overflow-auto transition-width'>
                <div className='composer-parent flex h-full flex-col focus-visible:outline-0'>
                    <div className='flex-1 overflow-hidden'>
                        <div className='h-full'>
                            <div className='react-scroll-to-bottom--css-wyqov-79elbk h-full overflow-y-auto'>
                                <div className='react-scroll-to-bottom--css-wyqov-1n7m0yu'>
                                    <div className='flex flex-col text-sm md:pb-9 p-10'>
                                        {chatHistory &&
                                            chatHistory.map((chat, index) => (
                                                <Responses tag={chat.htmlTag} text={chat.text} key={index} gptResponse={chat.gptResponse} />
                                            ))}

                                        {!chatHistory.length && <div className='text-white text-7xl text-center'>ASK ME ANYTHING :) </div>}
                                        {/* THis is where to place GPT responses */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent w-full'>
                        <div>
                            <div className=' m-auto text-base px-3 w-full md:px-5 lg:px-4 xl:px-5'>
                                <div className='mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]'>
                                    <div className='flex bg-slate-600 w-full flex-col transition-colors contain-inline-size rounded-3xl p-3 pt-3 dark:bg-token-main-surface-secondary mb-3'>
                                        {/* <Input placeholder='Type your message' className='border-none focus:outline-none focus:border-none' /> */}

                                        <span
                                            contentEditable='true'
                                            onInput={(e) => setMessage(e.currentTarget.textContent || '')}
                                            ref={spanRef}
                                            className='border-none outline-none border outline py-3 text-white max-h-64 overflow-y-auto'></span>
                                        <span className='flex justify-between'>
                                            <input type='file' className='hidden' id='fileInput' onChange={handleFileChange}></input>
                                            <div className='flex'>
                                                <IoMdAttach size={30} color='white' className='cursor-pointer' onClick={attachFile} />
                                                {file && <MdCancel size={30} color='red' onClick={() => setFile(null)} />}
                                            </div>
                                            {file && <span className='text-center flex-1 text-white'>{file.name}</span>}
                                            <IoSend size={30} color='white' onClick={sendToGPT} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
