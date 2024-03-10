import Controls from "@/components/dashboard/workspaces/controls";
import { db } from "@/lib/db";
import { getSession } from "@/lib/user";

type PageProps = {
  searchParams: Record<string, string | undefined>;
};

export default async function WorkspacesPage({ searchParams }: PageProps) {
  const { user } = (await getSession()) ?? {};
  if (!user) return null;

  const userWorkspaces = await db.workspace.findMany({
    where: {
      AND: [
        {
          users: {
            some: { userId: user.id },
          },
        },
        {
          OR: [
            {
              title: {
                contains: searchParams.search ?? "",
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: searchParams.search ?? "",
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
  });

  return (
    <main className="p-4 bg-background">
      <header className="mb-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Workspaces
        </h1>
        <p className="mt-3 text-muted-foreground">
          Create and manage your workspaces from here.
        </p>
      </header>

      <Controls />

      <section className="grid md:grid-cols-2 lg:grid-cols-3 mt-12 gap-8">
        {userWorkspaces?.map(({ id, title, description }) => (
          <article
            key={id}
            className="flex gap-6 p-6 shadow bg-card text-card-foreground border border-border/50 rounded-lg"
          >
            <figure className="min-w-[100px] min-h-[100px]">
              <img
                src={`https://source.unsplash.com/100x100/?${title}`}
                alt=""
                className="rounded-lg"
              />
            </figure>

            <div>
              <h2 className="text-2xl font-bold mb-1">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
