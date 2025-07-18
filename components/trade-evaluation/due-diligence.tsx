"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Search,
  Building,
  User,
  FileText,
  CheckCircle,
  X,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  Clock,
  Shield,
} from "lucide-react"

interface DueDiligenceReport {
  id: string
  entityName: string
  entityType: "individual" | "company"
  status: "in_progress" | "completed" | "requires_review" | "failed"
  overallScore: number
  completionDate?: string
  checks: {
    identity: { status: "pass" | "fail" | "pending"; score: number; details: string }
    financial: { status: "pass" | "fail" | "pending"; score: number; details: string }
    legal: { status: "pass" | "fail" | "pending"; score: number; details: string }
    reputation: { status: "pass" | "fail" | "pending"; score: number; details: string }
    sanctions: { status: "pass" | "fail" | "pending"; score: number; details: string }
  }
  findings: Array<{
    category: string
    severity: "low" | "medium" | "high"
    description: string
    recommendation: string
  }>
  documents: Array<{
    name: string
    type: string
    status: "verified" | "pending" | "rejected"
    uploadDate: string
  }>
}

export function DueDiligenceInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEntity, setSelectedEntity] = useState<string>("")

  const [reports] = useState<DueDiligenceReport[]>([
    {
      id: "DD-001",
      entityName: "Global Imports Ltd",
      entityType: "company",
      status: "completed",
      overallScore: 85,
      completionDate: "2024-01-18",
      checks: {
        identity: { status: "pass", score: 95, details: "Corporate registration verified" },
        financial: { status: "pass", score: 88, details: "Strong financial position confirmed" },
        legal: { status: "pass", score: 92, details: "No legal issues found" },
        reputation: { status: "pass", score: 78, details: "Good industry reputation" },
        sanctions: { status: "pass", score: 100, details: "No sanctions matches found" },
      },
      findings: [
        {
          category: "Financial",
          severity: "low",
          description: "Minor delay in quarterly reporting",
          recommendation: "Monitor future reporting compliance",
        },
      ],
      documents: [
        { name: "Certificate of Incorporation", type: "Legal", status: "verified", uploadDate: "2024-01-15" },
        { name: "Financial Statements 2023", type: "Financial", status: "verified", uploadDate: "2024-01-16" },
        { name: "Trade License", type: "Legal", status: "verified", uploadDate: "2024-01-17" },
      ],
    },
    {
      id: "DD-002",
      entityName: "Pacific Traders",
      entityType: "company",
      status: "requires_review",
      overallScore: 45,
      completionDate: "2024-01-17",
      checks: {
        identity: { status: "pass", score: 85, details: "Identity verified" },
        financial: { status: "fail", score: 35, details: "Concerning financial indicators" },
        legal: { status: "pending", score: 0, details: "Legal review in progress" },
        reputation: { status: "fail", score: 25, details: "Negative media coverage found" },
        sanctions: { status: "pass", score: 100, details: "No sanctions matches" },
      },
      findings: [
        {
          category: "Financial",
          severity: "high",
          description: "Significant debt-to-equity ratio concerns",
          recommendation: "Require additional financial guarantees",
        },
        {
          category: "Reputation",
          severity: "medium",
          description: "Recent negative media coverage regarding business practices",
          recommendation: "Conduct enhanced monitoring",
        },
      ],
      documents: [
        { name: "Certificate of Incorporation", type: "Legal", status: "verified", uploadDate: "2024-01-14" },
        { name: "Financial Statements 2023", type: "Financial", status: "rejected", uploadDate: "2024-01-15" },
        { name: "Audit Report", type: "Financial", status: "pending", uploadDate: "2024-01-16" },
      ],
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case "requires_review":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Requires Review</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCheckStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fail":
        return <X className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const selectedReport = reports.find((r) => r.id === selectedEntity)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Due Diligence</h1>
          <p className="text-muted-foreground">Comprehensive background checks and entity verification</p>
        </div>
        <Button>
          <Search className="h-4 w-4 mr-2" />
          New Due Diligence
        </Button>
      </div>

      {/* Search and Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Entity Search & Selection
          </CardTitle>
          <CardDescription>Search for existing reports or start a new due diligence process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entity-search">Search Entity</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="entity-search"
                  placeholder="Enter company or individual name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Or Select Existing Report</Label>
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="">Select a report</option>
                {reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.entityName} ({report.id})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card
            key={report.id}
            className={`cursor-pointer transition-colors ${
              selectedEntity === report.id ? "border-primary bg-primary/5" : "hover:bg-accent/50"
            }`}
            onClick={() => setSelectedEntity(report.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {report.entityType === "company" ? (
                    <Building className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium">{report.entityName}</span>
                </div>
                {getStatusBadge(report.status)}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Score</span>
                  <span className="font-bold">{report.overallScore}/100</span>
                </div>
                <Progress value={report.overallScore} className="h-2" />
                {report.completionDate && (
                  <p className="text-xs text-muted-foreground">Completed: {report.completionDate}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedReport && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="checks">Verification Checks</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {selectedReport.entityType === "company" ? (
                      <Building className="h-5 w-5 text-primary" />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                    Entity Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Entity Name</span>
                    <span className="font-medium">{selectedReport.entityName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Entity Type</span>
                    <span className="font-medium capitalize">{selectedReport.entityType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Report ID</span>
                    <span className="font-medium">{selectedReport.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    {getStatusBadge(selectedReport.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Overall Score</span>
                    <span className="font-bold text-primary">{selectedReport.overallScore}/100</span>
                  </div>
                  {selectedReport.completionDate && (
                    <div className="flex items-center justify-between">
                      <span>Completion Date</span>
                      <span className="font-medium">{selectedReport.completionDate}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="checks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Verification Checks
                </CardTitle>
                <CardDescription>Detailed results of all verification checks performed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(selectedReport.checks).map(([key, check]) => (
                    <div key={key} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getCheckStatusIcon(check.status)}
                          <span className="font-medium capitalize">{key} Verification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{check.score}/100</span>
                        </div>
                      </div>
                      <Progress value={check.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{check.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="findings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Due Diligence Findings
                </CardTitle>
                <CardDescription>Issues and recommendations identified during the review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedReport.findings.map((finding, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{finding.category}</span>
                          {getSeverityBadge(finding.severity)}
                        </div>
                      </div>
                      <p className="text-sm mb-2">{finding.description}</p>
                      <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Recommendation:</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{finding.recommendation}</p>
                      </div>
                    </div>
                  ))}
                  {selectedReport.findings.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
                      <p className="text-muted-foreground">All verification checks passed without any concerns.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Supporting Documents
                </CardTitle>
                <CardDescription>Documents reviewed as part of the due diligence process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedReport.documents.map((document, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {document.type} • Uploaded: {document.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusBadge(document.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {!selectedReport && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select an Entity</h3>
            <p className="text-muted-foreground">
              Choose an entity from the cards above or search for a new one to view due diligence details.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
