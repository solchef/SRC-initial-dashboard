"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TrendingUp, Clock, CheckCircle, AlertTriangle, DollarSign, Search, Eye, MoreHorizontal } from "lucide-react"

interface Trade {
  id: string
  counterparty: string
  commodity: string
  value: number
  currency: string
  stage: "initiation" | "documentation" | "financing" | "shipping" | "settlement" | "completed"
  progress: number
  startDate: string
  expectedCompletion: string
  riskLevel: "low" | "medium" | "high"
  priority: "low" | "medium" | "high" | "urgent"
}

const mockTrades: Trade[] = [
  {
    id: "TRD-2024-001",
    counterparty: "Global Electronics Ltd",
    commodity: "Semiconductors",
    value: 250000,
    currency: "USD",
    stage: "financing",
    progress: 65,
    startDate: "2024-01-15",
    expectedCompletion: "2024-02-28",
    riskLevel: "low",
    priority: "high",
  },
  {
    id: "TRD-2024-002",
    counterparty: "Asian Textiles Co",
    commodity: "Cotton Fabric",
    value: 125000,
    currency: "USD",
    stage: "documentation",
    progress: 40,
    startDate: "2024-01-18",
    expectedCompletion: "2024-03-15",
    riskLevel: "medium",
    priority: "medium",
  },
  {
    id: "TRD-2024-003",
    counterparty: "European Machinery",
    commodity: "Industrial Equipment",
    value: 450000,
    currency: "EUR",
    stage: "shipping",
    progress: 85,
    startDate: "2024-01-10",
    expectedCompletion: "2024-02-20",
    riskLevel: "low",
    priority: "urgent",
  },
  {
    id: "TRD-2024-004",
    counterparty: "Chemical Solutions Inc",
    commodity: "Specialty Chemicals",
    value: 180000,
    currency: "USD",
    stage: "initiation",
    progress: 15,
    startDate: "2024-01-20",
    expectedCompletion: "2024-04-10",
    riskLevel: "high",
    priority: "low",
  },
]

const stages = [
  { id: "initiation", name: "Initiation", color: "bg-blue-100 text-blue-800" },
  { id: "documentation", name: "Documentation", color: "bg-yellow-100 text-yellow-800" },
  { id: "financing", name: "Financing", color: "bg-purple-100 text-purple-800" },
  { id: "shipping", name: "Shipping", color: "bg-orange-100 text-orange-800" },
  { id: "settlement", name: "Settlement", color: "bg-indigo-100 text-indigo-800" },
  { id: "completed", name: "Completed", color: "bg-green-100 text-green-800" },
]

export function TradePipelineTrackerInterface() {
  const [trades, setTrades] = useState<Trade[]>(mockTrades)
  const [selectedStage, setSelectedStage] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const filteredTrades = trades.filter((trade) => {
    const matchesStage = selectedStage === "all" || trade.stage === selectedStage
    const matchesSearch =
      trade.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStage && matchesSearch
  })

  const getStageInfo = (stage: string) => {
    return stages.find((s) => s.id === stage) || stages[0]
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-600 text-white">Urgent</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const stageStats = stages.map((stage) => ({
    ...stage,
    count: trades.filter((trade) => trade.stage === stage.id).length,
    value: trades.filter((trade) => trade.stage === stage.id).reduce((sum, trade) => sum + trade.value, 0),
  }))

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trade Pipeline Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage your trade transactions through each stage</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{trades.length} Active Trades</Badge>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stageStats.map((stage) => (
          <Card key={stage.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stage.count}</div>
                <div className="text-sm font-medium">{stage.name}</div>
                <div className="text-xs text-muted-foreground">${(stage.value / 1000).toFixed(0)}K</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search trades..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Trade List */}
          <div className="space-y-4">
            {filteredTrades.map((trade) => {
              const stageInfo = getStageInfo(trade.stage)
              return (
                <Card key={trade.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{trade.id}</h3>
                          <p className="text-muted-foreground">{trade.counterparty}</p>
                          <p className="text-sm text-muted-foreground">{trade.commodity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={stageInfo.color}>{stageInfo.name}</Badge>
                        {getRiskBadge(trade.riskLevel)}
                        {getPriorityBadge(trade.priority)}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Trade Value</p>
                        <p className="font-semibold">
                          {trade.value.toLocaleString()} {trade.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-semibold">{trade.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Completion</p>
                        <p className="font-semibold">{trade.expectedCompletion}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <div className="flex items-center gap-2">
                          <Progress value={trade.progress} className="flex-1" />
                          <span className="text-sm font-medium">{trade.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Last updated 2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm">Update Status</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stages.map((stage) => {
              const stageTrades = trades.filter((trade) => trade.stage === stage.id)
              return (
                <Card key={stage.id} className="min-h-96">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>{stage.name}</span>
                      <Badge variant="outline">{stageTrades.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stageTrades.map((trade) => (
                      <Card key={trade.id} className="p-3 cursor-pointer hover:shadow-sm transition-shadow">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{trade.id}</span>
                            {getPriorityBadge(trade.priority)}
                          </div>
                          <p className="text-xs text-muted-foreground">{trade.counterparty}</p>
                          <p className="text-xs text-muted-foreground">{trade.commodity}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">
                              {trade.value.toLocaleString()} {trade.currency}
                            </span>
                            {getRiskBadge(trade.riskLevel)}
                          </div>
                          <Progress value={trade.progress} className="h-1" />
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Completion Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42 days</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">-5 days</span> from last quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.1%</span> improvement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1.2M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bottlenecks</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">Documentation stage</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stage Performance</CardTitle>
              <CardDescription>Average time spent in each stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stages.map((stage) => (
                  <div key={stage.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{stage.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 15) + 5} days avg
                      </span>
                    </div>
                    <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
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
