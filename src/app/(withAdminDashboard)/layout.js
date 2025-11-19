
import AdminSidebar from "@/components/adminSidebar/AdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminProtectedRoute from "@/components/protectedRoute/AdminProtectedRoute";


export default function Layout({ children }) {
  
  
  
  return (
    <>
      <AdminProtectedRoute>
         <SidebarProvider>
      <AdminSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
   </AdminProtectedRoute>
    
    
    </>
  )
}