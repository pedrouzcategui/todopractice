import { getSession } from "@/lib/user";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart2 as DashboardIcon,
  Settings as SettingsIcon,
} from "lucide-react";

function VerticalNavigation() {
  const NAVIGATION_ITEMS = [
    {
      title: "Dashboard",
      icon: DashboardIcon,
      href: "/dashboard",
    },
    {
      title: "Settings",
      icon: SettingsIcon,
      href: "/dashboard/settings",
    },
  ];

  return (
    <nav className="h-full flex p-4 justify-between bg-white shadow-md md:py-10 md:flex-col">
      <ul className="flex gap-6 md:flex-col">
        {NAVIGATION_ITEMS.map(({ href, icon: Icon }) => (
          <li key={href}>
            <Button size="icon" asChild>
              <a href={href}>
                <Icon size={24} />
              </a>
            </Button>
          </li>
        ))}
      </ul>

      <footer>
        <Avatar className="rounded-md md:block">
          {/* TODO: `src` property should reference to user avatar database column */}
          <AvatarImage src="https://www.clipartmax.com/png/middle/105-1055054_view-golang-think-logo-golang.png" />
          {/* TODO: fallback should be fullfilled with the first letters of the user name and lastname */}
          <AvatarFallback>GO</AvatarFallback>
        </Avatar>
      </footer>
    </nav>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) return null;
  else if (session.user.redirectToTutorial) redirect("/tutorial");

  return (
    <main className="flex flex-col md:flex-row">
      <aside className="flex-grow-0">
        <VerticalNavigation />
      </aside>

      <section className="flex-grow">{children}</section>
    </main>
  );
}
