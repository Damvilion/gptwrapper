import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';

export default function Dots() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <HiOutlineDotsHorizontal color='white' className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
