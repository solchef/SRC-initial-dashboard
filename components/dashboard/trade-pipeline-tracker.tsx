"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Search, Filter, Eye, Clock, DollarSign, Calendar, MapPin, FileText } from "lucide-react"

interface Trade {
  id: string
  counterparty: string
  amount: number
  currency: string
  status: "initiation" | "documentation" | "financing" | "shipment" | "completion"
  progress: number
  startDate: string
  expectedCompletion: string
  region: string
  commodity: string
  riskLevel: "low" | "medium" | "high"
  documents: number
  totalDocuments: number
}

export function TradePipelineTrackerInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")

  const [trades] = useState<Trade[]>([
    {
      id: "TRD-001",
      counterparty: "Global Imports Ltd",
      amount: 125000,
      currency: "USD",
      status: "documentation",
      progress: 75,
      startDate: "2024-01-10",
      expectedCompletion: "2024-02-15",
      region: "Europe",
      commodity: "Electronics",
      riskLevel: "low",
      documents: 8,
      totalDocuments: 10,
    },
    {
      id: "TRD-002",
      counterparty: "Asia Trading Co",
      amount: 89500,
      currency: "USD",
      status: "financing",
      progress: 45,
      startDate: "2024-01-12",
      expectedCompletion: "2024-02-20",
      region: "Asia Pacific",
      commodity: "Textiles",
      riskLevel: "medium",
      documents: 6,
      totalDocuments: 12,
    },
    {
      id: "TRD-003",
      counterparty: "Euro Exports",
      amount: 234000,
      currency: "EUR",
      status: "shipment",
      progress: 90,
      startDate: "2024-01-05",
      expectedCompletion: "2024-01-25",
      region: "Europe",
      commodity: "Machinery",
      riskLevel: "low",
      documents: 15,
      totalDocuments: 15,
    },
    {
      id: "TRD-004",
      counterparty: "Pacific Traders",
      amount: 67800,
      currency: "USD",
      status: "initiation",
      progress: 25,
      startDate: "2024-01-18",
      expectedCompletion: "2024-03-01",
      region: "Asia Pacific",
      commodity: "Chemicals",
      riskLevel: "high",
      documents: 3,
      totalDocuments: 14,
    },
    {
      id: "TRD-005",
      counterparty: "American Suppliers",
      amount: 156000,
      currency: "USD",
      status: "completion",
      progress: 100,
      startDate: "2023-12-15",
      expectedCompletion: "2024-01-20",
      region: "North America",
      commodity: "Electronics",
      riskLevel: "low",
      documents: 12,
      totalDocuments: 12,
    },
  ])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      initiation: { label: "Initiation", className: "bg-blue-100 text-blue-800 border-blue-200" },
      documentation: { label: "Documentation", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      financing: { label: "Financing", className: "bg-purple-100 text-purple-800 border-purple-200" },
      shipment: { label: "Shipment", className: "bg-orange-100 text-orange-800 border-orange-200" },
      completion: { label: "Completed", className: "bg-green-100 text-green-800 border-green-200" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      low: { className: "text-green-600 border-green-200" },
      medium: { className: "text-yellow-600 border-yellow-200" },
      high: { className: "text-red-600 border-red-200" },
    }
    const config = riskConfig[risk as keyof typeof riskConfig]
    return (
      <Badge variant="outline" className={config.className}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </Badge>
    )
  }

  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      trade.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || trade.status === statusFilter
    const matchesRegion = regionFilter === "all" || trade.region === regionFilter
    return matchesSearch && matchesStatus && matchesRegion
  })

  const getStatusStats = () => {
    return {
      initiation: trades.filter((t) => t.status === "initiation").length,
      documentation: trades.filter((t) => t.status === "documentation").length,
      financing: trades.filter((t) => t.status === "financing").length,
      shipment: trades.filter((t) => t.status === "shipment").length,
      completion: trades.filter((t) => t.status === "completion").length,
    }
  }

  const stats = getStatusStats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trade Pipeline Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage your active trade transactions</p>
        </div>
        <Button>
          <DollarSign className="h-4 w-4 mr-2" />
          Create New Trade
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.initiation}</div>
            <p className="text-sm text-muted-foreground">Initiation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.documentation}</div>
            <p className="text-sm text-muted-foreground">Documentation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.financing}</div>
            <p className="text-sm text-muted-foreground">Financing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.shipment}</div>
            <p className="text-sm text-muted-foreground">Shipment</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completion}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by trade ID or counterparty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="initiation">Initiation</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="financing">Financing</SelectItem>
                <SelectItem value="shipment">Shipment</SelectItem>
                <SelectItem value="completion">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trade List */}
      <div className="space-y-4">
        {filteredTrades.map((trade) => (
          <Card key={trade.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{trade.id}</h3>
                      {getStatusBadge(trade.status)}
                      {getRiskBadge(trade.riskLevel)}
                    </div>
                    <p className="text-sm text-muted-foreground">{trade.counterparty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {trade.amount.toLocaleString()} {trade.currency}
                  </p>
                  <p className="text-sm text-muted-foreground">{trade.commodity}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium">{trade.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Expected Completion</p>
                    <p className="text-sm font-medium">{trade.expectedCompletion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Region</p>
                    <p className="text-sm font-medium">{trade.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Documents</p>
                    <p className="text-sm font-medium">
                      {trade.documents}/{trade.totalDocuments}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{trade.progress}%</span>
                  </div>
                  <Progress value={trade.progress} className="h-2" />
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTrades.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No trades found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or create a new trade.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
