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
import { UploadFinancialsInterface } from "@/components/credit/upload-financials"
import { CreditworthinessHistoryInterface } from "@/components/credit/creditworthiness-history"
import { CreditInsuranceInterface } from "@/components/credit/credit-insurance"

// Trade Evaluation Components
import { TransactionRiskAssessmentInterface } from "@/components/trade-evaluation/transaction-risk-assessment"
import { DueDiligenceInterface } from "@/components/trade-evaluation/due-diligence"
import { TradeHistoryAnalyzerInterface } from "@/components/trade-evaluation/trade-history-analyzer"
import { RedFlagDetectionInterface } from "@/components/trade-evaluation/red-flag-detection"

// Digital Trade Creation Components
import { CreateNewTradeInterface } from "@/components/digital-trade/create-new-trade"
import { InputTradeTermsInterface } from "@/components/digital-trade/input-trade-terms"
import { UploadDocsSignInterface } from "@/components/digital-trade/upload-docs-sign"
import { GenerateSmartContractInterface } from "@/components/digital-trade/generate-smart-contract"

// Help & Support Components
import { ChatAssistantInterface } from "@/components/help-support/chat-assistant"
import { LegalResourcesInterface } from "@/components/help-support/legal-resources"
import { ContactSupportInterface } from "@/components/help-support/contact-support"

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
        return <UploadFinancialsInterface />
      case "creditworthiness-history":
        return <CreditworthinessHistoryInterface />
      case "credit-insurance":
        return <CreditInsuranceInterface />

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
        return <UploadDocsSignInterface />
      case "generate-smart-contract":
        return <GenerateSmartContractInterface />

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
