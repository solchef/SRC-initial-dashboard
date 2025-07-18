"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  X,
  User,
  Building,
  FileText,
  Shield,
  CreditCard,
  Eye,
  ArrowRight,
  RefreshCw,
} from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  status: "completed" | "in_progress" | "pending" | "failed"
  category: "identity" | "business" | "compliance" | "financial"
  completedDate?: string
  estimatedTime: string
  required: boolean
  dependencies?: string[]
}

export function OnboardingStatusTracker() {
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([
    {
      id: "personal_info",
      title: "Personal Information",
      description: "Complete your personal details and contact information",
      status: "completed",
      category: "identity",
      completedDate: "2024-01-15",
      estimatedTime: "5 minutes",
      required: true,
    },
    {
      id: "identity_verification",
      title: "Identity Verification",
      description: "Upload government-issued ID and complete identity verification",
      status: "completed",
      category: "identity",
      completedDate: "2024-01-15",
      estimatedTime: "10 minutes",
      required: true,
      dependencies: ["personal_info"],
    },
    {
      id: "address_verification",
      title: "Address Verification",
      description: "Provide proof of address documentation",
      status: "completed",
      category: "identity",
      completedDate: "2024-01-16",
      estimatedTime: "5 minutes",
      required: true,
      dependencies: ["personal_info"],
    },
    {
      id: "business_registration",
      title: "Business Registration",
      description: "Register your business and provide company details",
      status: "completed",
      category: "business",
      completedDate: "2024-01-16",
      estimatedTime: "15 minutes",
      required: true,
    },
    {
      id: "business_documents",
      title: "Business Documents",
      description: "Upload certificate of incorporation and business licenses",
      status: "completed",
      category: "business",
      completedDate: "2024-01-17",
      estimatedTime: "10 minutes",
      required: true,
      dependencies: ["business_registration"],
    },
    {
      id: "beneficial_owners",
      title: "Beneficial Owners",
      description: "Identify and verify beneficial owners (25%+ ownership)",
      status: "in_progress",
      category: "business",
      estimatedTime: "20 minutes",
      required: true,
      dependencies: ["business_registration"],
    },
    {
      id: "aml_screening",
      title: "AML Screening",
      description: "Anti-money laundering compliance screening",
      status: "in_progress",
      category: "compliance",
      estimatedTime: "Automated",
      required: true,
      dependencies: ["identity_verification", "business_registration"],
    },
    {
      id: "sanctions_check",
      title: "Sanctions Check",
      description: "Verify against international sanctions lists",
      status: "pending",
      category: "compliance",
      estimatedTime: "Automated",
      required: true,
      dependencies: ["aml_screening"],
    },
    {
      id: "financial_information",
      title: "Financial Information",
      description: "Provide financial statements and banking details",
      status: "pending",
      category: "financial",
      estimatedTime: "15 minutes",
      required: true,
      dependencies: ["business_documents"],
    },
    {
      id: "credit_assessment",
      title: "Credit Assessment",
      description: "Complete credit evaluation and risk assessment",
      status: "pending",
      category: "financial",
      estimatedTime: "Automated",
      required: true,
      dependencies: ["financial_information"],
    },
    {
      id: "final_review",
      title: "Final Review",
      description: "Internal review and approval of your application",
      status: "pending",
      category: "compliance",
      estimatedTime: "1-2 business days",
      required: true,
      dependencies: ["sanctions_check", "credit_assessment"],
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
      case "failed":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "identity":
        return <User className="h-4 w-4 text-primary" />
      case "business":
        return <Building className="h-4 w-4 text-primary" />
      case "compliance":
        return <Shield className="h-4 w-4 text-primary" />
      case "financial":
        return <CreditCard className="h-4 w-4 text-primary" />
      default:
        return <FileText className="h-4 w-4 text-primary" />
    }
  }

  const calculateProgress = () => {
    const completed = onboardingSteps.filter((step) => step.status === "completed").length
    return (completed / onboardingSteps.length) * 100
  }

  const getNextSteps = () => {
    return onboardingSteps
      .filter(
        (step) =>
          step.status === "pending" &&
          (!step.dependencies ||
            step.dependencies.every((dep) => onboardingSteps.find((s) => s.id === dep)?.status === "completed")),
      )
      .slice(0, 3)
  }

  const groupedSteps = onboardingSteps.reduce(
    (acc, step) => {
      if (!acc[step.category]) {
        acc[step.category] = []
      }
      acc[step.category].push(step)
      return acc
    },
    {} as Record<string, OnboardingStep[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Onboarding Status</h1>
          <p className="text-muted-foreground">Track your verification and onboarding progress</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{Math.round(calculateProgress())}%</p>
          <p className="text-sm text-muted-foreground">Complete</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Overall Progress
          </CardTitle>
          <CardDescription>Your onboarding completion status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {onboardingSteps.filter((s) => s.status === "completed").length} of {onboardingSteps.length} steps
                completed
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {onboardingSteps.filter((s) => s.status === "completed").length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {onboardingSteps.filter((s) => s.status === "in_progress").length}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">
                {onboardingSteps.filter((s) => s.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {onboardingSteps.filter((s) => s.status === "failed").length}
              </p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(groupedSteps).map(([category, steps]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize">
                  {getCategoryIcon(category)}
                  {category} Verification
                </CardTitle>
                <CardDescription>
                  {steps.filter((s) => s.status === "completed").length} of {steps.length} steps completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id}>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{step.title}</p>
                            {step.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            {getStatusBadge(step.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Est. time: {step.estimatedTime}</span>
                            {step.completedDate && <span>Completed: {step.completedDate}</span>}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {step.status === "pending" && (
                            <Button size="sm" variant="outline">
                              Start
                            </Button>
                          )}
                          {step.status === "in_progress" && <Button size="sm">Continue</Button>}
                          {step.status === "completed" && (
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          {step.status === "failed" && (
                            <Button size="sm" variant="outline">
                              Retry
                            </Button>
                          )}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="ml-2.5 mt-2 mb-2">
                          <div className="w-px h-4 bg-border"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-primary" />
                Next Steps
              </CardTitle>
              <CardDescription>What you can do next</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getNextSteps().map((step) => (
                  <div key={step.id} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(step.category)}
                      <p className="font-medium text-sm">{step.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <Button size="sm" className="w-full">
                      Start Now
                    </Button>
                  </div>
                ))}
                {getNextSteps().length === 0 && (
                  <div className="text-center py-4">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">All available steps completed!</p>
                    <p className="text-xs text-muted-foreground">
                      Waiting for current steps to finish before next actions become available.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support & Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Onboarding Guide
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                Video Tutorial
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <User className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estimated Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Time remaining:</span>
                  <span className="font-medium">2-3 business days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Manual steps:</span>
                  <span className="font-medium">~30 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Review process:</span>
                  <span className="font-medium">1-2 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
