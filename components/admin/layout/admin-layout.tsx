"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Navbar from "./navbar";


interface LayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const { memberId } = useParams<{ memberId: string }>();
    const pathname = usePathname();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        setSidebarOpen(false);
    }, [children]);

    if (pathname?.includes("/dashboard/assessments/invites") && memberId) {
        return <>{children}</>;
    }

    return (
        <div className="w-full min-h-screen flex justify-between overflow-auto font-poppins relative">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 lg:hidden z-50"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={`fixed max-h-screen overflow-hidden lg:w-[13%] md:w-3/12 xs:w-3/6 w-2/3 bg-Cgreen z-50 transition-all duration-300 
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:relative lg:translate-x-0 `}
            >
                <Sidebar />
            </div>

            <div className="flex-1 w-full max-h-screen bg-background custom-scrollbar overflow-auto">
                <div className="sticky lg:z-40 z-40 top-0 w-full">
                    <Navbar toggleSidebar={toggleSidebar} />
                </div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
