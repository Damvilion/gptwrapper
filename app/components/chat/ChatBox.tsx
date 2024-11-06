import React, { useState, ChangeEvent } from 'react';
import { IoMdAttach } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

export default function ChatBox() {
    const [file, setFile] = useState<File | null>(null);

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

    const [, setMessage] = useState('');

    return (
        <div className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'>
            <main className='bg-slate-700 relative h-full w-full flex-1 overflow-auto transition-width'>
                <div className='composer-parent flex h-full flex-col focus-visible:outline-0'>
                    <div className='flex-1 overflow-hidden'>
                        <div className='h-full'>
                            <div className='react-scroll-to-bottom--css-wyqov-79elbk h-full '>
                                <div className='react-scroll-to-bottom--css-wyqov-1n7m0yu'>
                                    <div className='flex flex-col text-sm md:pb-9'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent w-full'>
                        <div>
                            <div className='m-auto text-base px-3 w-full md:px-5 lg:px-4 xl:px-5'>
                                <div className='mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]'>
                                    <div className='flex bg-slate-600 w-full flex-col transition-colors contain-inline-size rounded-3xl p-3 pt-3 dark:bg-token-main-surface-secondary'>
                                        {/* <Input placeholder='Type your message' className='border-none focus:outline-none focus:border-none' /> */}

                                        <span
                                            contentEditable='true'
                                            onInput={(e) => setMessage(e.currentTarget.textContent || '')}
                                            className='border-none outline-none border outline py-3 text-white'></span>
                                        <span className='flex justify-between'>
                                            <input type='file' className='hidden' id='fileInput' onChange={handleFileChange}></input>
                                            <div className='flex'>
                                                <IoMdAttach size={30} color='white' className='cursor-pointer' onClick={attachFile} />
                                                {file && <MdCancel size={30} color='red' onClick={() => setFile(null)} />}
                                            </div>
                                            {file && <span className='text-center flex-1 text-white'>{file.name}</span>}
                                            <IoSend size={30} color='white' />
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
