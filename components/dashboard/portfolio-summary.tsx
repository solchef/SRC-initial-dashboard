"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, DollarSign, Target, Eye } from "lucide-react"

const portfolioData = [
  { name: "Electronics", value: 35, amount: 875000, color: "#0088FE" },
  { name: "Textiles", value: 25, amount: 625000, color: "#00C49F" },
  { name: "Machinery", value: 20, amount: 500000, color: "#FFBB28" },
  { name: "Chemicals", value: 15, amount: 375000, color: "#FF8042" },
  { name: "Others", value: 5, amount: 125000, color: "#8884D8" },
]

const performanceData = [
  { month: "Jan", value: 2100000, profit: 252000, trades: 18 },
  { month: "Feb", value: 2350000, profit: 282000, trades: 22 },
  { month: "Mar", value: 2200000, profit: 264000, trades: 20 },
  { month: "Apr", value: 2500000, profit: 300000, trades: 25 },
  { month: "May", value: 2400000, profit: 288000, trades: 24 },
  { month: "Jun", value: 2600000, profit: 312000, trades: 28 },
]

const topTrades = [
  { id: "TRD-001", counterparty: "Global Electronics Ltd", value: 125000, profit: 15000, status: "active" },
  { id: "TRD-002", counterparty: "Asian Textiles Co", value: 89000, profit: 8900, status: "completed" },
  { id: "TRD-003", counterparty: "European Machinery", value: 156000, profit: 18720, status: "active" },
  { id: "TRD-004", counterparty: "Chemical Solutions Inc", value: 78000, profit: 7020, status: "pending" },
]

export function PortfolioSummaryInterface() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Summary</h1>
          <p className="text-muted-foreground">Overview of your trade finance portfolio</p>
        </div>
        <Button>
          <Eye className="h-4 w-4 mr-2" />
          Detailed Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.5M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+4</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$312K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trades">Top Trades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
                <CardDescription>Breakdown by commodity type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
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
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Portfolio risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Low Risk</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Medium Risk</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>High Risk</span>
                    <span className="font-medium">7%</span>
                  </div>
                  <Progress value={7} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Monthly portfolio performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="Portfolio Value" />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Trades</CardTitle>
              <CardDescription>Your most profitable trades this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{trade.id}</h3>
                      <p className="text-sm text-muted-foreground">{trade.counterparty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${trade.value.toLocaleString()}</p>
                      <p className="text-sm text-green-600">+${trade.profit.toLocaleString()}</p>
                    </div>
                    <Badge variant={trade.status === "active" ? "default" : "secondary"}>{trade.status}</Badge>
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
