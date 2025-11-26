"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";


export default function UserProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
 
  useEffect(() => {
    if (!loading ) {
     
      if (!user ) {
        router.push("/login");
      }
    }
  }, [user, loading,  router]);

  
  if (loading ) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  
  if (user) {
    return children;
  }

  return null;
}
