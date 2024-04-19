"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all  hover:bg-sky-200/20 hover:text-sky-700"
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className="text-slate-500 hover:text-sky-700" />
        {label}
      </div>
      <div className="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all hover:opacity-100" />
    </button>
  );
};
