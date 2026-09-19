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
import { Plus } from "lucide-react";
import { db } from "@/db";
import { socialLink } from "@/db/schema";
import { asc } from "drizzle-orm";

type Link = {
  id: string;
  platform: string;
  url: string;
  order: number;
};

const empty: Omit<Link, "id"> = { platform: "", url: "", order: 0 };
const PRESETS = ["github", "linkedin", "twitter", "upwork", "email", "website"];

export async function getServerSideProps() {
  const rows = await db.select().from(socialLink).orderBy(asc(socialLink.order));
  return { props: { links: rows } };
}

export default function SocialAdmin({ links: initial }: { links: Link[] }) {
  const [items, setItems] = useState<Link[]>(initial);
  const [editing, setEditing] = useState<Link | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Link, "id">>(empty);

  async function persist(method: "POST" | "PATCH", body: Record<string, unknown>) {
    const res = await fetch("/api/admin/social", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) { alert(data.message ?? data.error ?? "Save failed"); return null; }
    return data;
  }

  async function save() {
    const body = editing ? { id: editing.id, ...draft } : draft;
    const data = await persist(editing ? "PATCH" : "POST", body);
    if (!data) return;
    if (editing) {
      setItems((xs) => xs.map((x) => (x.id === editing.id ? data : x)));
    } else {
      setItems((xs) => [...xs, data]);
    }
    setEditing(null);
    setCreating(false);
    setDraft(empty);
  }

  async function remove(it: Link) {
    if (!confirm(`Delete ${it.platform} link?`)) return;
    await fetch("/api/admin/social", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: it.id }),
    });
    setItems((xs) => xs.filter((x) => x.id !== it.id));
  }

  function startEdit(it: Link) {
    setEditing(it);
    setCreating(false);
    setDraft({ platform: it.platform, url: it.url, order: it.order });
  }

  const columns = useMemo<ColumnDef<Link>[]>(
    () => [
      {
        accessorKey: "platform",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Platform" />,
        cell: ({ row }) => (
          <span className="font-mono text-sm text-emerald-400 capitalize">{row.original.platform}</span>
        ),
      },
      {
        accessorKey: "url",
        header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
        cell: ({ row }) => (
          <a href={row.original.url} target="_blank" rel="noreferrer" className="text-sm text-neutral-300 hover:text-emerald-400 truncate block max-w-[500px]">
            {row.original.url}
          </a>
        ),
      },
      {
        accessorKey: "order",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
        cell: ({ row }) => <span className="text-neutral-500 font-mono text-xs">{row.original.order}</span>,
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
        <title>Social Links · Portfolio Admin</title>
      </Head>
      <AdminLayout title="Social Links">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-neutral-400">
            {items.length} link{items.length === 1 ? "" : "s"} · header + footer social icons
          </p>
          <Button onClick={() => { setCreating(true); setEditing(null); setDraft(empty); }}>
            <Plus className="w-4 h-4" />
            Add link
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={items}
          searchKey="platform"
          searchPlaceholder="Filter by platform..."
          emptyState="No social links yet."
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
  draft: Omit<Link, "id">;
  setDraft: React.Dispatch<React.SetStateAction<Omit<Link, "id">>>;
  editing: Link | null;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl w-full max-w-md">
        <div className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{editing ? "Edit link" : "New link"}</h2>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white text-2xl leading-none">×</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Platform</label>
            <Input value={draft.platform} onChange={(e) => setDraft({ ...draft, platform: e.target.value })} list="social-presets" />
            <datalist id="social-presets">
              {PRESETS.map((p) => <option key={p} value={p} />)}
            </datalist>
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">URL</label>
            <Input value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Order</label>
            <Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
          </div>
        </div>
        <div className="border-t border-neutral-800 px-6 py-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>{editing ? "Save changes" : "Add link"}</Button>
        </div>
      </div>
    </div>
  );
}
