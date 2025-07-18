"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Globe,
  DollarSign,
  Calendar,
  FileText,
  RefreshCw,
  CheckCircle,
  BarChart3,
} from "lucide-react"

interface RiskAssessment {
  id: string
  tradeId: string
  counterparty: string
  amount: number
  currency: string
  commodity: string
  region: string
  overallRisk: "low" | "medium" | "high" | "critical"
  riskScore: number
  factors: {
    political: { score: number; trend: "up" | "down" | "stable"; description: string }
    credit: { score: number; trend: "up" | "down" | "stable"; description: string }
    market: { score: number; trend: "up" | "down" | "stable"; description: string }
    operational: { score: number; trend: "up" | "down" | "stable"; description: string }
    compliance: { score: number; trend: "up" | "down" | "stable"; description: string }
  }
  recommendations: string[]
  lastUpdated: string
}

export function TransactionRiskAssessmentInterface() {
  const [selectedTrade, setSelectedTrade] = useState<string>("")
  const [assessments] = useState<RiskAssessment[]>([
    {
      id: "RA-001",
      tradeId: "TRD-001",
      counterparty: "Global Imports Ltd",
      amount: 125000,
      currency: "USD",
      commodity: "Electronics",
      region: "Europe",
      overallRisk: "medium",
      riskScore: 65,
      factors: {
        political: { score: 75, trend: "down", description: "Stable political environment with minor tensions" },
        credit: { score: 85, trend: "stable", description: "Strong credit history with good payment record" },
        market: { score: 60, trend: "down", description: "Electronics market showing volatility" },
        operational: { score: 70, trend: "stable", description: "Reliable logistics and supply chain" },
        compliance: { score: 90, trend: "up", description: "Full compliance with all regulations" },
      },
      recommendations: [
        "Monitor political developments in the region",
        "Consider currency hedging for EUR exposure",
        "Review insurance coverage for electronics shipments",
      ],
      lastUpdated: "2024-01-18T10:30:00Z",
    },
    {
      id: "RA-002",
      tradeId: "TRD-004",
      counterparty: "Pacific Traders",
      amount: 67800,
      currency: "USD",
      commodity: "Chemicals",
      region: "Asia Pacific",
      overallRisk: "high",
      riskScore: 35,
      factors: {
        political: { score: 45, trend: "down", description: "Regional tensions affecting trade routes" },
        credit: { score: 55, trend: "down", description: "Recent credit rating downgrade" },
        market: { score: 40, trend: "down", description: "Chemical market facing regulatory pressures" },
        operational: { score: 30, trend: "down", description: "Supply chain disruptions reported" },
        compliance: { score: 65, trend: "stable", description: "Meeting basic compliance requirements" },
      },
      recommendations: [
        "Require additional collateral or guarantees",
        "Consider alternative shipping routes",
        "Increase monitoring frequency",
        "Review counterparty financial statements",
      ],
      lastUpdated: "2024-01-18T09:15:00Z",
    },
  ])

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Risk</Badge>
      case "critical":
        return <Badge className="bg-red-600 text-white border-red-600">Critical Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "stable":
        return <BarChart3 className="h-4 w-4 text-yellow-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const selectedAssessment = assessments.find((a) => a.tradeId === selectedTrade)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transaction Risk Assessment</h1>
          <p className="text-muted-foreground">Comprehensive risk analysis for trade transactions</p>
        </div>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Run New Assessment
        </Button>
      </div>

      {/* Trade Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Select Trade for Assessment
          </CardTitle>
          <CardDescription>Choose a trade to view detailed risk analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trade-select">Trade ID</Label>
              <Select value={selectedTrade} onValueChange={setSelectedTrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a trade" />
                </SelectTrigger>
                <SelectContent>
                  {assessments.map((assessment) => (
                    <SelectItem key={assessment.tradeId} value={assessment.tradeId}>
                      {assessment.tradeId} - {assessment.counterparty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Or Enter New Trade ID</Label>
              <Input placeholder="TRD-XXX" />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Assess New Trade</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedAssessment && (
        <>
          {/* Risk Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{selectedAssessment.riskScore}/100</div>
                {getRiskBadge(selectedAssessment.overallRisk)}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trade Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedAssessment.amount.toLocaleString()} {selectedAssessment.currency}
                </div>
                <p className="text-xs text-muted-foreground">{selectedAssessment.commodity}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Region</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{selectedAssessment.region}</div>
                <p className="text-xs text-muted-foreground">{selectedAssessment.counterparty}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">{new Date(selectedAssessment.lastUpdated).toLocaleDateString()}</div>
                <p className="text-xs text-muted-foreground">
                  {new Date(selectedAssessment.lastUpdated).toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="factors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="factors">Risk Factors</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="history">Assessment History</TabsTrigger>
            </TabsList>

            <TabsContent value="factors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Risk Factor Analysis
                  </CardTitle>
                  <CardDescription>Detailed breakdown of risk components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(selectedAssessment.factors).map(([key, factor]) => (
                      <div key={key} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium capitalize">{key} Risk</span>
                            {getTrendIcon(factor.trend)}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${getScoreColor(factor.score)}`}>{factor.score}/100</span>
                          </div>
                        </div>
                        <Progress value={factor.score} className="h-2" />
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Risk Mitigation Recommendations
                  </CardTitle>
                  <CardDescription>Suggested actions to reduce transaction risk</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedAssessment.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{recommendation}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Implement
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Assessment History
                  </CardTitle>
                  <CardDescription>Historical risk assessments for this trade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Current Assessment</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedAssessment.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{selectedAssessment.riskScore}/100</span>
                        {getRiskBadge(selectedAssessment.overallRisk)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Previous Assessment</p>
                        <p className="text-sm text-muted-foreground">2024-01-10</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">72/100</span>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Risk</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Initial Assessment</p>
                        <p className="text-sm text-muted-foreground">2024-01-05</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">78/100</span>
                        <Badge className="bg-green-100 text-green-800 border-green-200">Low Risk</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {!selectedAssessment && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select a Trade</h3>
            <p className="text-muted-foreground">Choose a trade from the dropdown above to view its risk assessment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
