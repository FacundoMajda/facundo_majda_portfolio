"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  extraActions?: { label: string; onClick: (row: TData) => void; destructive?: boolean }[];
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
  extraActions,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-neutral-400 hover:text-white">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {extraActions?.map((a, i) => (
          <DropdownMenuItem
            key={i}
            onClick={() => a.onClick(row.original)}
            className={a.destructive ? "text-red-400 focus:text-red-300" : undefined}
          >
            {a.label}
          </DropdownMenuItem>
        ))}
        {onEdit && onDelete && <DropdownMenuSeparator />}
        {onDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(row.original)}
            className="text-red-400 focus:text-red-300"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
