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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, Star, StarOff } from "lucide-react";
import { db } from "@/db";
import { techTag } from "@/db/schema";
import { asc } from "drizzle-orm";

type Tag = {
  id: string;
  name: string;
  category: string;
  iconUrl: string | null;
  featured: boolean;
  order: number;
};

const empty: Omit<Tag, "id"> = {
  name: "",
  category: "AI & Machine Learning",
  iconUrl: "",
  featured: true,
  order: 0,
};

const CATEGORIES = [
  "AI & Machine Learning",
  "Backend Architecture",
  "Mobile & Frontend Dev",
  "Databases",
  "Data Science & Analysis",
  "Automation",
  "DevOps & Tools",
];

export async function getServerSideProps() {
  const tags = await db.select().from(techTag).orderBy(asc(techTag.category), asc(techTag.order));
  return { props: { tags } };
}

export default function TechTagsAdmin({ tags: initial }: { tags: Tag[] }) {
  const [items, setItems] = useState<Tag[]>(initial);
  const [editing, setEditing] = useState<Tag | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Tag, "id">>(empty);

  async function persist(method: "POST" | "PATCH", body: Record<string, unknown>) {
    const res = await fetch("/api/admin/tech-tags", {
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

  async function remove(t: Tag) {
    if (!confirm(`Delete tag "${t.name}"?`)) return;
    await fetch("/api/admin/tech-tags", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id }),
    });
    setItems((xs) => xs.filter((x) => x.id !== t.id));
  }

  const toggleFeatured = useCallback(async (t: Tag) => {
    const data = await persist("PATCH", { id: t.id, featured: !t.featured });
    if (!data) return;
    setItems((xs) => xs.map((x) => (x.id === t.id ? data : x)));
  }, []);

  function startEdit(t: Tag) {
    setEditing(t);
    setCreating(false);
    setDraft({
      name: t.name,
      category: t.category,
      iconUrl: t.iconUrl ?? "",
      featured: t.featured,
      order: t.order,
    });
  }

  const columns = useMemo<ColumnDef<Tag>[]>(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => (
          <div className="flex items-center gap-2 min-w-[180px]">
            {row.original.iconUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={row.original.iconUrl} alt="" className="w-5 h-5 shrink-0" />
            )}
            <span className="text-white font-medium">{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
        cell: ({ row }) => <Badge variant="secondary" className="font-normal">{row.original.category}</Badge>,
        filterFn: (row, _id, value) => row.original.category === value,
      },
      {
        id: "featured",
        accessorKey: "featured",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Featured" />,
        cell: ({ row }) =>
          row.original.featured ? (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ) : (
            <StarOff className="w-4 h-4 text-neutral-600" />
          ),
      },
      {
        accessorKey: "order",
        header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
        cell: ({ row }) => <span className="text-neutral-500 font-mono text-xs">{row.original.order}</span>,
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
                label: row.original.featured ? "Unfeature" : "Feature",
                onClick: () => toggleFeatured(row.original),
              },
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
        <title>Tech Tags · Portfolio Admin</title>
      </Head>
      <AdminLayout title="Tech Tags">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-neutral-400">
            {items.length} tag{items.length === 1 ? "" : "s"} · {items.filter((t) => t.featured).length} featured
          </p>
          <Button onClick={() => { setCreating(true); setEditing(null); setDraft(empty); }}>
            <Plus className="w-4 h-4" />
            Add tag
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={items}
          searchKey="name"
          searchPlaceholder="Filter by name..."
          emptyState="No tags yet."
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
  draft: Omit<Tag, "id">;
  setDraft: React.Dispatch<React.SetStateAction<Omit<Tag, "id">>>;
  editing: Tag | null;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit tag" : "New tag"}</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-5 space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={draft.category} onValueChange={(v) => setDraft({ ...draft, category: v })}>
              <SelectTrigger aria-label="Category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Icon URL</Label>
            <div className="flex gap-2 items-center">
              {draft.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={draft.iconUrl}
                  alt=""
                  className="w-9 h-9 rounded shrink-0 bg-neutral-900 border border-neutral-800 p-1"
                />
              ) : (
                <div className="w-9 h-9 rounded shrink-0 bg-neutral-900 border border-neutral-800" />
              )}
              <Input
                value={draft.iconUrl ?? ""}
                onChange={(e) => setDraft({ ...draft, iconUrl: e.target.value })}
                placeholder="https://cdn.simpleicons.org/..."
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <Label>Order</Label>
            <Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
          </div>
          <label className="flex items-center gap-2 text-sm text-neutral-300">
            <Checkbox checked={draft.featured} onCheckedChange={(c) => setDraft({ ...draft, featured: !!c })} />
            Featured (shown on portfolio)
          </label>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>{editing ? "Save changes" : "Create tag"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
