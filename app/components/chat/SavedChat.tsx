import Dots from './Dots';

export default function SavedChat({ title, url }: { title: string; url: string }) {
    return (
        <li className='relative list-none hover:bg-slate-600'>
            <div className='no-draggable group relative rounded-lg active:opacity-90 bg-token-sidebar-surface-secondary flex items-center justify-between'>
                <Dots />
                <a href={url} className='flex flex-1 items-center gap-2 p-2 mr-auto cursor-pointer'>
                    <div className='relative grow overflow-hidden whitespace-nowrap text-white'>
                        {title}
                        <div className='absolute bottom-0 top-0 to-transparent ltr:right-0 ltr:bg-gradient-to-l rtl:left-0 rtl:bg-gradient-to-r from-token-sidebar-surface-secondary w-10 from-60%'></div>
                    </div>
                </a>
                {/* <HiOutlineDotsHorizontal color='white' className='cursor-pointer' /> */}
            </div>
        </li>
    );
}
