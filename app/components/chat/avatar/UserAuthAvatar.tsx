import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase/firebase-config';

export default function UserAuthAvatar() {
    const router = useRouter();

    const handleLogOut = async () => {
        signOut(FirebaseAuth)
            .then(() => {
                router.push('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className='flex flex-row-reverse bg-slate-700'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className='mx-2'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
