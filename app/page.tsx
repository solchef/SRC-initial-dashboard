"use client"
import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { DashboardContent } from "@/components/dashboard-content"
import { UserRoleProvider } from "@/hooks/use-user-role"
import { ComplianceDashboard } from "@/components/compliance/compliance-dashboard"
import { PortfolioSummaryInterface } from "@/components/dashboard/portfolio-summary"
import { TradePipelineTrackerInterface } from "@/components/dashboard/trade-pipeline-tracker"
import { NotificationsInterface } from "@/components/dashboard/notifications-interface"
import { RiskAlertsInterface } from "@/components/dashboard/risk-alerts"
import { CreditProfileInterface } from "@/components/credit/credit-profile"
import { ScoreReportInterface } from "@/components/credit/score-report"
import { TransactionRiskAssessmentInterface } from "@/components/trade-evaluation/transaction-risk-assessment"
import { DueDiligenceInterface } from "@/components/trade-evaluation/due-diligence"
import { CreateNewTradeInterface } from "@/components/digital-trade/create-new-trade"
import { ChatAssistantInterface } from "@/components/help-support/chat-assistant"
import { LegalResourcesInterface } from "@/components/help-support/legal-resources"
import { ContactSupportInterface } from "@/components/help-support/contact-support"

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
                {currentPage.startsWith("kyc-kyb") ||
                currentPage.startsWith("document-upload") ||
                currentPage.startsWith("aml-screening") ||
                currentPage.startsWith("onboarding-status") ? (
                  <ComplianceDashboard activeSection={currentPage} />
                ) : currentPage === "portfolio-summary" ? (
                  <PortfolioSummaryInterface />
                ) : currentPage === "trade-pipeline-tracker" ? (
                  <TradePipelineTrackerInterface />
                ) : currentPage === "notifications" ? (
                  <NotificationsInterface />
                ) : currentPage === "risk-alerts" ? (
                  <RiskAlertsInterface />
                ) : currentPage === "credit-profile" ? (
                  <CreditProfileInterface />
                ) : currentPage === "score-report" ? (
                  <ScoreReportInterface />
                ) : currentPage === "transaction-risk-assessment" ? (
                  <TransactionRiskAssessmentInterface />
                ) : currentPage === "due-diligence" ? (
                  <DueDiligenceInterface />
                ) : currentPage === "create-new-trade" ? (
                  <CreateNewTradeInterface />
                ) : currentPage === "chat-assistant" ? (
                  <ChatAssistantInterface />
                ) : currentPage === "legal-resources" ? (
                  <LegalResourcesInterface />
                ) : currentPage === "contact-support" ? (
                  <ContactSupportInterface />
                ) : (
                  <div className="text-center py-8">
                    <h2 className="text-xl font-semibold mb-2">Feature Coming Soon</h2>
                    <p className="text-muted-foreground">This feature is currently under development.</p>
                  </div>
                )}
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
