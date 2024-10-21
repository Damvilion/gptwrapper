import { FirebaseAuth } from '@/firebase/firebase-config';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, username, password } = body;
}
