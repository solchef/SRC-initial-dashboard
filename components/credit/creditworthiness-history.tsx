"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Calendar, Download, Eye, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react"

interface CreditEvent {
  id: string
  date: string
  type: "score_change" | "limit_change" | "assessment" | "payment" | "default"
  description: string
  impact: number
  newScore: number
  details?: string
}

interface CreditSnapshot {
  date: string
  score: number
  rating: string
  limit: number
  utilization: number
  paymentHistory: number
}

const creditHistory: CreditSnapshot[] = [
  { date: "2023-01", score: 720, rating: "Good", limit: 300000, utilization: 45, paymentHistory: 92 },
  { date: "2023-02", score: 735, rating: "Good", limit: 350000, utilization: 42, paymentHistory: 94 },
  { date: "2023-03", score: 742, rating: "Good", limit: 350000, utilization: 38, paymentHistory: 95 },
  { date: "2023-04", score: 738, rating: "Good", limit: 350000, utilization: 41, paymentHistory: 93 },
  { date: "2023-05", score: 755, rating: "Excellent", limit: 400000, utilization: 35, paymentHistory: 96 },
  { date: "2023-06", score: 762, rating: "Excellent", limit: 450000, utilization: 32, paymentHistory: 97 },
  { date: "2023-07", score: 758, rating: "Excellent", limit: 450000, utilization: 36, paymentHistory: 96 },
  { date: "2023-08", score: 771, rating: "Excellent", limit: 500000, utilization: 30, paymentHistory: 98 },
  { date: "2023-09", score: 768, rating: "Excellent", limit: 500000, utilization: 33, paymentHistory: 97 },
  { date: "2023-10", score: 775, rating: "Excellent", limit: 500000, utilization: 29, paymentHistory: 98 },
  { date: "2023-11", score: 782, rating: "Excellent", limit: 550000, utilization: 27, paymentHistory: 99 },
  { date: "2023-12", score: 785, rating: "Excellent", limit: 600000, utilization: 25, paymentHistory: 99 },
]

const creditEvents: CreditEvent[] = [
  {
    id: "1",
    date: "2023-12-15",
    type: "limit_change",
    description: "Credit limit increased to $600,000",
    impact: +3,
    newScore: 785,
    details: "Based on improved financial performance and payment history",
  },
  {
    id: "2",
    date: "2023-11-20",
    type: "assessment",
    description: "Annual credit assessment completed",
    impact: +7,
    newScore: 782,
    details: "Strong financial statements and consistent payment behavior",
  },
  {
    id: "3",
    date: "2023-10-10",
    type: "payment",
    description: "Large payment made ahead of schedule",
    impact: +5,
    newScore: 775,
    details: "$150,000 payment made 15 days early",
  },
  {
    id: "4",
    date: "2023-08-05",
    type: "score_change",
    description: "Credit score improved due to reduced utilization",
    impact: +13,
    newScore: 771,
    details: "Credit utilization decreased from 45% to 30%",
  },
]

const ratingDistribution = [
  { name: "Excellent (750+)", value: 8, color: "#22c55e" },
  { name: "Good (700-749)", value: 4, color: "#3b82f6" },
  { name: "Fair (650-699)", value: 0, color: "#f59e0b" },
  { name: "Poor (<650)", value: 0, color: "#ef4444" },
]

