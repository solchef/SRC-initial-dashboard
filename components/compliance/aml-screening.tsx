"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Search, Shield, Eye, RefreshCw } from "lucide-react"

interface ScreeningResult {
  id: string
  entity: string
  type: "individual" | "business"
  riskLevel: "low" | "medium" | "high"
  matches: number
  lastScreened: string
  status: "clear" | "flagged" | "under_review"
}

const mockScreeningResults: ScreeningResult[] = [
  {
    id: "1",
    entity: "John Smith",
    type: "individual",
    riskLevel: "low",
    matches: 0,
    lastScreened: "2024-01-16",
    status: "clear",
  },
  {
    id: "2",
    entity: "Global Trading Corp",
    type: "business",
    riskLevel: "medium",
    matches: 2,
    lastScreened: "2024-01-15",
    status: "under_review",
  },
  {
    id: "3",
    entity: "Ahmed Hassan",
    type: "individual",
    riskLevel: "high",
    matches: 5,
    lastScreened: "2024-01-14",
    status: "flagged",
  },
]

export function AMLScreeningInterface() {
  const [screeningResults, setScreeningResults] = useState<ScreeningResult[]>(mockScreeningResults)
  const [searchTerm, setSearchTerm] = useState("")
  const [isScreening, setIsScreening] = useState(false)

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "clear":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Clear
          </Badge>
        )
      case "flagged":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Flagged
          </Badge>
        )
      case "under_review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Eye className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleScreening = () => {
    setIsScreening(true)
    // Simulate screening process
    setTimeout(() => {
      setIsScreening(false)
    }, 3000)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AML Screening</h1>
          <p className="text-muted-foreground">Anti-Money Laundering compliance screening</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50">
            <Shield className="h-3 w-3 mr-1" />
            Compliance Active
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="screening" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="screening">New Screening</TabsTrigger>
          <TabsTrigger value="results">Screening Results</TabsTrigger>
          <TabsTrigger value="watchlists">Watchlists</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="screening" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Individual Screening
                </CardTitle>
                <CardDescription>Screen individuals against global watchlists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" placeholder="Enter nationality" />
                </div>
                <Button className="w-full" onClick={handleScreening} disabled={isScreening}>
                  {isScreening ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Screening...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Start Individual Screening
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Business Screening
                </CardTitle>
                <CardDescription>Screen businesses and organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input id="registrationNumber" placeholder="Enter registration number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country of Incorporation</Label>
                  <Input id="country" placeholder="Enter country" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="Enter industry" />
                </div>
                <Button className="w-full" onClick={handleScreening} disabled={isScreening}>
                  {isScreening ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Screening...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Start Business Screening
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {isScreening && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <h3 className="text-lg font-medium">Screening in Progress</h3>
                  <p className="text-muted-foreground">
                    Checking against global sanctions lists, PEP databases, and adverse media...
                  </p>
                  <Progress value={66} className="w-full max-w-md mx-auto" />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Screening Results</CardTitle>
              <CardDescription>View and manage screening results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search results..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                <div className="space-y-3">
                  {screeningResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {result.type === "individual" ? "👤" : "🏢"}
                        </div>
                        <div>
                          <h3 className="font-medium">{result.entity}</h3>
                          <p className="text-sm text-muted-foreground">
                            {result.type === "individual" ? "Individual" : "Business"} • Last screened:{" "}
                            {result.lastScreened}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRiskBadge(result.riskLevel)}
                        {getStatusBadge(result.status)}
                        <Badge variant="outline">{result.matches} matches</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlists" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "OFAC SDN List", status: "active", lastUpdate: "2024-01-16", entries: "12,456" },
              { name: "UN Sanctions List", status: "active", lastUpdate: "2024-01-15", entries: "8,234" },
              { name: "EU Sanctions List", status: "active", lastUpdate: "2024-01-14", entries: "5,678" },
              { name: "PEP Database", status: "active", lastUpdate: "2024-01-13", entries: "45,123" },
              { name: "Adverse Media", status: "active", lastUpdate: "2024-01-16", entries: "234,567" },
              { name: "Internal Watchlist", status: "active", lastUpdate: "2024-01-16", entries: "89" },
            ].map((watchlist, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{watchlist.name}</CardTitle>
                  <CardDescription>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {watchlist.status}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Entries:</span>
                      <span className="font-medium">{watchlist.entries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Update:</span>
                      <span className="font-medium">{watchlist.lastUpdate}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Update List
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Generate and download compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Available Reports</h3>
                  {[
                    "Monthly Screening Summary",
                    "High-Risk Entities Report",
                    "Watchlist Match Report",
                    "Compliance Audit Trail",
                    "False Positive Analysis",
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{report}</span>
                      <Button variant="outline" size="sm">
                        Generate
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Recent Reports</h3>
                  {[
                    { name: "January_2024_Screening_Report.pdf", date: "2024-01-16", size: "2.4 MB" },
                    { name: "High_Risk_Entities_Q4_2023.pdf", date: "2024-01-01", size: "1.8 MB" },
                    { name: "Compliance_Audit_December.pdf", date: "2023-12-31", size: "3.2 MB" },
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.date} • {report.size}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
