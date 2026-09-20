"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Mail, Lock, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { authClient, type SignInError } from "@/lib/auth-client";

type Status = "checking" | "idle" | "loading" | "error";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("checking");
  const [error, setError] = useState<SignInError | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // Rule 14: don't show the form to someone who already has a valid session.
  useEffect(() => {
    let cancelled = false;
    authClient.getSession().then((session) => {
      if (cancelled) return;
      if (session) {
        const next = typeof router.query.next === "string" ? router.query.next : "/admin";
        router.replace(next);
        return;
      }
      setStatus("idle");
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setError(null);
    setStatus("loading");

    const { error: signInError } = await authClient.signIn.email(email, password);
    if (signInError) {
      setError(signInError);
      setPassword("");
      setStatus("idle");
      return;
    }

    // Rule 7: a 200 from sign-in isn't authentication — confirm a session
    // actually exists before treating the user as logged in.
    const session = await authClient.getSession();
    if (!session) {
      setError({
        kind: "server",
        message: "Signed in, but no session was created. Try again — if this keeps happening, your browser may be blocking the auth cookie.",
      });
      setStatus("idle");
      return;
    }

    const next = typeof router.query.next === "string" ? router.query.next : "/admin";
    router.push(next);
  }

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="w-6 h-6 text-neutral-600 animate-spin" />
      </div>
    );
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
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm text-neutral-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    required
                    disabled={status === "loading"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={error?.kind === "invalid_credentials"}
                    aria-describedby={error ? "login-error" : undefined}
                    className="w-full pl-10 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm text-neutral-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    disabled={status === "loading"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    aria-invalid={error?.kind === "invalid_credentials"}
                    aria-describedby={error ? "login-error" : undefined}
                    className="w-full pl-10 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                  />
                </div>
              </div>
              {error && (
                <div
                  id="login-error"
                  ref={errorRef}
                  tabIndex={-1}
                  role="alert"
                  aria-live="assertive"
                  className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-md px-3 py-2 outline-none"
                >
                  {error.message}
                </div>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-700 disabled:cursor-not-allowed text-neutral-950 font-medium rounded-md flex items-center justify-center gap-2 transition"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
