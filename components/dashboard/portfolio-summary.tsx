"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Handshake,
  Globe,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
import { useUserRole } from "@/hooks/use-user-role"

export function PortfolioSummaryInterface() {
  const { userRole } = useUserRole()

  if (userRole === "sme") {
    return <SMEPortfolioSummary />
  } else {
    return <LiquidityProviderPortfolioSummary />
  }
}

function SMEPortfolioSummary() {
  const portfolioData = {
    totalValue: 2847500,
    monthlyChange: 12.5,
    activeTrades: 24,
    pendingTrades: 8,
    completedTrades: 156,
    averageTradeSize: 118646,
    regions: [
      { name: "North America", value: 1250000, percentage: 43.9, change: 8.2 },
      { name: "Europe", value: 890000, percentage: 31.3, change: 15.7 },
      { name: "Asia Pacific", value: 520000, percentage: 18.3, change: 22.1 },
      { name: "Others", value: 187500, percentage: 6.5, change: -2.3 },
    ],
    industries: [
      { name: "Electronics", value: 1140000, percentage: 40.0, trades: 68 },
      { name: "Textiles", value: 710000, percentage: 24.9, trades: 42 },
      { name: "Machinery", value: 540000, percentage: 19.0, trades: 28 },
      { name: "Chemicals", value: 457500, percentage: 16.1, trades: 18 },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio Summary</h1>
          <p className="text-muted-foreground">Overview of your trade finance portfolio</p>
        </div>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />+{portfolioData.monthlyChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.activeTrades}</div>
            <p className="text-xs text-muted-foreground">{portfolioData.pendingTrades} pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Trades</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.completedTrades}</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Trade Size</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioData.averageTradeSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="regions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="regions">By Region</TabsTrigger>
          <TabsTrigger value="industries">By Industry</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Regional Distribution
              </CardTitle>
              <CardDescription>Portfolio breakdown by geographic region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.regions.map((region) => (
                  <div key={region.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{region.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{region.percentage}%</span>
                        <Badge
                          variant="outline"
                          className={
                            region.change >= 0 ? "text-green-600 border-green-200" : "text-red-600 border-red-200"
                          }
                        >
                          {region.change >= 0 ? "+" : ""}
                          {region.change}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={region.percentage} className="flex-1" />
                      <span className="text-sm font-medium">${region.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry Breakdown</CardTitle>
              <CardDescription>Portfolio distribution across different industries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.industries.map((industry) => (
                  <div key={industry.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{industry.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{industry.trades} trades</span>
                        <span className="text-sm text-muted-foreground">{industry.percentage}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={industry.percentage} className="flex-1" />
                      <span className="text-sm font-medium">${industry.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>January 2024</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">+8.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>December 2023</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">+12.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>November 2023</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">+6.7%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>October 2023</span>
                    <Badge className="bg-red-100 text-red-800 border-red-200">-2.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Portfolio Risk Score</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Diversification Score</span>
                    <span className="font-medium">8.2/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Concentration Risk</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Currency Exposure</span>
                    <span className="font-medium">7 currencies</span>
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

function LiquidityProviderPortfolioSummary() {
  const portfolioData = {
    totalValue: 1247800,
    monthlyReturn: 8.2,
    activeInvestments: 18,
    totalExposure: 890000,
    averageROI: 12.4,
    riskScore: 3.2,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio Summary</h1>
          <p className="text-muted-foreground">Overview of your investment portfolio</p>
        </div>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />+{portfolioData.monthlyReturn}% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.activeInvestments}</div>
            <p className="text-xs text-muted-foreground">
              ${portfolioData.totalExposure.toLocaleString()} total exposure
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.averageROI}%</div>
            <p className="text-xs text-muted-foreground">Above target of 10%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{portfolioData.riskScore}</div>
            <p className="text-xs text-muted-foreground">Low risk portfolio</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
