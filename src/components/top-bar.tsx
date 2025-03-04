"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-light text-dark shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <SidebarTrigger />
        <div className="hidden md:flex space-x-6 font-bold">
          ACI Barcode driven inventory system
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 bg-white text-dark px-4 py-2 rounded-lg"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={() => router.push("/logout")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
