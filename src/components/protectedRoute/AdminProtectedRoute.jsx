"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import useAdmin from "@/hooks/useAdmin/useAdmin";

export default function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdminLoading) {

      console.log(isAdmin);
      if (!user || !isAdmin) {
        router.replace("/login");
      }
    }
  }, [user, isAdmin, loading, isAdminLoading, router]);

    if (loading || isAdminLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Checking authentication...
      </div>
    );
  }
 

  if (user && isAdmin) {
    return children;
  }

  return null;
}
