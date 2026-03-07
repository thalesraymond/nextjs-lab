'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const name = formData.get('name');
    const password = formData.get('password');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
      }

      // Automatically login or direct to login page?
      router.push('/login?registered=true');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm text-left shadow-lg">
      <div className="mb-6 space-y-2 text-center text-white">
        <h3 className="text-2xl font-bold tracking-tight">Create an Account</h3>
        <p className="text-sm text-muted-foreground">Register to access the master backoffice.</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full p-2.5 rounded-md bg-background border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200" htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full p-2.5 rounded-md bg-background border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full p-2.5 rounded-md bg-background border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 mt-2 rounded-md font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
