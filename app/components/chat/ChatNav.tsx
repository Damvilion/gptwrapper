import fakeData from '@/app/lib/fakedata';
import SavedChat from './SavedChat';
import { FaPenToSquare } from 'react-icons/fa6';
import { BiSolidDockLeft } from 'react-icons/bi';

export default function ChatNav() {
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

                        {fakeData.map((index) => (
                            <SavedChat title={index.title} key={index.id} />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
