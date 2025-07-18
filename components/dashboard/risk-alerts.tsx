"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Shield,
  TrendingDown,
  TrendingUp,
  Globe,
  DollarSign,
  Eye,
  CheckCircle,
  X,
  Clock,
  BarChart3,
} from "lucide-react"

interface RiskAlert {
  id: string
  type: "political" | "credit" | "market" | "operational" | "compliance"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  affectedTrades: string[]
  region?: string
  impact: string
  recommendation: string
  timestamp: string
  status: "active" | "acknowledged" | "resolved"
  trend: "increasing" | "stable" | "decreasing"
}

export function RiskAlertsInterface() {
  const [alerts, setAlerts] = useState<RiskAlert[]>([
    {
      id: "RA-001",
      type: "political",
      severity: "high",
      title: "Political Instability - Region A",
      description: "Increased political tensions and potential trade disruptions in Eastern Europe",
      affectedTrades: ["TRD-001", "TRD-003", "TRD-007"],
      region: "Eastern Europe",
      impact: "Potential delays in shipments and increased insurance costs",
      recommendation: "Consider alternative shipping routes and review insurance coverage",
      timestamp: "2024-01-18T08:30:00Z",
      status: "active",
      trend: "increasing",
    },
    {
      id: "RA-002",
      type: "credit",
      severity: "medium",
      title: "Credit Rating Downgrade",
      description: "Pacific Traders credit rating downgraded from B+ to B-",
      affectedTrades: ["TRD-004"],
      impact: "Increased counterparty risk and potential financing cost increases",
      recommendation: "Review credit limits and consider additional collateral requirements",
      timestamp: "2024-01-17T14:20:00Z",
      status: "acknowledged",
      trend: "stable",
    },
    {
      id: "RA-003",
      type: "market",
      severity: "medium",
      title: "Currency Volatility Alert",
      description: "EUR/USD exchange rate showing high volatility (>2% daily moves)",
      affectedTrades: ["TRD-003", "TRD-005"],
      impact: "Potential FX losses on EUR-denominated trades",
      recommendation: "Consider hedging EUR exposure or adjusting pricing terms",
      timestamp: "2024-01-17T11:45:00Z",
      status: "active",
      trend: "increasing",
    },
    {
      id: "RA-004",
      type: "operational",
      severity: "low",
      title: "Port Congestion - Hamburg",
      description: "Increased congestion at Hamburg port causing delays",
      affectedTrades: ["TRD-003"],
      region: "Europe",
      impact: "Potential 3-5 day delays in cargo handling",
      recommendation: "Inform counterparties of potential delays and adjust timelines",
      timestamp: "2024-01-16T16:00:00Z",
      status: "resolved",
      trend: "decreasing",
    },
    {
      id: "RA-005",
      type: "compliance",
      severity: "critical",
      title: "Sanctions List Update",
      description: "New entities added to OFAC sanctions list affecting trade partners",
      affectedTrades: ["TRD-008"],
      impact: "Immediate trade suspension required for affected counterparties",
      recommendation: "Suspend all transactions and conduct immediate compliance review",
      timestamp: "2024-01-18T12:00:00Z",
      status: "active",
      trend: "stable",
    },
  ])

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-600 text-white border-red-600">Critical</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Active</Badge>
      case "acknowledged":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Acknowledged</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "stable":
        return <BarChart3 className="h-4 w-4 text-yellow-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "political":
        return <Globe className="h-5 w-5 text-red-500" />
      case "credit":
        return <DollarSign className="h-5 w-5 text-yellow-500" />
      case "market":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "operational":
        return <Shield className="h-5 w-5 text-orange-500" />
      case "compliance":
        return <AlertTriangle className="h-5 w-5 text-purple-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, status: "acknowledged" } : alert)))
  }

  const resolveAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, status: "resolved" } : alert)))
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getAlertStats = () => {
    return {
      critical: alerts.filter((a) => a.severity === "critical" && a.status === "active").length,
      high: alerts.filter((a) => a.severity === "high" && a.status === "active").length,
      medium: alerts.filter((a) => a.severity === "medium" && a.status === "active").length,
      low: alerts.filter((a) => a.severity === "low" && a.status === "active").length,
      total: alerts.filter((a) => a.status === "active").length,
    }
  }

  const stats = getAlertStats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Risk Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage risk factors affecting your trades</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{stats.total} active alerts</Badge>
          {stats.critical > 0 && (
            <Badge className="bg-red-600 text-white border-red-600">{stats.critical} critical</Badge>
          )}
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
            <p className="text-sm text-muted-foreground">Critical</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{stats.high}</div>
            <p className="text-sm text-muted-foreground">High</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{stats.medium}</div>
            <p className="text-sm text-muted-foreground">Medium</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.low}</div>
            <p className="text-sm text-muted-foreground">Low</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Active</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="acknowledged">Acknowledged</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
        </TabsList>

        {["active", "acknowledged", "resolved", "all"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {alerts
              .filter((alert) => status === "all" || alert.status === status)
              .map((alert) => (
                <Card key={alert.id} className={`${alert.severity === "critical" ? "border-red-500" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        {getTypeIcon(alert.type)}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{alert.title}</h3>
                            {getSeverityBadge(alert.severity)}
                            {getStatusBadge(alert.status)}
                            {getTrendIcon(alert.trend)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(alert.timestamp)}
                            </span>
                            <span className="capitalize">{alert.type} Risk</span>
                            {alert.region && <span>{alert.region}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {alert.status === "active" && (
                          <>
                            <Button variant="outline" size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Acknowledge
                            </Button>
                            <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                              <X className="h-4 w-4 mr-2" />
                              Resolve
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Impact</h4>
                        <p className="text-sm text-muted-foreground">{alert.impact}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">Recommendation</h4>
                        <p className="text-sm text-muted-foreground">{alert.recommendation}</p>
                      </div>
                    </div>

                    {alert.affectedTrades.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Affected Trades</h4>
                        <div className="flex flex-wrap gap-2">
                          {alert.affectedTrades.map((tradeId) => (
                            <Badge key={tradeId} variant="outline">
                              {tradeId}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
