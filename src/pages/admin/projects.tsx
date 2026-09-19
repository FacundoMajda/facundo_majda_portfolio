"use client";

import { useState, useMemo, useCallback } from "react";
import Head from "next/head";
import { ColumnDef } from "@tanstack/react-table";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/data-table";
import { DataTableColumnHeader } from "@/components/admin/data-table-column-header";
import { DataTableRowActions } from "@/components/admin/data-table-row-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Briefcase, Star, Eye, EyeOff } from "lucide-react";
import { db } from "@/db";
import { project, techTag } from "@/db/schema";
import { asc } from "drizzle-orm";

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  tech: string[];
  shortDesc: string;
  longDesc: string;
  repoUrl: string | null;
  caseStudyUrl: string | null;
  color: string | null;
  images: string[];
  metrics: Record<string, unknown> | null;
  isClientWork: boolean;
  featured: boolean;
  order: number;
  publishedAt: string | null;
};

const empty: Omit<Project, "id"> = {
  slug: "",
  title: "",
  category: "",
  tech: [],
  shortDesc: "",
  longDesc: "",
  repoUrl: "",
  caseStudyUrl: "",
  color: "from-blue-600 to-purple-600",
  images: [],
  metrics: null,
  isClientWork: false,
  featured: true,
  order: 0,
  publishedAt: null,
};

export async function getServerSideProps() {
  const rows = await db.select().from(project).orderBy(asc(project.order));
  const allTags = await db
    .select({ name: techTag.name, category: techTag.category })
    .from(techTag)
    .orderBy(asc(techTag.category), asc(techTag.order));
  return {
    props: {
      projects: rows.map((r) => ({
        ...r,
        publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
      })),
      techOptions: Array.from(new Map(allTags.map((t) => [t.name, t])).values()),
    },
  };
}

