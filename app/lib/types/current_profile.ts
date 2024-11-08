import { FirebaseAuth } from '@/firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export type Profile = {
    id: string;
    username?: string;
    email?: string | null;
    profileUrl?: string | null;
};

export const current_profile = () => {
    return new Promise((resolve) => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (user) {
                const profile: Profile = { id: user.uid, email: user.email, profileUrl: user.photoURL };
                resolve(profile);
            } else {
                resolve(null);
            }
        });
    });
};
