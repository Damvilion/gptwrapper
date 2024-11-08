import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase/firebase-config';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export default function CustomerLoginComponent() {
    const router = useRouter();
    const formSchema = z.object({
        username: z.string().min(2, {
            message: 'Username must be at least 2 characters.',
        }),
        password: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { username, password } = data;

        try {
            const res = await signInWithEmailAndPassword(FirebaseAuth, username, password);
            if (res) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-center flex justify-center'>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='username' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-center flex justify-center'>Password</FormLabel>
                            <FormControl>
                                <Input placeholder='password' type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='flex justify-center'>
                    login
                </Button>
            </form>
        </Form>
    );
}
