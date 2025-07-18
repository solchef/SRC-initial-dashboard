"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Building,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield,
  BarChart3,
  CheckCircle,
  RefreshCw,
} from "lucide-react"

export function CreditProfileInterface() {
  const creditProfile = {
    score: 785,
    rating: "Excellent",
    lastUpdated: "2024-01-18",
    creditLimit: 2500000,
    availableCredit: 1750000,
    utilizationRate: 30,
    paymentHistory: 98.5,
    tradingHistory: {
      totalTrades: 156,
      successfulTrades: 154,
      averageTradeSize: 118646,
      totalVolume: 18500000,
    },
    riskFactors: [
      { factor: "Payment History", score: 95, status: "excellent" },
      { factor: "Credit Utilization", score: 85, status: "good" },
      { factor: "Trade Diversification", score: 78, status: "good" },
      { factor: "Financial Stability", score: 88, status: "excellent" },
      { factor: "Industry Risk", score: 72, status: "fair" },
    ],
    recentActivity: [
      { date: "2024-01-15", activity: "Credit limit increased", amount: 500000 },
      { date: "2024-01-10", activity: "Trade completed", amount: 125000 },
      { date: "2024-01-08", activity: "Payment received", amount: 89500 },
      { date: "2024-01-05", activity: "New trade initiated", amount: 234000 },
    ],
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good</Badge>
      case "fair":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Fair</Badge>
      case "poor":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Poor</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Credit Profile</h1>
          <p className="text-muted-foreground">Your comprehensive credit assessment and history</p>
        </div>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Update Profile
        </Button>
      </div>

      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{creditProfile.score}</div>
            <p className="text-xs text-muted-foreground">
              <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">{creditProfile.rating}</Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Limit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${creditProfile.creditLimit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">${creditProfile.availableCredit.toLocaleString()} available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creditProfile.utilizationRate}%</div>
            <Progress value={creditProfile.utilizationRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment History</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{creditProfile.paymentHistory}%</div>
            <p className="text-xs text-muted-foreground">On-time payments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="factors">Risk Factors</TabsTrigger>
          <TabsTrigger value="history">Trading History</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Credit Summary
                </CardTitle>
                <CardDescription>Key credit metrics and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Credit Score</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{creditProfile.score}</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">{creditProfile.rating}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Updated</span>
                  <span className="text-muted-foreground">{creditProfile.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Credit Utilization</span>
                  <span className="font-medium">{creditProfile.utilizationRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment Performance</span>
                  <span className="font-medium text-green-600">{creditProfile.paymentHistory}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Trading Performance
                </CardTitle>
                <CardDescription>Historical trading metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Trades</span>
                  <span className="font-bold">{creditProfile.tradingHistory.totalTrades}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Success Rate</span>
                  <span className="font-medium text-green-600">
                    {(
                      (creditProfile.tradingHistory.successfulTrades / creditProfile.tradingHistory.totalTrades) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average Trade Size</span>
                  <span className="font-medium">${creditProfile.tradingHistory.averageTradeSize.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Volume</span>
                  <span className="font-bold">${creditProfile.tradingHistory.totalVolume.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Risk Factor Analysis
              </CardTitle>
              <CardDescription>Detailed breakdown of credit risk components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {creditProfile.riskFactors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getScoreColor(factor.score)}`}>{factor.score}/100</span>
                        {getStatusBadge(factor.status)}
                      </div>
                    </div>
                    <Progress value={factor.score} className="h-2" />
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
                Trading History
              </CardTitle>
              <CardDescription>Comprehensive trading performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Total Trades Completed</span>
                      <span className="font-bold">{creditProfile.tradingHistory.totalTrades}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Successful Trades</span>
                      <span className="font-bold text-green-600">{creditProfile.tradingHistory.successfulTrades}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Failed Trades</span>
                      <span className="font-bold text-red-600">
                        {creditProfile.tradingHistory.totalTrades - creditProfile.tradingHistory.successfulTrades}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Success Rate</span>
                      <span className="font-bold text-primary">
                        {(
                          (creditProfile.tradingHistory.successfulTrades / creditProfile.tradingHistory.totalTrades) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Volume Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Total Trade Volume</span>
                      <span className="font-bold">${creditProfile.tradingHistory.totalVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Trade Size</span>
                      <span className="font-bold">
                        ${creditProfile.tradingHistory.averageTradeSize.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Largest Trade</span>
                      <span className="font-bold">$450,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Monthly Average</span>
                      <span className="font-bold">$1,540,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest credit-related activities and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditProfile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${activity.amount.toLocaleString()}</p>
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