export default function ProjectsAdmin({
  projects: initial,
  techOptions,
}: {
  projects: Project[];
  techOptions: { name: string; category: string }[];
}) {
  const [items, setItems] = useState<Project[]>(initial);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Project, "id">>(empty);

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  async function persist(method: "POST" | "PATCH", body: Record<string, unknown>) {
    const url = "/api/admin/projects";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message ?? data.error ?? "Save failed");
      return null;
    }
    return data;
  }

  async function save() {
    const body = editing ? { id: editing.id, ...draft } : draft;
    const data = await persist(editing ? "PATCH" : "POST", body);
    if (!data) return;
    const normalized: Project = { ...data, publishedAt: data.publishedAt };
    if (editing) {
      setItems((xs) => xs.map((x) => (x.id === editing.id ? normalized : x)));
    } else {
      setItems((xs) => [...xs, normalized]);
    }
    setEditing(null);
    setCreating(false);
    setDraft(empty);
  }

  async function remove(p: Project) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id }),
    });
    setItems((xs) => xs.filter((x) => x.id !== p.id));
  }

  const togglePublish = useCallback(async (p: Project) => {
    const next = {
      publishedAt: p.publishedAt ? null : new Date().toISOString(),
    };
    const data = await persist("PATCH", { id: p.id, ...next });
    if (!data) return;
    setItems((xs) => xs.map((x) => (x.id === p.id ? { ...x, publishedAt: data.publishedAt } : x)));
  }, []);

  const toggleFeatured = useCallback(async (p: Project) => {
    const data = await persist("PATCH", { id: p.id, featured: !p.featured });
    if (!data) return;
    setItems((xs) => xs.map((x) => (x.id === p.id ? { ...x, featured: data.featured } : x)));
  }, []);

  function startEdit(p: Project) {
    setEditing(p);
    setCreating(false);
    setDraft({
      slug: p.slug,
      title: p.title,
      category: p.category ?? "",
      tech: [...p.tech],
      shortDesc: p.shortDesc,
      longDesc: p.longDesc,
      repoUrl: p.repoUrl ?? "",
      caseStudyUrl: p.caseStudyUrl ?? "",
      color: p.color ?? "from-blue-600 to-purple-600",
      images: [...p.images],
      metrics: p.metrics,
      isClientWork: p.isClientWork,
      featured: p.featured,
      order: p.order,
      publishedAt: p.publishedAt,
    });
  }

  function toggleTech(name: string) {
    setDraft((d) => ({
      ...d,
      tech: d.tech.includes(name) ? d.tech.filter((t) => t !== name) : [...d.tech, name],
    }));
  }

  const columns = useMemo<ColumnDef<Project>[]>(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center gap-3 min-w-[260px]">
              {p.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0]} alt="" className="w-10 h-10 rounded object-cover shrink-0 bg-neutral-900" />
              ) : (
                <div className={`w-1 h-10 rounded-full bg-gradient-to-b ${p.color ?? "from-blue-600 to-purple-600"} shrink-0`} />
              )}
              <div className="min-w-0">
                <div className="font-medium text-white truncate flex items-center gap-2">
                  {p.title}
                  {p.featured && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />}
                </div>
                <div className="text-xs text-neutral-500 truncate">{p.slug}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
        cell: ({ row }) => {
          const cat = row.original.category;
          return cat ? (
            <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 font-normal">
              {cat}
            </Badge>
          ) : (
            <span className="text-neutral-600">—</span>
          );
        },
        filterFn: (row, _id, value) => (row.original.category ?? "") === value,
      },
      {
        accessorKey: "tech",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Stack" />,
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-[280px]">
            {row.original.tech.slice(0, 4).map((t) => (
              <span key={t} className="px-1.5 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded font-mono">
                {t}
              </span>
            ))}
            {row.original.tech.length > 4 && (
              <span className="text-xs text-neutral-500">+{row.original.tech.length - 4}</span>
            )}
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "flags",
        header: "Flags",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex flex-wrap gap-1">
              {p.isClientWork && (
                <Badge className="bg-purple-900/40 text-purple-300 border-purple-800 font-normal">
                  <Briefcase className="w-3 h-3 mr-1" /> Client
                </Badge>
              )}
              {p.publishedAt ? (
                <Badge className="bg-emerald-900/40 text-emerald-300 border-emerald-800 font-normal">
                  <Eye className="w-3 h-3 mr-1" /> Live
                </Badge>
              ) : (
                <Badge className="bg-neutral-800 text-neutral-500 border-neutral-700 font-normal">
                  <EyeOff className="w-3 h-3 mr-1" /> Draft
                </Badge>
              )}
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "order",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
        cell: ({ row }) => <span className="text-neutral-400 font-mono text-sm">{row.original.order}</span>,
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <DataTableRowActions
            row={row}
            onEdit={startEdit}
            onDelete={remove}
            extraActions={[
              {
                label: row.original.publishedAt ? "Unpublish" : "Publish",
                onClick: () => togglePublish(row.original),
              },
              {
                label: row.original.featured ? "Unfeature" : "Feature",
                onClick: () => toggleFeatured(row.original),
              },
              ...(row.original.caseStudyUrl
                ? [
                    {
                      label: "Open case study",
                      onClick: () => window.open(row.original.caseStudyUrl!, "_blank"),
                    },
                  ]
                : []),
            ]}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [],
  );

  return (
    <>
      <Head>
        <title>Projects · Portfolio Admin</title>
      </Head>
      <AdminLayout title="Projects">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-neutral-400">
            {items.length} project{items.length === 1 ? "" : "s"} · {items.filter((p) => p.publishedAt).length} live · {items.filter((p) => p.featured).length} featured
          </p>
          <Button
            onClick={() => {
              setCreating(true);
              setEditing(null);
              setDraft(empty);
            }}
          >
            <Plus className="w-4 h-4" />
            New project
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={items}
          searchKey="title"
          searchPlaceholder="Filter by title, slug, category..."
          onRowClick={(row) => {
            if (row.publishedAt) {
              window.open(`/${row.slug}`, "_blank");
            }
          }}
          emptyState="No projects yet. Click 'New project' to add the first one."
        />

        {(creating || editing) && (
          <EditDialog
            draft={draft}
            setDraft={setDraft}
            editing={editing}
            techOptions={techOptions}
            toggleTech={toggleTech}
            autoSlug={autoSlug}
            onSave={save}
            onClose={() => {
              setEditing(null);
              setCreating(false);
            }}
          />
        )}
      </AdminLayout>
    </>
  );
}

