"use client";

import { useState, useMemo } from "react";
import Head from "next/head";
import { ColumnDef } from "@tanstack/react-table";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/data-table";
import { DataTableColumnHeader } from "@/components/admin/data-table-column-header";
import { DataTableRowActions } from "@/components/admin/data-table-row-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink } from "lucide-react";
import { db } from "@/db";
import { writingEntry } from "@/db/schema";
import { desc } from "drizzle-orm";

type Entry = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  url: string;
  platform: string;
  language: string;
  publishedAt: string;
};

const empty: Omit<Entry, "id"> = {
  slug: "",
  title: "",
  summary: "",
  url: "",
  platform: "dev.to",
  language: "es",
  publishedAt: new Date().toISOString().slice(0, 10),
};

export async function getServerSideProps() {
  const rows = await db.select().from(writingEntry).orderBy(desc(writingEntry.publishedAt));
  return {
    props: {
      entries: rows.map((r) => ({ ...r, publishedAt: r.publishedAt.toISOString().slice(0, 10) })),
    },
  };
}

export default function WritingAdmin({ entries: initial }: { entries: Entry[] }) {
  const [items, setItems] = useState<Entry[]>(initial);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Entry, "id">>(empty);

  async function persist(method: "POST" | "PATCH", body: Record<string, unknown>) {
    const res = await fetch("/api/admin/writing", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) { alert(data.message ?? data.error ?? "Save failed"); return null; }
    return data;
  }

  async function save() {
    const body = editing
      ? { id: editing.id, ...draft, publishedAt: new Date(draft.publishedAt).toISOString() }
      : { ...draft, publishedAt: new Date(draft.publishedAt).toISOString() };
    const data = await persist(editing ? "PATCH" : "POST", body);
    if (!data) return;
    const normalized: Entry = { ...data, publishedAt: data.publishedAt.slice(0, 10) };
    if (editing) {
      setItems((xs) => xs.map((x) => (x.id === editing.id ? normalized : x)));
    } else {
      setItems((xs) => [normalized, ...xs]);
    }
    setEditing(null);
    setCreating(false);
    setDraft(empty);
  }

  async function remove(e: Entry) {
    if (!confirm(`Delete "${e.title}"?`)) return;
    await fetch("/api/admin/writing", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: e.id }),
    });
    setItems((xs) => xs.filter((x) => x.id !== e.id));
  }

  function startEdit(e: Entry) {
    setEditing(e);
    setCreating(false);
    setDraft({
      slug: e.slug,
      title: e.title,
      summary: e.summary,
      url: e.url,
      platform: e.platform,
      language: e.language,
      publishedAt: e.publishedAt,
    });
  }

  const columns = useMemo<ColumnDef<Entry>[]>(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => (
          <div className="min-w-[260px]">
            <div className="text-white font-medium">{row.original.title}</div>
            <a
              href={row.original.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              {row.original.url.replace(/^https?:\/\//, "").slice(0, 50)}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ),
      },
      {
        accessorKey: "platform",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Platform" />,
        cell: ({ row }) => <Badge variant="secondary" className="font-normal">{row.original.platform}</Badge>,
      },
      {
        accessorKey: "language",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lang" />,
        cell: ({ row }) => (
          <span className="font-mono text-xs uppercase text-neutral-400">{row.original.language}</span>
        ),
      },
      {
        accessorKey: "publishedAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Published" />,
        cell: ({ row }) => <span className="text-neutral-400 font-mono text-xs">{row.original.publishedAt}</span>,
      },
      {
        accessorKey: "summary",
        header: "Summary",
        cell: ({ row }) => (
          <span className="text-xs text-neutral-500 line-clamp-2 max-w-[400px] block">{row.original.summary}</span>
        ),
        enableSorting: false,
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => <DataTableRowActions row={row} onEdit={startEdit} onDelete={remove} />,
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [],
  );

  return (
    <>
      <Head>
        <title>Writing · Portfolio Admin</title>
      </Head>
      <AdminLayout title="Writing">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-neutral-400">
            {items.length} entr{items.length === 1 ? "y" : "ies"} · sorted by publication date
          </p>
          <Button onClick={() => { setCreating(true); setEditing(null); setDraft(empty); }}>
            <Plus className="w-4 h-4" />
            Add entry
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={items}
          searchKey="title"
          searchPlaceholder="Filter by title, summary..."
          emptyState="No writing entries yet."
        />

        {(creating || editing) && (
          <EditDialog
            draft={draft}
            setDraft={setDraft}
            editing={editing}
            onSave={save}
            onClose={() => { setEditing(null); setCreating(false); }}
          />
        )}
      </AdminLayout>
    </>
  );
}

function EditDialog({
  draft, setDraft, editing, onSave, onClose,
}: {
  draft: Omit<Entry, "id">;
  setDraft: React.Dispatch<React.SetStateAction<Omit<Entry, "id">>>;
  editing: Entry | null;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-white">{editing ? "Edit writing" : "New writing entry"}</h2>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white text-2xl leading-none">×</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Title</label>
            <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Slug</label>
              <Input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} className="font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Published</label>
              <Input type="date" value={draft.publishedAt} onChange={(e) => setDraft({ ...draft, publishedAt: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">URL</label>
            <Input value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Platform</label>
              <Input value={draft.platform} onChange={(e) => setDraft({ ...draft, platform: e.target.value })} list="platforms" />
              <datalist id="platforms">
                <option value="dev.to" />
                <option value="LinkedIn" />
                <option value="Medium" />
                <option value="Hashnode" />
                <option value="Personal" />
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Language</label>
              <select
                value={draft.language}
                onChange={(e) => setDraft({ ...draft, language: e.target.value })}
                className="w-full h-9 px-3 bg-neutral-900 border border-neutral-800 rounded-md text-white text-sm"
              >
                <option value="es">es</option>
                <option value="en">en</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Summary</label>
            <textarea
              rows={2}
              value={draft.summary}
              onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white text-sm"
            />
          </div>
        </div>
        <div className="sticky bottom-0 bg-neutral-950 border-t border-neutral-800 px-6 py-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>{editing ? "Save changes" : "Create entry"}</Button>
        </div>
      </div>
    </div>
  );
}
