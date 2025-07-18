"use client"
import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { DashboardContent } from "@/components/dashboard-content"
import { UserRoleProvider } from "@/hooks/use-user-role"
import { ComplianceDashboard } from "@/components/compliance/compliance-dashboard"

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<string | null>(null)

  return (
    <UserRoleProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AppSidebar onPageChange={setCurrentPage} />
          <SidebarInset className="flex-1">
            <TopNavigation />
            {currentPage ? (
              <div className="p-6">
                <ComplianceDashboard activeSection={currentPage} />
              </div>
            ) : (
              <DashboardContent />
            )}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </UserRoleProvider>
  )
}
