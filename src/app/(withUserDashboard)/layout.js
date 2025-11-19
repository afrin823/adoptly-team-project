import UserProtectedRoute from "@/components/protectedRoute/UserProtectedRoute"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import UserDashboardHeader from "@/components/userDashboardHeader/userDashboardHeader"
import UserSidebar from "@/components/userSidebar/UserSidebar"

export default function Layout({ children }) {
  return (
    <UserProtectedRoute>
       <SidebarProvider>
      <UserSidebar />
      <main className="w-full overflow-hidden">
        {/* <SidebarTrigger /> */}
        <UserDashboardHeader />
        {children}
      </main>
    </SidebarProvider>
   </UserProtectedRoute>
  )
}