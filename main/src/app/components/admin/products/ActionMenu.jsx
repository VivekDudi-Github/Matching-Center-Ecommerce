"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Copy,
} from "lucide-react";

export default function ActionMenu({
  viewHref,
  editHref,
  onDelete,
  onDuplicate,
}) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative flex justify-end"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-20 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
          <Link
            href={viewHref}
            className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Eye size={16} />
            View
          </Link>

          <Link
            href={editHref}
            className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Pencil size={16} />
            Edit
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              onDuplicate?.();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Copy size={16} />
            Duplicate
          </button>

          <div className="border-t border-zinc-200 dark:border-zinc-700" />

          <button
            onClick={() => {
              setOpen(false);
              onDelete?.();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}