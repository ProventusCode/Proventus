"use client";

import {
  AppWindow,
  Blocks,
  Code,
  LineChartIcon,
  LucideMessageCircleCode,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Dashboard",
    icon: Blocks,
    href: "/core/dashboard",
  },
  {
    label: "Competencias",
    icon: AppWindow,
    href: "/core/contest",
  },
  {
    label: "Usuarios",
    icon: UsersIcon,
    href: "/core/users",
  },
  {
    label: "Chat",
    icon: LucideMessageCircleCode,
    href: "/core/chat",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const className = "text-gray-500 hover:text-gray-900 dark:text-gray-400";
  const activeClassName =
    "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50";

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Code className="h-6 w-6" />
            <span className="">Proventus</span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuItems.map(({ label, icon: Icon, href }) => (
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-4 transition-all dark:hover:text-gray-50 ${
                  pathname === href ? activeClassName : className
                }`}
                key={label}
                href={href}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
