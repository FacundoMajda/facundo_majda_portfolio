"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: err } = await authClient.signIn.email(email, password);
      if (err) {
        setError(err.message ?? "Sign-in failed");
        return;
      }
      const next = typeof router.query.next === "string" ? router.query.next : "/admin";
      router.push(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Admin · Facundo Majda</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <ShieldCheck className="w-10 h-10 mx-auto text-emerald-400 mb-3" />
            <h1 className="text-2xl font-semibold text-white">Portfolio Admin</h1>
            <p className="text-neutral-400 text-sm mt-1">
              Neon Auth handles credentials — never stored in this app.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              {error && (
                <div className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-700 text-neutral-950 font-medium rounded-md flex items-center justify-center gap-2 transition"
              >
                {loading ? "Signing in…" : "Sign in"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
