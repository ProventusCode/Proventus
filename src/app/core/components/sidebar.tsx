"use client";

import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Resource } from "@/db/schema/roleResource";
import {
  AppWindow,
  Blocks,
  LucideIcon,
  LucideMessageCircleCode,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type IconType = {
  icon: LucideIcon;
};

const iconMap: Record<string, LucideIcon> = {
  DSB: Blocks,
  CMP: AppWindow,
  USR: UsersIcon,
  CHT: LucideMessageCircleCode,
};

interface SidebarProps {
  roleResources: Resource[] | undefined;
}

export default function Sidebar({ roleResources }: Readonly<SidebarProps>) {
  const pathname = usePathname();
  const resources = useMemo(() => {
    return roleResources?.map((resource) => ({
      ...resource,
      icon: iconMap[resource.code],
    }));
  }, [roleResources]);

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Icons.Logo className="h-6 w-6" />
            <span className="">Proventus</span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {resources ? (
              resources?.map(({ label, icon: Icon, href }) => (
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-4 transition-all dark:hover:text-gray-50 ${
                    pathname === href
                      ? "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                  }`}
                  key={label}
                  href={href}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))
            ) : (
              <div className="space-y-4">
                {Object.keys(iconMap).map((code) => (
                  <Skeleton
                    key={`menu-item-${code}`}
                    className="h-10 w-full rounded-lg"
                  />
                ))}
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
