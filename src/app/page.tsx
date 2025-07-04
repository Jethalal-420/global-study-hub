// File: src/app/page.tsx
//--------------------------------------------------------------------------------------------------------------------------
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Link href="/login">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
          Go to Login
        </button>
      </Link>
    </main>
  );
}
