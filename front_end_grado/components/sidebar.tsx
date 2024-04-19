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

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm dark:bg-black">
      <div className="p-6">
        <Logo className="rounded-xl" />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
