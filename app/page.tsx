import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { DashboardContent } from "@/components/dashboard-content"
import { UserRoleProvider } from "@/hooks/use-user-role"

export default function Dashboard() {
  return (
    <UserRoleProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <TopNavigation />
            <DashboardContent />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </UserRoleProvider>
  )
}
