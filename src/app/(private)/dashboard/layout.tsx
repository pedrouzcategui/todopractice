import { Button } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart2 as DashboardIcon,
  LucideIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import { getSession } from "@/lib/user";
import Link from "next/link";
import { redirect } from "next/navigation";

type NavigationItemProps = {
  title: string;
  icon: LucideIcon;
  href: string;
};

function NavigationItem({ href, title, icon: Icon }: NavigationItemProps) {
  // Tooltip configuration
  const TOOLTIP_DELAY = 250; // 250ms
  const TOOLTIP_OFFSET = 12; // 12px
  const TOOLTIP_SIDE = "right";

  // Icon configuration
  const ICON_SIZE = 24; // 24px

  return (
    <TooltipProvider key={href}>
      <Tooltip delayDuration={TOOLTIP_DELAY}>
        <TooltipTrigger>
          <li>
            <Button size="icon" asChild>
              <Link href={href}>
                <Icon size={ICON_SIZE} />
              </Link>
            </Button>
          </li>
        </TooltipTrigger>

        <TooltipContent sideOffset={TOOLTIP_OFFSET} side={TOOLTIP_SIDE}>
          <span>{title}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

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
  ] satisfies NavigationItemProps[];

  return (
    <nav className="h-full flex p-4 justify-between bg-white shadow-md md:py-10 md:flex-col">
      <ul className="flex gap-6 md:flex-col">
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationItem key={item.href} {...item} />
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
