"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { SidebarData } from "../data";

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <div
            className={`flex flex-col w-full justify-between h-screen border-r border-border custom-scrollbar overflow-hidden bg-blue-950 py-3 transition-all duration-300 ease-in-out `}
        >
            <div className="flex flex-col gap-4 px-2">
                <Link href="/" className="flex justify-start px-2">
                    <Image alt="logo" src={'/images/footer-logo.png'} width={100} height={100} className="h-full w-full" />
                </Link>

                <div className="h-[calc(100vh-150px)] pt-6 flex flex-col justify-between">
                    {/* Menu */}
                    <div className="flex flex-col gap-4">
                        {SidebarData.map((item, index) => {
                            // Special handling for home route to avoid conflicts
                            const isActive = item.src && (
                                pathName === item.src || 
                                (item.src !== '/admin' && pathName.startsWith(item.src + '/'))
                            );
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={index}
                                    href={item.src || "#"}
                                    className={`flex items-center py-2 px-3 group gap-2 font-bold rounded-lg outline-none transition-colors duration-200 ${isActive
                                        ? "bg-white text-black"
                                        : "bg-transparent text-white hover:bg-white hover:text-black"
                                        }`}
                                >
                                    <Icon
                                        className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-black" : "text-white group-hover:text-black"
                                            }`}
                                    />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex justify-center items-center">
                        <button className="flex items-center gap-2 text-white font-semibold text-lg">
                            <LogOut className="w-8 h-8 rotate-180" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;