"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Clock, ArrowRight, FileText, Shield, User, Building } from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  status: "completed" | "in_progress" | "pending" | "failed"
  progress: number
  estimatedTime: string
  requirements?: string[]
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "account_setup",
    title: "Account Setup",
    description: "Basic account information and profile setup",
    status: "completed",
    progress: 100,
    estimatedTime: "5 minutes",
    requirements: ["Email verification", "Password setup", "Profile information"],
  },
  {
    id: "kyc_verification",
    title: "KYC Verification",
    description: "Identity verification and personal information",
    status: "completed",
    progress: 100,
    estimatedTime: "10 minutes",
    requirements: ["Personal information", "ID document upload", "Address verification"],
  },
  {
    id: "kyb_verification",
    title: "KYB Verification",
    description: "Business verification and company documentation",
    status: "in_progress",
    progress: 75,
    estimatedTime: "15 minutes",
    requirements: ["Business registration", "Tax documents", "Beneficial ownership"],
  },
  {
    id: "document_upload",
    title: "Document Upload",
    description: "Upload required compliance and business documents",
    status: "in_progress",
    progress: 60,
    estimatedTime: "20 minutes",
    requirements: ["Financial statements", "Bank statements", "Trade licenses"],
  },
  {
    id: "aml_screening",
    title: "AML Screening",
    description: "Anti-money laundering compliance screening",
    status: "pending",
    progress: 0,
    estimatedTime: "5 minutes",
    requirements: ["Automated screening", "Manual review if flagged"],
  },
  {
    id: "credit_assessment",
    title: "Credit Assessment",
    description: "Credit evaluation and risk assessment",
    status: "pending",
    progress: 0,
    estimatedTime: "24-48 hours",
    requirements: ["Financial analysis", "Credit scoring", "Risk evaluation"],
  },
  {
    id: "final_approval",
    title: "Final Approval",
    description: "Final review and account activation",
    status: "pending",
    progress: 0,
    estimatedTime: "1-2 business days",
    requirements: ["Compliance review", "Risk approval", "Account activation"],
  },
]

export function OnboardingStatusTracker() {
  const [steps, setSteps] = useState<OnboardingStep[]>(onboardingSteps)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const completedSteps = steps.filter((step) => step.status === "completed").length
  const totalSteps = steps.length
  const overallProgress = (completedSteps / totalSteps) * 100

  const currentStep =
    steps.find((step) => step.status === "in_progress") || steps.find((step) => step.status === "pending")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Onboarding Status</h1>
          <p className="text-muted-foreground">Track your account setup and verification progress</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {completedSteps}/{totalSteps}
          </div>
          <div className="text-sm text-muted-foreground">Steps Completed</div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Overall Progress
            <span className="text-lg font-normal">{Math.round(overallProgress)}%</span>
          </CardTitle>
          <CardDescription>Complete all steps to activate your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Started</span>
            <span>Account Active</span>
          </div>
        </CardContent>
      </Card>

      {/* Current Step Highlight */}
      {currentStep && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                {currentStep.id === "kyc_verification" && <User className="h-4 w-4 text-primary" />}
                {currentStep.id === "kyb_verification" && <Building className="h-4 w-4 text-primary" />}
                {currentStep.id === "document_upload" && <FileText className="h-4 w-4 text-primary" />}
                {currentStep.id === "aml_screening" && <Shield className="h-4 w-4 text-primary" />}
              </div>
              Current Step: {currentStep.title}
            </CardTitle>
            <CardDescription>{currentStep.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">{currentStep.progress}%</span>
              </div>
              <Progress value={currentStep.progress} />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated time: {currentStep.estimatedTime}</span>
                <Button>
                  Continue Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Steps</CardTitle>
          <CardDescription>Complete each step to activate your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>}

                <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0 mt-1">{getStatusIcon(step.status)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{step.title}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(step.status)}
                        <span className="text-sm text-muted-foreground">{step.estimatedTime}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                    {step.status === "in_progress" && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{step.progress}%</span>
                        </div>
                        <Progress value={step.progress} className="h-1" />
                      </div>
                    )}

                    {step.requirements && (
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-muted-foreground">Requirements:</span>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          {step.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(step.status === "in_progress" || step.status === "pending") && (
                      <Button
                        variant={step.status === "in_progress" ? "default" : "outline"}
                        size="sm"
                        className="mt-3"
                      >
                        {step.status === "in_progress" ? "Continue" : "Start"}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Get assistance with your onboarding process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Shield className="h-4 w-4 mr-2" />
              Support Chat
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <User className="h-4 w-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
