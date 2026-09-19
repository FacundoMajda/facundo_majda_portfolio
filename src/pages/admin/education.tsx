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
import { education } from "@/db/schema";
import { asc } from "drizzle-orm";

type Item = {
  id: string;
  institution: string;
  link: string | null;
  degree: string;
  startDate: string;
  endDate: string | null;
  description: string;
  order: number;
};

const empty: Omit<Item, "id"> = {
  institution: "",
  link: "",
  degree: "",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: null,
  description: "",
  order: 0,
};

export async function getServerSideProps() {
  const rows = await db.select().from(education).orderBy(asc(education.order));
  return {
    props: {
      items: rows.map((r) => ({
        ...r,
        startDate: r.startDate.toISOString(),
        endDate: r.endDate ? r.endDate.toISOString() : null,
      })),
    },
  };
}

export default function EducationAdmin({ items: initial }: { items: Item[] }) {
  const [items, setItems] = useState<Item[]>(initial);
  const [editing, setEditing] = useState<Item | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Item, "id">>(empty);

  async function persist(method: "POST" | "PATCH", body: Record<string, unknown>) {
    const res = await fetch("/api/admin/education", {
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
    const normalized: Item = { ...data, startDate: data.startDate, endDate: data.endDate };
    if (editing) {
      setItems((xs) => xs.map((x) => (x.id === editing.id ? normalized : x)));
    } else {
      setItems((xs) => [...xs, normalized]);
    }
    setEditing(null);
    setCreating(false);
    setDraft(empty);
  }

  async function remove(it: Item) {
    if (!confirm(`Delete "${it.degree}"?`)) return;
    await fetch("/api/admin/education", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: it.id }),
    });
    setItems((xs) => xs.filter((x) => x.id !== it.id));
  }

  function startEdit(it: Item) {
    setEditing(it);
    setCreating(false);
    setDraft({
      institution: it.institution,
      link: it.link ?? "",
      degree: it.degree,
      startDate: it.startDate.slice(0, 10),
      endDate: it.endDate ? it.endDate.slice(0, 10) : null,
      description: it.description,
      order: it.order,
    });
  }

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: "degree",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Degree" />,
        cell: ({ row }) => (
          <div>
            <div className="text-white font-medium">{row.original.degree}</div>
            {row.original.link ? (
              <a href={row.original.link} target="_blank" className="text-xs text-emerald-400 hover:underline">
                {row.original.institution} ↗
              </a>
            ) : (
              <div className="text-xs text-neutral-500">{row.original.institution}</div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "institution",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Institution" />,
        cell: ({ row }) => <span className="text-neutral-300">{row.original.institution}</span>,
        enableHiding: false,
      },
      {
        id: "period",
        header: "Period",
        accessorFn: (r) => `${r.startDate} → ${r.endDate ?? "Present"}`,
        cell: ({ row }) => (
          <span className="text-neutral-400 font-mono text-xs">
            {row.original.startDate.slice(0, 10)} → {row.original.endDate ? row.original.endDate.slice(0, 10) : "Present"}
          </span>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="text-xs text-neutral-500 line-clamp-2 max-w-[400px] block">
            {row.original.description}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "order",
        header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
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
        <title>Education · Portfolio Admin</title>
      </Head>
      <AdminLayout title="Education">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-neutral-400">
            {items.length} entr{items.length === 1 ? "y" : "ies"} · ordered by sequence field
          </p>
          <Button onClick={() => { setCreating(true); setEditing(null); setDraft(empty); }}>
            <Plus className="w-4 h-4" />
            Add education
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={items}
          searchKey="degree"
          searchPlaceholder="Filter by degree or institution..."
          emptyState="No education entries yet."
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
  draft: Omit<Item, "id">;
  setDraft: React.Dispatch<React.SetStateAction<Omit<Item, "id">>>;
  editing: Item | null;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-white">{editing ? "Edit education" : "New education"}</h2>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white text-2xl leading-none">×</button>
        </div>
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Degree</label>
            <Input value={draft.degree} onChange={(e) => setDraft({ ...draft, degree: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Institution</label>
            <Input value={draft.institution} onChange={(e) => setDraft({ ...draft, institution: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">URL</label>
            <Input value={draft.link ?? ""} onChange={(e) => setDraft({ ...draft, link: e.target.value })} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Start date</label>
            <Input type="date" value={draft.startDate} onChange={(e) => setDraft({ ...draft, startDate: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">End date</label>
            <Input type="date" value={draft.endDate ?? ""} onChange={(e) => setDraft({ ...draft, endDate: e.target.value || null })} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Order</label>
            <Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
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
