"use client"

import { useUserRole } from "@/hooks/use-user-role"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export function DashboardContent() {
  const { role } = useUserRole()

  const getRoleSpecificContent = () => {
    switch (role) {
      case "importer":
        return {
          title: "Importer Dashboard",
          description: "Manage your import operations and trade finance",
          stats: [
            { label: "Active Imports", value: "12", trend: "+2" },
            { label: "Pending L/Cs", value: "5", trend: "0" },
            { label: "Total Value", value: "$2.4M", trend: "+15%" },
          ],
          alerts: [
            "Document review required for Shipment #LC-2024-001",
            "Payment due in 3 days for Trade #TF-2024-045",
          ],
        }
      case "exporter":
        return {
          title: "Exporter Dashboard",
          description: "Track your export shipments and receivables",
          stats: [
            { label: "Active Exports", value: "8", trend: "+1" },
            { label: "Pending Payments", value: "$1.8M", trend: "-5%" },
            { label: "Shipped Orders", value: "24", trend: "+8" },
          ],
          alerts: ["Export license renewal due next month", "Quality inspection scheduled for tomorrow"],
        }
      case "bank":
        return {
          title: "Banking Dashboard",
          description: "Manage trade finance instruments and risk",
          stats: [
            { label: "Active L/Cs", value: "156", trend: "+12" },
            { label: "Risk Exposure", value: "$45M", trend: "-2%" },
            { label: "Compliance Score", value: "98%", trend: "+1%" },
          ],
          alerts: ["KYC review required for 3 clients", "Regulatory report due Friday"],
        }
      case "logistics":
        return {
          title: "Logistics Dashboard",
          description: "Monitor shipments and delivery schedules",
          stats: [
            { label: "In Transit", value: "89", trend: "+5" },
            { label: "On-Time Delivery", value: "94%", trend: "+2%" },
            { label: "Active Routes", value: "23", trend: "0" },
          ],
          alerts: ["Weather delay expected for Route #R-456", "Customs clearance pending for 2 shipments"],
        }
      default:
        return {
          title: "Dashboard",
          description: "Welcome to the trade finance platform",
          stats: [],
          alerts: [],
        }
    }
  }

  const content = getRoleSpecificContent()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {content.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.trend}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      {content.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Recent Alerts
            </CardTitle>
            <CardDescription>Important notifications requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {content.alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">{alert}</span>
                <Button variant="outline" size="sm">
                  View <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for your role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <CheckCircle className="mr-2 h-4 w-4" />
              New Trade
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <CheckCircle className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <CheckCircle className="mr-2 h-4 w-4" />
              Check Status
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <CheckCircle className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
