"use client";

import { Input, buttonVariants } from "@/components/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Controls() {
  const router = useRouter();
  const query = useParams<{ search: string }>();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newParams = new URLSearchParams();
    newParams.set("search", e.currentTarget.value || "");

    if (!e.currentTarget.value) {
      newParams.delete("search");
    }

    router.push("/dashboard/workspaces?" + newParams.toString());
  }

  return (
    <section className="flex gap-6">
      <Input
        className="bg-white"
        defaultValue={query.search}
        type="search"
        placeholder="Search workspaces"
        onChange={handleSearch}
      />

      <Link
        className={buttonVariants({ variant: "default" })}
        href="/dashboard/workspaces/new"
      >
        <Plus className="w-5 h-5 mr-3" />
        Create a new workspace
      </Link>
    </section>
  );
}
