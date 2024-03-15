import { getSession } from "@/lib/user";
import { redirect } from "next/navigation";
import { VerticalNavigation } from "@/components/dashboard/layout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) return null;
  else if (session.user.redirectToTutorial) redirect("/tutorial");

  return (
    <main className="h-screen flex flex-col overflow-hidden md:flex-row">
      <aside className="flex-grow-0">
        <VerticalNavigation />
      </aside>

      <section className="flex-grow p-4 overflow-y-auto md:p-10">
        {children}
      </section>
    </main>
  );
}