export function CreditworthinessHistoryInterface() {
  const [selectedPeriod, setSelectedPeriod] = useState("12months")
  const [selectedMetric, setSelectedMetric] = useState("score")

  const getEventIcon = (type: string) => {
    switch (type) {
      case "score_change":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "limit_change":
        return <BarChart3 className="h-4 w-4 text-blue-500" />
      case "assessment":
        return <CheckCircle className="h-4 w-4 text-purple-500" />
      case "payment":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "default":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  const getEventBadge = (type: string) => {
    switch (type) {
      case "score_change":
        return <Badge className="bg-green-100 text-green-800">Score Change</Badge>
      case "limit_change":
        return <Badge className="bg-blue-100 text-blue-800">Limit Change</Badge>
      case "assessment":
        return <Badge className="bg-purple-100 text-purple-800">Assessment</Badge>
      case "payment":
        return <Badge className="bg-green-100 text-green-800">Payment</Badge>
      case "default":
        return <Badge className="bg-red-100 text-red-800">Default</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const currentScore = creditHistory[creditHistory.length - 1]?.score || 0
  const previousScore = creditHistory[creditHistory.length - 2]?.score || 0
  const scoreChange = currentScore - previousScore

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Creditworthiness History</h1>
          <p className="text-muted-foreground">Track your credit score evolution and key events</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            Detailed Analysis
          </Button>
        </div>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{currentScore}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {scoreChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {scoreChange >= 0 ? "+" : ""}
              {scoreChange} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Rating</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Excellent</div>
            <p className="text-xs text-muted-foreground">Maintained for 7 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Limit</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$600K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+$50K</span> increase last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">25%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Score Trends</TabsTrigger>
          <TabsTrigger value="events">Credit Events</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          {/* Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="12months">Last 12 Months</SelectItem>
                    <SelectItem value="24months">Last 24 Months</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Credit Score</SelectItem>
                    <SelectItem value="limit">Credit Limit</SelectItem>
                    <SelectItem value="utilization">Utilization</SelectItem>
                    <SelectItem value="paymentHistory">Payment History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Score Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Score History</CardTitle>
              <CardDescription>Your credit score evolution over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={creditHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["dataMin - 20", "dataMax + 20"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Multiple Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Utilization Trend</CardTitle>
                <CardDescription>Monthly credit utilization percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={creditHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="utilization" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Time spent in each credit rating</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ratingDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value} months`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ratingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Events Timeline</CardTitle>
              <CardDescription>Key events that impacted your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditEvents.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index < creditEvents.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                    )}
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">{getEventIcon(event.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{event.description}</h3>
                          <div className="flex items-center gap-2">
                            {getEventBadge(event.type)}
                            <Badge variant={event.impact >= 0 ? "default" : "destructive"}>
                              {event.impact >= 0 ? "+" : ""}
                              {event.impact} points
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.details}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{event.date}</span>
                          <span>New Score: {event.newScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Improvement Factors</CardTitle>
                <CardDescription>What contributed to your score increases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Reduced Credit Utilization</span>
                    <span className="text-green-600 font-bold">+25 points</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Consistent Payment History</span>
                    <span className="text-green-600 font-bold">+18 points</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Improved Financial Ratios</span>
                    <span className="text-green-600 font-bold">+12 points</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Increased Credit Limits</span>
                    <span className="text-green-600 font-bold">+8 points</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Score (12 months)</span>
                      <span className="font-bold">762</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Range: 720 - 785</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Score Volatility</span>
                      <span className="font-bold text-green-600">Low</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Standard deviation: 18.5</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Improvement Rate</span>
                      <span className="font-bold text-green-600">+65 points/year</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Above industry average</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Payment Consistency</span>
                      <span className="font-bold text-green-600">99%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">On-time payment rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Credit Score Forecast</CardTitle>
              <CardDescription>Projected score based on current trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">790</div>
                  <div className="text-sm text-muted-foreground">3 Months</div>
                  <div className="text-xs text-muted-foreground">Projected score</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">800</div>
                  <div className="text-sm text-muted-foreground">6 Months</div>
                  <div className="text-xs text-muted-foreground">Projected score</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">815</div>
                  <div className="text-sm text-muted-foreground">12 Months</div>
                  <div className="text-xs text-muted-foreground">Projected score</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Forecast Assumptions:</strong> Based on current payment patterns, credit utilization trends,
                  and historical improvement rate. Actual results may vary.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Download detailed credit history reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Annual Credit Summary 2023",
                    "Monthly Score Trends Report",
                    "Credit Events Analysis",
                    "Payment History Report",
                    "Credit Utilization Analysis",
                    "Comparative Industry Report",
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">{report}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Schedule</CardTitle>
                <CardDescription>Automated report generation settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Monthly Summary</p>
                      <p className="text-xs text-muted-foreground">Generated on 1st of each month</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Quarterly Analysis</p>
                      <p className="text-xs text-muted-foreground">Generated quarterly</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Annual Report</p>
                      <p className="text-xs text-muted-foreground">Generated annually</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
