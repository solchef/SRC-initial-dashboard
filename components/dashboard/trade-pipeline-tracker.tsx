"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, AlertTriangle, Eye } from "lucide-react"

interface Trade {
  id: string
  counterparty: string
  commodity: string
  value: number
  stage: string
  progress: number
  daysRemaining: number
  priority: "high" | "medium" | "low"
  status: "on_track" | "delayed" | "at_risk"
  nextAction: string
}

const mockTrades: Trade[] = [
  {
    id: "TRD-2024-001",
    counterparty: "Global Electronics Ltd",
    commodity: "Semiconductors",
    value: 250000,
    stage: "Documentation Review",
    progress: 75,
    daysRemaining: 5,
    priority: "high",
    status: "on_track",
    nextAction: "Await LC confirmation",
  },
  {
    id: "TRD-2024-002",
    counterparty: "Asian Textiles Co",
    commodity: "Cotton Fabric",
    value: 125000,
    stage: "Financing Approval",
    progress: 45,
    daysRemaining: 12,
    priority: "medium",
    status: "delayed",
    nextAction: "Submit additional documents",
  },
  {
    id: "TRD-2024-003",
    counterparty: "European Machinery",
    commodity: "Industrial Equipment",
    value: 500000,
    stage: "Shipment Preparation",
    progress: 90,
    daysRemaining: 3,
    priority: "high",
    status: "on_track",
    nextAction: "Schedule inspection",
  },
  {
    id: "TRD-2024-004",
    counterparty: "Chemical Solutions Inc",
    commodity: "Specialty Chemicals",
    value: 180000,
    stage: "Risk Assessment",
    progress: 30,
    daysRemaining: 18,
    priority: "low",
    status: "at_risk",
    nextAction: "Provide financial statements",
  },
]

const stages = [
  "Initial Inquiry",
  "Quote Preparation",
  "Contract Negotiation",
  "Risk Assessment",
  "Financing Approval",
  "Documentation Review",
  "Shipment Preparation",
  "In Transit",
  "Customs Clearance",
  "Delivery Complete",
]

export function TradePipelineTrackerInterface() {
  const [trades, setTrades] = useState<Trade[]>(mockTrades)
  const [filterStage, setFilterStage] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on_track":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            On Track
          </Badge>
        )
      case "delayed":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Delayed
          </Badge>
        )
      case "at_risk":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            At Risk
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const filteredTrades = trades.filter((trade) => {
    const stageMatch = filterStage === "all" || trade.stage === filterStage
    const statusMatch = filterStatus === "all" || trade.status === filterStatus
    return stageMatch && statusMatch
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trade Pipeline Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage your active trade transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterStage} onValueChange={setFilterStage}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {stages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="on_track">On Track</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="at_risk">At Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trades.length}</div>
            <p className="text-xs text-muted-foreground">Total in pipeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {trades.filter((t) => t.status === "on_track").length}
            </div>
            <p className="text-xs text-muted-foreground">Proceeding normally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {trades.filter((t) => t.status === "delayed").length}
            </div>
            <p className="text-xs text-muted-foreground">Behind schedule</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{trades.filter((t) => t.status === "at_risk").length}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          {filteredTrades.map((trade) => (
            <Card key={trade.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{trade.id}</h3>
                      {getStatusBadge(trade.status)}
                      {getPriorityBadge(trade.priority)}
                    </div>
                    <p className="text-muted-foreground">{trade.counterparty}</p>
                    <p className="text-sm">
                      {trade.commodity} • ${trade.value.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{trade.daysRemaining} days remaining</p>
                    <p className="text-xs text-muted-foreground">Current: {trade.stage}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">{trade.progress}%</span>
                  </div>
                  <Progress value={trade.progress} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Next Action: {trade.nextAction}</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kanban" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stages.slice(0, 5).map((stage) => {
              const stageTrades = filteredTrades.filter((trade) => trade.stage === stage)
              return (
                <Card key={stage}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{stage}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {stageTrades.length} trades
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {stageTrades.map((trade) => (
                      <div key={trade.id} className="p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium">{trade.id}</span>
                          {getPriorityBadge(trade.priority)}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{trade.counterparty}</p>
                        <p className="text-xs">${trade.value.toLocaleString()}</p>
                        <Progress value={trade.progress} className="h-1 mt-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade Timeline</CardTitle>
              <CardDescription>Chronological view of trade milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredTrades.map((trade, index) => (
                  <div key={trade.id} className="relative">
                    {index < filteredTrades.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-border"></div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">
                            {trade.id} - {trade.counterparty}
                          </h3>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(trade.status)}
                            <span className="text-sm text-muted-foreground">{trade.daysRemaining} days left</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Currently in: {trade.stage}</p>
                        <div className="flex items-center gap-4">
                          <Progress value={trade.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{trade.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
