"use client"
import { KYCKYBInterface } from "./kyc-kyb-interface"
import { DocumentUploadInterface } from "./document-upload"
import { AMLScreeningInterface } from "./aml-screening"
import { OnboardingStatusTracker } from "./onboarding-status"

export function ComplianceDashboard({ activeSection }: { activeSection: string }) {
  const renderActiveSection = () => {
    switch (activeSection) {
      case "kyc-kyb":
        return <KYCKYBInterface />
      case "document-upload":
        return <DocumentUploadInterface />
      case "aml-screening":
        return <AMLScreeningInterface />
      case "onboarding-status":
        return <OnboardingStatusTracker />
      default:
        return <OnboardingStatusTracker />
    }
  }

  return <div className="min-h-screen bg-background">{renderActiveSection()}</div>
}
