"use client";

import { useState, FormEvent } from "react";
import Head from "next/head";
import { Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: err } = await authClient.signIn.magicLink(email, "/admin");
      if (err) {
        setError(err.message ?? "Failed to send link");
        return;
      }
      setSent(true);
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
              Passwordless sign-in. Neon Auth handles credentials — never stored in this app.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl">
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
                <h2 className="text-lg font-medium text-white mb-2">Check your email</h2>
                <p className="text-neutral-400 text-sm">
                  We sent a sign-in link to <span className="text-white">{email}</span>.
                  Click the link to continue.
                </p>
                <p className="text-neutral-500 text-xs mt-4">
                  Tip: check spam if you don&apos;t see it (Neon sends via <code>auth@mail.myneon.app</code>).
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-300 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
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
                  {loading ? "Sending link…" : "Send magic sign-in link"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
