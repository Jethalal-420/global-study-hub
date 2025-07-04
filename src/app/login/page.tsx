'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase'; // ✅ import shared auth

const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    console.log('🧠 useEffect running');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('👀 Auth state changed:', user);

      if (user) {
        console.log('✅ Logged in:', user.displayName);

        await setDoc(
          doc(db, 'users', user.uid),
          {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            createdAt: new Date(),
          },
          { merge: true }
        );

        router.replace('/dashboard');
      } else {
        console.log('⚠️ No user detected.');
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      console.log('🔐 Signing in...');
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error instanceof Error) {
        console.error('❌ Sign-in error:', error.message);
      } else {
        console.error('❌ Sign-in error:', error);
      }
    }
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>🔄 Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-2xl font-bold">Welcome to GlobalStudyHub 🌍</h1>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
