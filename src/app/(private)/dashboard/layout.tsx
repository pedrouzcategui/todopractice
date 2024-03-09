import { getSession } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) return null;
  else if (session.user.redirectToTutorial) redirect("/tutorial");

  return <>{children}</>;
}
