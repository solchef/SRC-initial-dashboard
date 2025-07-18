"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Shield, Eye, Settings, CheckCircle, X, TrendingUp, DollarSign, Users, Zap } from "lucide-react"

interface RedFlag {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  category: "financial" | "compliance" | "operational" | "behavioral" | "market"
  detectedAt: string
  entity: string
  entityType: "counterparty" | "trade" | "document" | "payment"
  status: "active" | "investigating" | "resolved" | "false_positive"
  evidence: string[]
  recommendations: string[]
  aiConfidence: number
}

const mockRedFlags: RedFlag[] = [
  {
    id: "RF-2024-001",
    title: "Unusual Payment Pattern Detected",
    description: "Counterparty has made multiple small payments instead of agreed lump sum",
    severity: "high",
    category: "financial",
    detectedAt: "2024-01-15T10:30:00Z",
    entity: "Global Trading Corp",
    entityType: "counterparty",
    status: "active",
    evidence: [
      "Expected single payment of $500,000",
      "Received 15 payments ranging $20,000-$40,000",
      "Payments from different bank accounts",
    ],
    recommendations: [
      "Contact counterparty for explanation",
      "Review payment terms in contract",
      "Consider AML screening",
    ],
    aiConfidence: 87,
  },
  {
    id: "RF-2024-002",
    title: "Document Inconsistency Alert",
    description: "Bill of Lading dates don't match shipping schedule",
    severity: "medium",
    category: "operational",
    detectedAt: "2024-01-14T14:20:00Z",
    entity: "TRD-2024-045",
    entityType: "trade",
    status: "investigating",
    evidence: [
      "Bill of Lading dated Jan 10, 2024",
      "Vessel departure recorded Jan 8, 2024",
      "2-day discrepancy identified",
    ],
    recommendations: ["Verify with shipping agent", "Request corrected documentation", "Check vessel tracking data"],
    aiConfidence: 92,
  },
  {
    id: "RF-2024-003",
    title: "Sanctions List Match",
    description: "Beneficial owner appears on updated sanctions list",
    severity: "critical",
    category: "compliance",
    detectedAt: "2024-01-13T09:15:00Z",
    entity: "Eastern European Metals Ltd",
    entityType: "counterparty",
    status: "active",
    evidence: ["Name match: 85% similarity", "DOB match: Exact", "Added to OFAC list Jan 12, 2024"],
    recommendations: [
      "Immediately freeze all transactions",
      "Contact compliance team",
      "File suspicious activity report",
    ],
    aiConfidence: 96,
  },
  {
    id: "RF-2024-004",
    title: "Behavioral Anomaly Detected",
    description: "Counterparty requesting unusual contract modifications",
    severity: "medium",
    category: "behavioral",
    detectedAt: "2024-01-12T16:45:00Z",
    entity: "Pacific Resources Inc",
    entityType: "counterparty",
    status: "resolved",
    evidence: ["3 modification requests in 2 days", "Changes to payment terms", "Urgency in communications"],
    recommendations: [
      "Review modification requests carefully",
      "Assess impact on risk profile",
      "Document all changes",
    ],
    aiConfidence: 73,
  },
]

const detectionSettings = [
  {
    category: "Financial Anomalies",
    description: "Detect unusual payment patterns and financial irregularities",
    enabled: true,
    sensitivity: "high",
  },
  {
    category: "Compliance Violations",
    description: "Monitor for sanctions, AML, and regulatory compliance issues",
    enabled: true,
    sensitivity: "critical",
  },
  {
    category: "Document Inconsistencies",
    description: "Identify discrepancies in trade documentation",
    enabled: true,
    sensitivity: "medium",
  },
  {
    category: "Behavioral Patterns",
    description: "Analyze counterparty behavior for suspicious activities",
    enabled: false,
    sensitivity: "low",
  },
  {
    category: "Market Anomalies",
    description: "Detect unusual market conditions affecting trades",
    enabled: true,
    sensitivity: "medium",
  },
]

