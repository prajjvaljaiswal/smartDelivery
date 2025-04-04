
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import SideBar from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <NavBar />

      {/* Body Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar/>
        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
