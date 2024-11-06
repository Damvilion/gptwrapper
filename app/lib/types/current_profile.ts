import { FirebaseAuth } from '@/firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export const current_profile = () => {
    // type Profile = {
    //     id: string;
    //     username: string;
    //     email?: string;
    //     profileUrl?: string;
    // };

    return new Promise((resolve) => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (user) {
                // console.log('user', user);
                // const response: axiosResponses = await axios.post('/api/auth/getCurrentUser', { id: user.uid });
                resolve(user);
            } else {
                resolve(null);
            }
        });
    });
};
