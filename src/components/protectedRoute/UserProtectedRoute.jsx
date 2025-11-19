"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import useAdmin from "@/hooks/useAdmin/useAdmin";

export default function UserProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdminLoading) {
     
      if (!user ) {
        router.replace("/login");
      }
    }
  }, [user, loading, isAdmin, isAdminLoading, router]);

  // 🌀 Loading state
  if (loading || isAdminLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  // ✅ user logged in and not admin
  if (user && !isAdmin) {
    return children;
  }

  return null;
}
