"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Handshake,
} from "lucide-react"
import { useUserRole } from "@/hooks/use-user-role"

export function DashboardContent() {
  const { userRole } = useUserRole()

  if (userRole === "sme") {
    return <SMEDashboard />
  } else {
    return <LiquidityProviderDashboard />
  }
}

function SMEDashboard() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">SME Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your trade finance overview.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="border-border bg-card hover:bg-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">$2,847,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 pending approval</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">785</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Excellent</span> rating
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Low</div>
            <p className="text-xs text-muted-foreground">2 minor alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trade Pipeline */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader>
            <CardTitle>Trade Pipeline Tracker</CardTitle>
            <CardDescription>Current trades in various stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "TRD-001",
                  counterparty: "Global Imports Ltd",
                  amount: "$125,000",
                  status: "Documentation",
                  progress: 75,
                },
                {
                  id: "TRD-002",
                  counterparty: "Asia Trading Co",
                  amount: "$89,500",
                  status: "Financing",
                  progress: 45,
                },
                { id: "TRD-003", counterparty: "Euro Exports", amount: "$234,000", status: "Shipment", progress: 90 },
                {
                  id: "TRD-004",
                  counterparty: "Pacific Traders",
                  amount: "$67,800",
                  status: "Evaluation",
                  progress: 25,
                },
              ].map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{trade.id}</span>
                      <Badge variant="outline">{trade.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{trade.counterparty}</p>
                    <p className="text-sm font-medium">{trade.amount}</p>
                  </div>
                  <div className="w-24">
                    <Progress value={trade.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{trade.progress}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Create New Trade
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BarChart3 className="h-4 w-4 mr-2" />
                Upload Financials
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Marketplace
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Risk Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Political Risk Update</p>
                    <p className="text-xs text-muted-foreground">Region A stability decreased</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Compliance Check</p>
                    <p className="text-xs text-muted-foreground">All documents verified</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function LiquidityProviderDashboard() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Liquidity Provider Dashboard</h1>
        <p className="text-muted-foreground">Monitor your investments and discover new opportunities.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,247,800</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">$890K total exposure</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4%</div>
            <p className="text-xs text-muted-foreground">Above target of 10%</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3.2</div>
            <p className="text-xs text-muted-foreground">Low risk portfolio</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Investments */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader>
            <CardTitle>Active Investments</CardTitle>
            <CardDescription>Your current funding positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "INV-001",
                  borrower: "TechCorp Imports",
                  amount: "$75,000",
                  rate: "8.5%",
                  maturity: "45 days",
                  status: "Active",
                },
                {
                  id: "INV-002",
                  borrower: "Global Traders",
                  amount: "$120,000",
                  rate: "9.2%",
                  maturity: "62 days",
                  status: "Active",
                },
                {
                  id: "INV-003",
                  borrower: "Asia Exports Ltd",
                  amount: "$95,500",
                  rate: "7.8%",
                  maturity: "28 days",
                  status: "Maturing",
                },
                {
                  id: "INV-004",
                  borrower: "Euro Trading Co",
                  amount: "$150,000",
                  rate: "8.9%",
                  maturity: "71 days",
                  status: "Active",
                },
              ].map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{investment.id}</span>
                      <Badge variant={investment.status === "Maturing" ? "destructive" : "default"}>
                        {investment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{investment.borrower}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm font-medium">{investment.amount}</span>
                      <span className="text-sm text-green-600">{investment.rate}</span>
                      <span className="text-sm text-muted-foreground">{investment.maturity}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deal Flow & Actions */}
        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>New Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">$85,000</span>
                  <Badge variant="outline">8.7% APR</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Electronics Import - 60 days</p>
                <Button size="sm" className="w-full mt-2">
                  Make Offer
                </Button>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">$125,000</span>
                  <Badge variant="outline">9.1% APR</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Textile Export - 45 days</p>
                <Button size="sm" className="w-full mt-2">
                  Make Offer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Payment Received</p>
                    <p className="text-xs text-muted-foreground">$12,500 from TechCorp</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">New Deal Funded</p>
                    <p className="text-xs text-muted-foreground">$95,000 to Global Traders</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Risk Alert</p>
                    <p className="text-xs text-muted-foreground">Credit score updated</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
