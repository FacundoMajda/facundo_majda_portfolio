import Head from "next/head";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/db";
import {
  profile,
  techTag,
  experience,
  education,
  project,
  writingEntry,
} from "@/db/schema";
import { count, eq, isNotNull } from "drizzle-orm";

type Count = { label: string; value: number; href: string };
type Recent = { title: string; meta: string; href: string };

export async function getServerSideProps() {
  const [profileCount] = await db.select({ c: count() }).from(profile);
  const [techTagCount] = await db.select({ c: count() }).from(techTag).where(eq(techTag.featured, true));
  const [expCount] = await db.select({ c: count() }).from(experience);
  const [eduCount] = await db.select({ c: count() }).from(education);
  const [pubProjCount] = await db
    .select({ c: count() })
    .from(project)
    .where(isNotNull(project.publishedAt));
  const [draftProjCount] = await db
    .select({ c: count() })
    .from(project);
  const [writingCount] = await db.select({ c: count() }).from(writingEntry);

  const counts: Count[] = [
    { label: "Profile", value: profileCount.c, href: "/admin/profile" },
    { label: "Featured tech tags", value: techTagCount.c, href: "/admin/tech-tags" },
    { label: "Experience", value: expCount.c, href: "/admin/experience" },
    { label: "Education", value: eduCount.c, href: "/admin/education" },
    { label: "Published projects", value: pubProjCount.c, href: "/admin/projects" },
    { label: "Draft projects", value: draftProjCount.c - pubProjCount.c, href: "/admin/projects" },
    { label: "Writing entries", value: writingCount.c, href: "/admin/writing" },
  ];

  const recentProjects = await db
    .select()
    .from(project)
    .orderBy(project.id)
    .limit(5);
  const recent: Recent[] = recentProjects.map((p) => ({
    title: p.title,
    meta: `${p.isClientWork ? "Client work" : "Personal"} · ${p.publishedAt ? "Published" : "Draft"}`,
    href: "/admin/projects",
  }));

  return { props: { counts, recent } };
}

export default function AdminDashboard({
  counts,
  recent,
}: {
  counts: Count[];
  recent: Recent[];
}) {
  return (
    <>
      <Head>
        <title>Dashboard · Portfolio Admin</title>
      </Head>
      <AdminLayout title="Dashboard">
        <section className="mb-8">
          <h2 className="text-sm uppercase tracking-wide text-neutral-500 mb-3">Content at a glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {counts.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="block bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg p-4 transition"
              >
                <div className="text-2xl font-semibold text-white">{c.value}</div>
                <div className="text-xs text-neutral-400 mt-1">{c.label}</div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-wide text-neutral-500 mb-3">Recent projects</h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg divide-y divide-neutral-800">
            {recent.length === 0 ? (
              <div className="px-4 py-6 text-sm text-neutral-500 text-center">
                No projects yet. Run the seed script or create one from the Projects page.
              </div>
            ) : (
              recent.map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  className="flex items-center justify-between px-4 py-3 hover:bg-neutral-800 transition"
                >
                  <span className="text-sm text-white truncate">{r.title}</span>
                  <span className="text-xs text-neutral-500 ml-3 shrink-0">{r.meta}</span>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm uppercase tracking-wide text-neutral-500 mb-3">Next steps</h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-white">First time here?</strong> Populate the database from your
              current <code className="text-emerald-400">src/config/profile.tsx</code> by running:
            </p>
            <pre className="bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-xs text-emerald-300 overflow-x-auto">
              npm run db:seed
            </pre>
            <p className="text-neutral-400">
              Then refresh this page to see the counts populate.
            </p>
          </div>
        </section>
      </AdminLayout>
    </>
  );
}
