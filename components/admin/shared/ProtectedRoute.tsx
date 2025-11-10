"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMe } from "@/lib/api/auth";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: ("admin" | "editor" | "viewer")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          toast.error("Please login to access this page");
          router.push("/admin");
          return;
        }

        // Verify token by fetching user data
        const response = await getMe();
        
        if (!response?.success || !response?.user) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.error("Session expired. Please login again");
          router.push("/admin");
          return;
        }

        // Check role-based access
        if (roles && roles.length > 0) {
          if (!roles.includes(response.user.role)) {
            toast.error("You don't have permission to access this page");
            router.push("/admin/home");
            return;
          }
        }

        // Store user data
        localStorage.setItem("user", JSON.stringify(response.user));
        setIsAuthorized(true);
      } catch (error: any) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Don't redirect if already on login page
        if (pathname !== "/admin") {
          toast.error("Session expired. Please login again");
          router.push("/admin");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname, roles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

