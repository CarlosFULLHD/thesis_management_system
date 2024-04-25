"use client";
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { TaskTimelineProvider } from "../providers/TaskTimeLineProvider";  // Asegúrate de ajustar la ruta de importación si es necesario
import TimelineComponent from "./timeLine";  // Asegúrate de que la ruta de importación es correcta

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden hover:opacity-75 transition duration-200 z-50">
          OPen
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <TaskTimelineProvider>
          <TimelineComponent />
        </TaskTimelineProvider>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
