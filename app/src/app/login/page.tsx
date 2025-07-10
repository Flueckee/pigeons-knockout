'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import client from '../lib/pocketbase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      await client.collection('users').authWithPassword(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const register = async () => {
    try {
      await client.collection('users').create({ email, password, passwordConfirm: password });
      await login(); // auto-login after registration
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="flex justify-between gap-4 flex-col">
            <button
              onClick={login}
              className="w-full bg-amber-500 text-white py-2 px-4 rounded-xl hover:bg-amber-600 transition"
            >
              Login
            </button>
            <button
              onClick={register}
              className="w-full outline-1 outline-amber-300 text-black py-2 px-4 rounded-xl hover:bg-amber-300 transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
