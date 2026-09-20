import { useState, FormEvent, useEffect } from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/db";
import { profile } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CheckCircle2, Save } from "lucide-react";

type ProfileRow = {
  heroTitle: string;
  heroTagline: string;
  aboutText: string;
  statusLine: string;
  yearsExp: number;
  contactEmail: string;
  seoTitle: string;
  seoDescription: string;
  seoUrl: string;
};

export async function getServerSideProps() {
  const rows = await db
    .select({
      heroTitle: profile.heroTitle,
      heroTagline: profile.heroTagline,
      aboutText: profile.aboutText,
      statusLine: profile.statusLine,
      yearsExp: profile.yearsExp,
      contactEmail: profile.contactEmail,
      seoTitle: profile.seoTitle,
      seoDescription: profile.seoDescription,
      seoUrl: profile.seoUrl,
    })
    .from(profile)
    .where(eq(profile.id, "singleton"))
    .limit(1);
  const row: ProfileRow =
    rows.length > 0
      ? (rows[0] as ProfileRow)
      : {
          heroTitle: "",
          heroTagline: "",
          aboutText: "",
          statusLine: "",
          yearsExp: 0,
          contactEmail: "",
          seoTitle: "",
          seoDescription: "",
          seoUrl: "",
        };
  return { props: { initial: row } };
}

export default function ProfileEditor({ initial }: { initial: ProfileRow }) {
  const [form, setForm] = useState<ProfileRow>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(!initial.heroTitle);

  useEffect(() => {
    setIsNew(!initial.heroTitle);
  }, [initial.heroTitle]);

  function update<K extends keyof ProfileRow>(key: K, value: ProfileRow[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? data.error ?? "Save failed");
        return;
      }
      setSaved(true);
      setIsNew(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  const fields: Array<{
    key: keyof ProfileRow;
    label: string;
    type: "text" | "textarea" | "number" | "email" | "url";
    hint?: string;
  }> = [
    { key: "heroTitle", label: "Hero title", type: "text", hint: "e.g. AI/ML & Automation Engineer" },
    { key: "heroTagline", label: "Hero tagline", type: "text", hint: "Short subtitle next to the title" },
    { key: "statusLine", label: "Status line", type: "text", hint: "Availability / call to action" },
    { key: "aboutText", label: "About text", type: "textarea", hint: "Markdown supported. Shown in About Me section." },
    { key: "yearsExp", label: "Years of experience", type: "number", hint: "Integer, used in the OVER X YEARS badge" },
    { key: "contactEmail", label: "Contact email", type: "email" },
    { key: "seoTitle", label: "SEO title", type: "text" },
    { key: "seoDescription", label: "SEO description", type: "textarea", hint: "160 chars or less recommended" },
    { key: "seoUrl", label: "SEO canonical URL", type: "url" },
  ];

  return (
    <>
      <Head>
        <title>Profile · Portfolio Admin</title>
      </Head>
      <AdminLayout title="Profile">
        <form onSubmit={save} className="max-w-2xl space-y-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-medium text-white">
                {isNew ? "Create profile" : "Edit profile"}
              </h2>
              <p className="text-sm text-neutral-400">
                Singleton row. Changes apply across the whole portfolio.
              </p>
            </div>
            {saved && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Saved
              </div>
            )}
          </div>

          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm text-neutral-300 mb-1.5">
                {f.label}
                {f.hint && (
                  <span className="block text-xs text-neutral-500 mt-0.5">{f.hint}</span>
                )}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  rows={f.key === "aboutText" ? 6 : 3}
                  value={form[f.key] as string}
                  onChange={(e) => update(f.key, e.target.value as ProfileRow[typeof f.key])}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono text-sm"
                />
              ) : (
                <input
                  type={f.type}
                  value={form[f.key] as string | number}
                  onChange={(e) =>
                    update(
                      f.key,
                      (f.type === "number" ? Number(e.target.value) : e.target.value) as ProfileRow[typeof f.key],
                    )
                  }
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                />
              )}
            </div>
          ))}

          {error && (
            <div className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-700 text-neutral-950 font-medium rounded-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save profile"}
          </button>
        </form>
      </AdminLayout>
    </>
  );
}