export function RedFlagDetectionInterface() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedFlag, setSelectedFlag] = useState<RedFlag | null>(null)

  const filteredFlags = mockRedFlags.filter((flag) => {
    const matchesSearch =
      flag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || flag.severity === severityFilter
    const matchesCategory = categoryFilter === "all" || flag.category === categoryFilter
    const matchesStatus = statusFilter === "all" || flag.status === statusFilter
    return matchesSearch && matchesSeverity && matchesCategory && matchesStatus
  })

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low</Badge>
      default:
        return <Badge>{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800">Active</Badge>
      case "investigating":
        return <Badge className="bg-yellow-100 text-yellow-800">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "false_positive":
        return <Badge className="bg-gray-100 text-gray-800">False Positive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial":
        return <DollarSign className="h-4 w-4" />
      case "compliance":
        return <Shield className="h-4 w-4" />
      case "operational":
        return <Settings className="h-4 w-4" />
      case "behavioral":
        return <Users className="h-4 w-4" />
      case "market":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Red Flag Detection</h1>
          <p className="text-muted-foreground">AI-powered risk detection and monitoring system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Run Scan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockRedFlags.filter((f) => f.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Investigation</CardTitle>
            <Eye className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockRedFlags.filter((f) => f.status === "investigating").length}
            </div>
            <p className="text-xs text-muted-foreground">Being reviewed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-xs text-muted-foreground">Successfully addressed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">94.2%</div>
            <p className="text-xs text-muted-foreground">AI accuracy score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="history">Detection History</TabsTrigger>
          <TabsTrigger value="settings">Detection Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Red Flag Alerts</CardTitle>
              <CardDescription>Real-time detection of suspicious activities and anomalies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="false_positive">False Positive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredFlags.map((flag) => (
                  <div
                    key={flag.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedFlag(flag)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">{getCategoryIcon(flag.category)}</div>
                        <div>
                          <h3 className="font-medium">{flag.title}</h3>
                          <p className="text-sm text-muted-foreground">{flag.entity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(flag.severity)}
                        {getStatusBadge(flag.status)}
                      </div>
                    </div>
                    <p className="text-sm mb-3">{flag.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Detected: {new Date(flag.detectedAt).toLocaleString()}</span>
                      <span>AI Confidence: {flag.aiConfidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detection History</CardTitle>
              <CardDescription>Historical view of all detected red flags and their resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRedFlags.map((flag) => (
                  <div key={flag.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">{getCategoryIcon(flag.category)}</div>
                      <div>
                        <p className="font-medium">{flag.title}</p>
                        <p className="text-sm text-muted-foreground">{flag.entity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm">{new Date(flag.detectedAt).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">{flag.aiConfidence}% confidence</p>
                      </div>
                      {getSeverityBadge(flag.severity)}
                      {getStatusBadge(flag.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detection Configuration</CardTitle>
              <CardDescription>Configure AI detection parameters and sensitivity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {detectionSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{setting.category}</h3>
                        <Badge variant={setting.enabled ? "default" : "secondary"}>
                          {setting.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select defaultValue={setting.sensitivity}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Custom Detection Rules</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add custom rules for specific red flag detection scenarios
                </p>
                <div className="space-y-4">
                  <Input placeholder="Rule name" />
                  <Textarea placeholder="Rule description and conditions" />
                  <div className="flex gap-2">
                    <Button size="sm">Add Rule</Button>
                    <Button size="sm" variant="outline">
                      Test Rule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedFlag && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{selectedFlag.title}</CardTitle>
              <CardDescription>{selectedFlag.entity}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedFlag(null)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {getSeverityBadge(selectedFlag.severity)}
              {getStatusBadge(selectedFlag.status)}
              <Badge variant="outline">AI Confidence: {selectedFlag.aiConfidence}%</Badge>
            </div>
            <p>{selectedFlag.description}</p>
            <div>
              <h4 className="font-medium mb-2">Evidence</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {selectedFlag.evidence.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Recommendations</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {selectedFlag.recommendations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Mark as Investigating</Button>
              <Button size="sm" variant="outline">
                Mark as Resolved
              </Button>
              <Button size="sm" variant="outline">
                False Positive
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
