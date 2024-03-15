import { Button } from "@/components/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  LucideIcon,
  BarChart2 as DashboardIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { getSession } from "@/lib/user";
import { Session } from "next-auth";
import { PLACEHOLDER_IMAGE_URL } from "@/constants/common";

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

export async function VerticalNavigation() {
  const { user } = (await getSession()) as Session;

  const NAVIGATION_ITEMS = [
    {
      title: "Dashboard",
      icon: DashboardIcon,
      href: "/dashboard",
    },
    {
      title: "Profile",
      icon: SettingsIcon,
      href: "/dashboard/profile",
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
          <AvatarImage src={user.image ?? PLACEHOLDER_IMAGE_URL} />
          <AvatarFallback>
            <div className="h-full w-full bg-gray-200 animate-pulse" />
          </AvatarFallback>
        </Avatar>
      </footer>
    </nav>
  );
}
