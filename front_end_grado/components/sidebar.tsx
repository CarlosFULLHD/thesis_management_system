import { SidebarRoutes } from "@/config/SidebarRoutes";
import React from "react";
import {
  AiFillHome,
  AiOutlineInbox,
  AiOutlineShoppingCart,
  AiOutlineUsergroupAdd,
  AiOutlineFile,
} from "react-icons/ai";
import { Logo } from "./icons";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white dark:bg-background-dark">
      <div className="p-6">
        <Link href="/">
          <Logo className="rounded-xl" />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
