'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Login failed');
      }

      // Successfully logged in
      const data = await res.json();
      if (data.admin) {
        router.push('/backoffice/calendar');
      } else {
        router.push('/');
      }
      router.refresh();
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
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-xl text-left shadow-2xl">
      <div className="mb-8 space-y-2 text-center text-white">
        <h3 className="text-3xl font-extrabold tracking-tight">Access Backoffice</h3>
        <p className="text-sm text-muted-foreground">Sign in to manage releases.</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center font-medium animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200" htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full p-3 rounded-lg bg-background border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full p-3 rounded-lg bg-background border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 rounded-lg font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
        >
          {loading ? 'Authenticating...' : 'Sign In ->'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/" className="text-primary hover:underline font-medium">
          Register here
        </Link>
      </div>
    </div>
  );
}