function EditDialog({
  draft,
  setDraft,
  editing,
  techOptions,
  toggleTech,
  autoSlug,
  onSave,
  onClose,
}: {
  draft: Omit<Project, "id">;
  setDraft: React.Dispatch<React.SetStateAction<Omit<Project, "id">>>;
  editing: Project | null;
  techOptions: { name: string; category: string }[];
  toggleTech: (name: string) => void;
  autoSlug: (t: string) => string;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-white">
            {editing ? `Edit · ${editing.title}` : "New project"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Title</label>
            <Input
              value={draft.title}
              onChange={(e) => {
                const t = e.target.value;
                setDraft((d) => ({
                  ...d,
                  title: t,
                  ...(!editing ? { slug: autoSlug(t) } : {}),
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Slug</label>
            <Input
              value={draft.slug}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              className="font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Category</label>
            <Input
              value={draft.category ?? ""}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              placeholder="AI & EdTech"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Color gradient</label>
            <Input
              value={draft.color ?? ""}
              onChange={(e) => setDraft({ ...draft, color: e.target.value })}
              placeholder="from-blue-600 to-purple-600"
              className="font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Order</label>
            <Input
              type="number"
              value={draft.order}
              onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })}
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
              Tech stack ({draft.tech.length})
            </label>
            <div className="flex flex-wrap gap-2 p-3 bg-neutral-900 border border-neutral-800 rounded-md min-h-[3rem]">
              {draft.tech.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTech(t)}
                  className="px-2.5 py-1 bg-emerald-900/40 text-emerald-300 text-xs rounded border border-emerald-800"
                  title="Click to remove"
                >
                  {t} ×
                </button>
              ))}
              {draft.tech.length === 0 && (
                <span className="text-xs text-neutral-600">Click tags below to add</span>
              )}
            </div>
            <div className="mt-2 max-h-32 overflow-y-auto flex flex-wrap gap-1.5">
              {techOptions
                .filter((t) => !draft.tech.includes(t.name))
                .map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => toggleTech(t.name)}
                    className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded"
                  >
                    + {t.name}
                  </button>
                ))}
            </div>
          </div>
          <div className="col-span-3">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Short description</label>
            <textarea
              rows={2}
              value={draft.shortDesc}
              onChange={(e) => setDraft({ ...draft, shortDesc: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white text-sm"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Long description (Markdown)</label>
            <textarea
              rows={6}
              value={draft.longDesc}
              onChange={(e) => setDraft({ ...draft, longDesc: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Repo URL</label>
            <Input
              value={draft.repoUrl ?? ""}
              onChange={(e) => setDraft({ ...draft, repoUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Case study URL</label>
            <Input
              value={draft.caseStudyUrl ?? ""}
              onChange={(e) => setDraft({ ...draft, caseStudyUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Status</label>
            <div className="flex items-center gap-3 h-9">
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <input
                  type="checkbox"
                  checked={draft.publishedAt !== null}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      publishedAt: e.target.checked ? new Date().toISOString() : null,
                    })
                  }
                />
                {draft.publishedAt ? "Published" : "Draft"}
              </label>
            </div>
          </div>
          <div className="col-span-3">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Flags</label>
            <div className="flex items-center gap-4 h-9">
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <Checkbox
                  checked={draft.featured}
                  onCheckedChange={(c) => setDraft({ ...draft, featured: !!c })}
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <Checkbox
                  checked={draft.isClientWork}
                  onCheckedChange={(c) => setDraft({ ...draft, isClientWork: !!c })}
                />
                Client work
              </label>
            </div>
          </div>
          <div className="col-span-3">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
              Images ({draft.images.length})
            </label>
            <ImagesEditor
              value={draft.images}
              onChange={(images) => setDraft({ ...draft, images })}
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Metrics (key → value)</label>
            <MetricsEditor
              value={draft.metrics ?? {}}
              onChange={(m) => setDraft({ ...draft, metrics: Object.keys(m).length === 0 ? null : m })}
            />
          </div>
        </div>
        <div className="sticky bottom-0 bg-neutral-950 border-t border-neutral-800 px-6 py-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>{editing ? "Save changes" : "Create project"}</Button>
        </div>
      </div>
    </div>
  );
}

function ImagesEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function update(idx: number, url: string) {
    onChange(value.map((v, i) => (i === idx ? url : v)));
  }
  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  return (
    <div className="space-y-2">
      {value.map((url, i) => (
        <div key={i} className="flex gap-2 items-center">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt=""
              className="w-10 h-10 rounded object-cover shrink-0 bg-neutral-900 border border-neutral-800"
              onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
              onLoad={(e) => { e.currentTarget.style.visibility = "visible"; }}
            />
          ) : (
            <div className="w-10 h-10 rounded shrink-0 bg-neutral-900 border border-neutral-800" />
          )}
          <Input
            value={url}
            onChange={(e) => update(i, e.target.value)}
            placeholder="https://.../screenshot.png"
            className="flex-1"
          />
          <Button variant="ghost" size="icon" onClick={() => remove(i)} className="text-neutral-500 hover:text-red-400">
            ×
          </Button>
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() => onChange([...value, ""])} className="text-emerald-400">
        + Add image
      </Button>
    </div>
  );
}

function MetricsEditor({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (v: Record<string, unknown>) => void;
}) {
  const entries = Object.entries(value);

  function update(idx: number, key: string, val: string) {
    const next: Record<string, unknown> = {};
    entries.forEach(([k, v], i) => {
      next[i === idx ? key || k : k] = i === idx ? val : v;
    });
    if (idx === entries.length) next[key] = val;
    onChange(next);
  }

  function remove(idx: number) {
    const next: Record<string, unknown> = {};
    entries.forEach(([k, v], i) => {
      if (i !== idx) next[k] = v;
    });
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {entries.map(([k, v], i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={k}
            onChange={(e) => update(i, e.target.value, String(v))}
            placeholder="key"
            className="flex-1 font-mono"
          />
          <Input
            value={String(v)}
            onChange={(e) => update(i, k, e.target.value)}
            placeholder="value"
            className="flex-1"
          />
          <Button variant="ghost" size="icon" onClick={() => remove(i)} className="text-neutral-500 hover:text-red-400">
            ×
          </Button>
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() => onChange({ ...value, "": "" })} className="text-emerald-400">
        + Add metric
      </Button>
    </div>
  );
}
