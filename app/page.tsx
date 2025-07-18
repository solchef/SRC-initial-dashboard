"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { DashboardContent } from "@/components/dashboard-content"
import { Providers } from "@/components/providers"

// Compliance Components
import { KYCKYBInterface } from "@/components/compliance/kyc-kyb-interface"
import { DocumentUploadInterface } from "@/components/compliance/document-upload"
import { AMLScreeningInterface } from "@/components/compliance/aml-screening"
import { OnboardingStatusTracker } from "@/components/compliance/onboarding-status"

// Dashboard Components
import { PortfolioSummaryInterface } from "@/components/dashboard/portfolio-summary"
import { TradePipelineTrackerInterface } from "@/components/dashboard/trade-pipeline-tracker"
import { NotificationsInterface } from "@/components/dashboard/notifications-interface"
import { RiskAlertsInterface } from "@/components/dashboard/risk-alerts"

// Credit Assessment Components
import { CreditProfileInterface } from "@/components/credit/credit-profile"
import { ScoreReportInterface } from "@/components/credit/score-report"

// Trade Evaluation Components
import { TransactionRiskAssessmentInterface } from "@/components/trade-evaluation/transaction-risk-assessment"
import { DueDiligenceInterface } from "@/components/trade-evaluation/due-diligence"
import { TradeHistoryAnalyzerInterface } from "@/components/trade-evaluation/trade-history-analyzer"
import { RedFlagDetectionInterface } from "@/components/trade-evaluation/red-flag-detection"

// Digital Trade Creation Components
import { CreateNewTradeInterface } from "@/components/digital-trade/create-new-trade"
import { InputTradeTermsInterface } from "@/components/digital-trade/input-trade-terms"

// Help & Support Components
import { ChatAssistantInterface } from "@/components/help-support/chat-assistant"
import { LegalResourcesInterface } from "@/components/help-support/legal-resources"
import { ContactSupportInterface } from "@/components/help-support/contact-support"

// Coming Soon Component
function ComingSoonInterface({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">🚧</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground max-w-md">{description}</p>
        <div className="text-sm text-muted-foreground">This feature is coming soon. Stay tuned for updates!</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<string | null>(null)

  const renderContent = () => {
    switch (currentPage) {
      // Dashboard Pages
      case "portfolio-summary":
        return <PortfolioSummaryInterface />
      case "trade-pipeline-tracker":
        return <TradePipelineTrackerInterface />
      case "notifications":
        return <NotificationsInterface />
      case "risk-alerts":
        return <RiskAlertsInterface />

      // Compliance Pages
      case "kyc-kyb":
        return <KYCKYBInterface />
      case "document-upload":
        return <DocumentUploadInterface />
      case "aml-screening":
        return <AMLScreeningInterface />
      case "onboarding-status":
        return <OnboardingStatusTracker />

      // Credit Assessment Pages
      case "credit-profile":
        return <CreditProfileInterface />
      case "score-report":
        return <ScoreReportInterface />
      case "upload-financials":
        return (
          <ComingSoonInterface
            title="Upload Financials"
            description="Upload and manage your financial documents for credit assessment."
          />
        )
      case "creditworthiness-history":
        return (
          <ComingSoonInterface
            title="Creditworthiness History"
            description="View your credit history and track changes over time."
          />
        )
      case "credit-insurance":
        return (
          <ComingSoonInterface
            title="Apply for Credit Insurance"
            description="Apply for trade credit insurance to protect your transactions."
          />
        )

      // Trade Evaluation Pages
      case "transaction-risk-assessment":
        return <TransactionRiskAssessmentInterface />
      case "due-diligence":
        return <DueDiligenceInterface />
      case "trade-history-analyzer":
        return <TradeHistoryAnalyzerInterface />
      case "red-flag-detection":
        return <RedFlagDetectionInterface />

      // Digital Trade Creation Pages
      case "create-new-trade":
        return <CreateNewTradeInterface />
      case "input-trade-terms":
        return <InputTradeTermsInterface />
      case "upload-docs-sign":
        return (
          <ComingSoonInterface
            title="Upload Docs & Sign"
            description="Upload trade documents and apply digital signatures."
          />
        )
      case "generate-smart-contract":
        return (
          <ComingSoonInterface
            title="Generate Smart Contract"
            description="Automatically generate smart contracts for your trades."
          />
        )

      // Help & Support Pages
      case "chat-assistant":
        return <ChatAssistantInterface />
      case "legal-resources":
        return <LegalResourcesInterface />
      case "contact-support":
        return <ContactSupportInterface />

      // Default Dashboard
      default:
        return <DashboardContent />
    }
  }

  return (
    <Providers>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar onPageChange={setCurrentPage} />
          <SidebarInset className="flex-1">
            <TopNavigation />
            <div className="flex-1">{renderContent()}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Providers>
  )
}
