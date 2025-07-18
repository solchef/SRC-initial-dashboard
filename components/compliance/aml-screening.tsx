"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Shield,
  User,
  Building,
  FileText,
  Eye,
  RefreshCw,
  X,
  Info,
} from "lucide-react"

interface AMLCheck {
  id: string
  type: "individual" | "entity"
  name: string
  status: "clear" | "flagged" | "pending" | "requires_review"
  riskLevel: "low" | "medium" | "high"
  lastChecked: string
  sources: string[]
  findings?: AMLFinding[]
}

interface AMLFinding {
  id: string
  type: "sanctions" | "pep" | "adverse_media" | "watchlist"
  severity: "low" | "medium" | "high"
  description: string
  source: string
  date: string
  resolved: boolean
}

export function AMLScreeningInterface() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const [amlChecks, setAmlChecks] = useState<AMLCheck[]>([
    {
      id: "1",
      type: "individual",
      name: "John Doe",
      status: "clear",
      riskLevel: "low",
      lastChecked: "2024-01-18",
      sources: ["OFAC", "UN Sanctions", "EU Sanctions", "PEP Lists"],
    },
    {
      id: "2",
      type: "entity",
      name: "TechCorp Imports Ltd",
      status: "clear",
      riskLevel: "low",
      lastChecked: "2024-01-18",
      sources: ["OFAC", "UN Sanctions", "EU Sanctions", "Corporate Watchlists"],
    },
    {
      id: "3",
      type: "individual",
      name: "Jane Smith",
      status: "flagged",
      riskLevel: "medium",
      lastChecked: "2024-01-17",
      sources: ["OFAC", "UN Sanctions", "EU Sanctions", "PEP Lists"],
      findings: [
        {
          id: "f1",
          type: "pep",
          severity: "medium",
          description: "Listed as Politically Exposed Person - Former government official",
          source: "PEP Database",
          date: "2024-01-17",
          resolved: false,
        },
      ],
    },
    {
      id: "4",
      type: "entity",
      name: "Global Trading Partners",
      status: "requires_review",
      riskLevel: "high",
      lastChecked: "2024-01-16",
      sources: ["OFAC", "UN Sanctions", "EU Sanctions", "Corporate Watchlists"],
      findings: [
        {
          id: "f2",
          type: "adverse_media",
          severity: "high",
          description: "Negative media coverage regarding compliance violations",
          source: "Media Monitoring",
          date: "2024-01-15",
          resolved: false,
        },
        {
          id: "f3",
          type: "sanctions",
          severity: "high",
          description: "Entity appears on restricted parties list",
          source: "OFAC SDN List",
          date: "2024-01-16",
          resolved: false,
        },
      ],
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "clear":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Clear
          </Badge>
        )
      case "flagged":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Flagged
          </Badge>
        )
      case "requires_review":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Requires Review
          </Badge>
        )
      default:
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Low Risk
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-200">
            Medium Risk
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            High Risk
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getFindingIcon = (type: string) => {
    switch (type) {
      case "sanctions":
        return <Shield className="h-4 w-4 text-red-500" />
      case "pep":
        return <User className="h-4 w-4 text-yellow-500" />
      case "adverse_media":
        return <FileText className="h-4 w-4 text-orange-500" />
      case "watchlist":
        return <Eye className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const runNewScreening = () => {
    // Simulate running a new screening
    console.log("Running new AML screening...")
  }

  const overallRiskScore = () => {
    const highRisk = amlChecks.filter((c) => c.riskLevel === "high").length
    const mediumRisk = amlChecks.filter((c) => c.riskLevel === "medium").length
    const lowRisk = amlChecks.filter((c) => c.riskLevel === "low").length

    if (highRisk > 0) return "high"
    if (mediumRisk > 0) return "medium"
    return "low"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AML Screening</h1>
          <p className="text-muted-foreground">Anti-Money Laundering compliance monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          {getRiskBadge(overallRiskScore())}
          <Button onClick={runNewScreening}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Run New Screening
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{amlChecks.filter((c) => c.status === "clear").length}</p>
                <p className="text-sm text-muted-foreground">Clear</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{amlChecks.filter((c) => c.status === "flagged").length}</p>
                <p className="text-sm text-muted-foreground">Flagged</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <X className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{amlChecks.filter((c) => c.status === "requires_review").length}</p>
                <p className="text-sm text-muted-foreground">Requires Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{amlChecks.filter((c) => c.status === "pending").length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individuals">Individuals</TabsTrigger>
          <TabsTrigger value="entities">Entities</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Screening Summary
              </CardTitle>
              <CardDescription>Overall AML compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Compliance Score</span>
                  <div className="flex items-center gap-2">
                    <Progress value={75} className="w-32" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Last Full Screening</Label>
                    <p className="text-sm text-muted-foreground">January 18, 2024</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Next Scheduled Screening</Label>
                    <p className="text-sm text-muted-foreground">February 18, 2024</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Sources Checked</Label>
                    <p className="text-sm text-muted-foreground">OFAC, UN, EU, PEP Lists, Watchlists</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Active Findings</Label>
                    <p className="text-sm text-muted-foreground">
                      {amlChecks.reduce((acc, check) => acc + (check.findings?.length || 0), 0)} findings require
                      attention
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">High-risk entity flagged</p>
                    <p className="text-xs text-muted-foreground">
                      Global Trading Partners - Multiple sanctions findings
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">PEP status identified</p>
                    <p className="text-xs text-muted-foreground">Jane Smith - Former government official</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Screening completed</p>
                    <p className="text-xs text-muted-foreground">John Doe - No adverse findings</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individuals" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search individuals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <User className="h-4 w-4 mr-2" />
              Add Individual
            </Button>
          </div>

          <div className="space-y-4">
            {amlChecks
              .filter((check) => check.type === "individual")
              .map((check) => (
                <Card key={check.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{check.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Last checked: {check.lastChecked}</span>
                            <span>{check.sources.length} sources</span>
                            {check.findings && <span>{check.findings.length} findings</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRiskBadge(check.riskLevel)}
                        {getStatusBadge(check.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="entities" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Building className="h-4 w-4 mr-2" />
              Add Entity
            </Button>
          </div>

          <div className="space-y-4">
            {amlChecks
              .filter((check) => check.type === "entity")
              .map((check) => (
                <Card key={check.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{check.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Last checked: {check.lastChecked}</span>
                            <span>{check.sources.length} sources</span>
                            {check.findings && <span>{check.findings.length} findings</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRiskBadge(check.riskLevel)}
                        {getStatusBadge(check.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Active Findings
              </CardTitle>
              <CardDescription>Issues requiring review and resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {amlChecks.flatMap(
                  (check) =>
                    check.findings?.map((finding) => (
                      <div key={finding.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {getFindingIcon(finding.type)}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{check.name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {finding.type.replace("_", " ").toUpperCase()}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    finding.severity === "high"
                                      ? "text-red-600 border-red-200"
                                      : finding.severity === "medium"
                                        ? "text-yellow-600 border-yellow-200"
                                        : "text-green-600 border-green-200"
                                  }`}
                                >
                                  {finding.severity} severity
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Source: {finding.source}</span>
                                <span>Date: {finding.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                            <Button variant="outline" size="sm">
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </div>
                    )) || [],
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
