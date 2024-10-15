"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "./header";
import Sidebar from "./sidebar";
import { readUser } from "@/lib/supabase/actions";
import { useEffect, useState } from "react";
import { findUserRole } from "@/services/actions/UserRoleActions";
import { Resource } from "@/db/schema/roleResource";
import { Icons } from "@/components/ui/icons";
import UnauthorizedPage from "./unauthorized";

const ROOT = "/core";
const AUTH = "/auth";

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [roleResources, setRoleResources] = useState<Resource[] | undefined>();
  const pathname = usePathname();
  const router = useRouter();
  const checkAuthorization = (resources: Resource[] | undefined) => {
    return (
      !!resources?.find((resource) => pathname.includes(resource.href)) ||
      pathname === ROOT
    );
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data, error } = await readUser();
      const userId = data.user?.id;
      if (!userId || error) {
        router.push(AUTH);
        return;
      }
      const userRole = await findUserRole(userId);
      if (!userRole) {
        setRoleResources([]);
        return;
      }
      const resources = userRole.roleResource?.resources;
      setRoleResources(resources);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (roleResources) {
      setIsAuthorized(checkAuthorization(roleResources));
    }
  }, [pathname, roleResources]);

  return (
    <div className="grid w-full min-h-screen lg:grid-cols-[280px_1fr]">
      <Sidebar roleResources={roleResources} />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          {isAuthorized ? (
            <div className="flex w-full">{children}</div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {roleResources ? (
                <UnauthorizedPage />
              ) : (
                <Icons.Spinner className="animate-spin h-20 w-20 " />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
