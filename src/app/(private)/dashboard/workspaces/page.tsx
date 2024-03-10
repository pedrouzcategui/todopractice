import Controls from "@/components/dashboard/workspaces/controls";
import { db } from "@/lib/db";
import { getSession } from "@/lib/user";

type PageProps = {
  searchParams: Record<string, string | undefined>;
};

export default async function WorkspacesPage({ searchParams }: PageProps) {
  const { user } = (await getSession()) ?? {};
  if (!user) return null;

  const userWorkspaces = (
    await db.user.findFirst({
      where: {
        AND: [
          { id: user.id },
          {
            workspaces: {
              some: { workspace: { title: { contains: searchParams.search } } },
            },
          },
        ],
      },
      include: {
        workspaces: {
          include: { workspace: true },
        },
      },
    })
  )?.workspaces;

  return (
    <main className="p-16">
      <header className="mb-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Workspaces
        </h1>
        <p className="mt-3 text-muted-foreground">
          Create and manage your workspaces from here.
        </p>
      </header>

      {JSON.stringify(userWorkspaces, null, 2)}

      <Controls />
    </main>
  );
}
