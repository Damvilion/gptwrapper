import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth, FirebaseDb } from '@/firebase/firebase-config';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { setDoc, doc } from 'firebase/firestore';

export default function CustomerSignUpComponent() {
    const router = useRouter();
    const formSchema = z
        .object({
            email: z.string().min(5, {
                message: 'Username must be at least 5 characters.',
            }),
            password: z.string().min(8, {
                message: 'Password must be at least 8 characters.',
            }),
            confirmPassword: z.string().min(8, {
                message: 'Password must be at least 8 characters.',
            }),
        })
        .refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { email, password } = data;

        try {
            const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            if (res) {
                const createdUserDoc = await setDoc(doc(FirebaseDb, 'users', res.user.uid), {
                    email,
                    id: res.user.uid,
                    chats: [],
                });

                console.log(createdUserDoc);

                router.push('/login');
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
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-center flex justify-center'>email</FormLabel>
                            <FormControl>
                                <Input placeholder='email' {...field} />
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
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-center flex justify-center'>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder='confirm password' type='password' {...field} />
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
