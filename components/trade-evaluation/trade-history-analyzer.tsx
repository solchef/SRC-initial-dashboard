"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle, FileText } from "lucide-react"

interface TradeRecord {
  id: string
  date: string
  counterparty: string
  commodity: string
  value: number
  region: string
  status: "completed" | "in_progress" | "cancelled" | "disputed"
  riskScore: number
  paymentTerms: string
  deliveryDate: string
  profitMargin: number
}

const mockTradeData = [
  {
    id: "TRD-2024-001",
    date: "2024-01-15",
    counterparty: "Global Commodities Ltd",
    commodity: "Coffee Beans",
    value: 250000,
    region: "South America",
    status: "completed" as const,
    riskScore: 2.1,
    paymentTerms: "LC 90 days",
    deliveryDate: "2024-02-15",
    profitMargin: 12.5,
  },
  {
    id: "TRD-2024-002",
    date: "2024-01-20",
    counterparty: "Asian Trading Co",
    commodity: "Electronics",
    value: 500000,
    region: "Asia",
    status: "completed" as const,
    riskScore: 1.8,
    paymentTerms: "TT 30 days",
    deliveryDate: "2024-02-20",
    profitMargin: 8.3,
  },
  {
    id: "TRD-2024-003",
    date: "2024-02-01",
    counterparty: "European Metals Inc",
    commodity: "Steel",
    value: 750000,
    region: "Europe",
    status: "in_progress" as const,
    riskScore: 3.2,
    paymentTerms: "LC 60 days",
    deliveryDate: "2024-03-01",
    profitMargin: 15.2,
  },
  {
    id: "TRD-2024-004",
    date: "2024-02-10",
    counterparty: "African Resources",
    commodity: "Minerals",
    value: 300000,
    region: "Africa",
    status: "disputed" as const,
    riskScore: 4.5,
    paymentTerms: "TT 45 days",
    deliveryDate: "2024-03-10",
    profitMargin: -2.1,
  },
]

const performanceData = [
  { month: "Jan", trades: 12, value: 2500000, profit: 285000 },
  { month: "Feb", trades: 15, value: 3200000, profit: 384000 },
  { month: "Mar", trades: 18, value: 2800000, profit: 322000 },
  { month: "Apr", trades: 22, value: 4100000, profit: 451000 },
  { month: "May", trades: 19, value: 3600000, profit: 396000 },
  { month: "Jun", trades: 25, value: 4800000, profit: 528000 },
]

const regionData = [
  { name: "Asia", value: 35, color: "#0088FE" },
  { name: "Europe", value: 28, color: "#00C49F" },
  { name: "North America", value: 20, color: "#FFBB28" },
  { name: "South America", value: 12, color: "#FF8042" },
  { name: "Africa", value: 5, color: "#8884D8" },
]

const riskPatterns = [
  { category: "Payment Delays", frequency: 15, trend: "decreasing" },
  { category: "Quality Issues", frequency: 8, trend: "stable" },
  { category: "Delivery Delays", frequency: 12, trend: "increasing" },
  { category: "Documentation Errors", frequency: 6, trend: "decreasing" },
  { category: "Currency Fluctuation", frequency: 20, trend: "increasing" },
]

export function TradeHistoryAnalyzerInterface() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [selectedTrade, setSelectedTrade] = useState<TradeRecord | null>(null)

  const filteredTrades = mockTradeData.filter((trade) => {
    const matchesSearch =
      trade.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || trade.status === statusFilter
    const matchesRegion = regionFilter === "all" || trade.region === regionFilter
    return matchesSearch && matchesStatus && matchesRegion
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
      case "disputed":
        return <Badge className="bg-red-100 text-red-800">Disputed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRiskBadge = (score: number) => {
    if (score <= 2) return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
    if (score <= 3.5) return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
    return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trade History Analyzer</h1>
          <p className="text-muted-foreground">Analyze historical trade performance and identify patterns</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="patterns">Risk Patterns</TabsTrigger>
          <TabsTrigger value="trades">Trade Records</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24.8M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18%</span> from last quarter
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
                  <span className="text-green-600">+2.1%</span> from last quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">-0.3</span> from last quarter
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
                <CardDescription>Trade volume by region</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Counterparties</CardTitle>
                <CardDescription>Most frequent trading partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Global Commodities Ltd", trades: 24, value: "$4.2M", risk: "Low" },
                    { name: "Asian Trading Co", trades: 18, value: "$3.1M", risk: "Low" },
                    { name: "European Metals Inc", trades: 15, value: "$2.8M", risk: "Medium" },
                    { name: "Pacific Resources", trades: 12, value: "$2.1M", risk: "Low" },
                  ].map((partner, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{partner.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {partner.trades} trades • {partner.value}
                        </p>
                      </div>
                      <Badge variant={partner.risk === "Low" ? "default" : "secondary"}>{partner.risk} Risk</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trends</CardTitle>
              <CardDescription>Trade volume and profitability over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="value" fill="#8884d8" name="Trade Value ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profitability Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Margin:</span>
                    <span className="font-bold text-green-600">11.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Performing:</span>
                    <span className="font-bold">Steel (15.2%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Worst Performing:</span>
                    <span className="font-bold text-red-600">Minerals (-2.1%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>LC Terms:</span>
                    <span className="font-bold">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TT Terms:</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Payment Days:</span>
                    <span className="font-bold">52 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>On-Time Delivery:</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Delay:</span>
                    <span className="font-bold">3.2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Issues:</span>
                    <span className="font-bold">2.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Pattern Analysis</CardTitle>
              <CardDescription>Identified patterns and trends in trade risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{pattern.category}</h3>
                        <p className="text-sm text-muted-foreground">Frequency: {pattern.frequency} incidents</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {pattern.trend === "increasing" ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : pattern.trend === "decreasing" ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 bg-gray-400 rounded-full" />
                      )}
                      <span className="text-sm capitalize">{pattern.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade Records</CardTitle>
              <CardDescription>Detailed view of all historical trades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search trades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="disputed">Disputed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="South America">South America</SelectItem>
                    <SelectItem value="Africa">Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedTrade(trade)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <h3 className="font-medium">{trade.id}</h3>
                        {getStatusBadge(trade.status)}
                        {getRiskBadge(trade.riskScore)}
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${trade.value.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{trade.date}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Counterparty</p>
                        <p className="font-medium">{trade.counterparty}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Commodity</p>
                        <p className="font-medium">{trade.commodity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Region</p>
                        <p className="font-medium">{trade.region}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Profit Margin</p>
                        <p className={`font-medium ${trade.profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {trade.profitMargin}%
                        </p>
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
