'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Other'];

export default function ProfileSetupPage() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const [form, setForm] = useState({
    college: '',
    country: '',
    course: '',
    interests: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    // Not logged in, redirect to login
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          college: form.college,
          country: form.country,
          course: form.course,
          interests: form.interests,
          createdAt: new Date(),
        },
        { merge: true }
      );
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">Complete Your Profile</h1>
          <p className="text-gray-500 text-sm">Let others know more about you!</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="college"
            type="text"
            required
            placeholder="College / University"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={form.college}
            onChange={handleChange}
          />
          <select
            name="country"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={form.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <input
            name="course"
            type="text"
            required
            placeholder="Course / Stream"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={form.course}
            onChange={handleChange}
          />
          <input
            name="interests"
            type="text"
            placeholder="Interests (comma separated)"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={form.interests}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
