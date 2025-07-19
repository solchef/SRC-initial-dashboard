"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, DollarSign, FileText, CheckCircle, Calculator, Globe, TrendingUp, Eye } from "lucide-react"

interface InsurancePolicy {
  id: string
  policyNumber: string
  type: "single_buyer" | "whole_turnover" | "key_account" | "excess_of_loss"
  status: "active" | "pending" | "expired" | "cancelled"
  coverage: number
  premium: number
  deductible: number
  startDate: string
  endDate: string
  insurer: string
  countries: string[]
  buyers: string[]
}

interface InsuranceQuote {
  id: string
  type: string
  coverage: number
  premium: number
  deductible: number
  validUntil: string
  insurer: string
  features: string[]
}

const mockPolicies: InsurancePolicy[] = [
  {
    id: "1",
    policyNumber: "TCI-2024-001",
    type: "whole_turnover",
    status: "active",
    coverage: 2000000,
    premium: 24000,
    deductible: 50000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    insurer: "Global Trade Insurance Ltd",
    countries: ["USA", "UK", "Germany", "Japan"],
    buyers: ["Global Electronics Ltd", "European Machinery", "Asian Textiles Co"],
  },
  {
    id: "2",
    policyNumber: "TCI-2023-045",
    type: "single_buyer",
    status: "expired",
    coverage: 500000,
    premium: 8500,
    deductible: 25000,
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    insurer: "Trade Credit Solutions",
    countries: ["USA"],
    buyers: ["American Trading Corp"],
  },
]

const mockQuotes: InsuranceQuote[] = [
  {
    id: "1",
    type: "Whole Turnover Policy",
    coverage: 3000000,
    premium: 32000,
    deductible: 75000,
    validUntil: "2024-02-15",
    insurer: "Global Trade Insurance Ltd",
    features: ["Worldwide coverage", "Political risk included", "24/7 claims support"],
  },
  {
    id: "2",
    type: "Key Account Policy",
    coverage: 1500000,
    premium: 18000,
    deductible: 40000,
    validUntil: "2024-02-10",
    insurer: "Trade Credit Solutions",
    features: ["Top 10 buyers covered", "Flexible terms", "Quick claims processing"],
  },
]

export function CreditInsuranceInterface() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>(mockPolicies)
  const [quotes, setQuotes] = useState<InsuranceQuote[]>(mockQuotes)
  const [applicationStep, setApplicationStep] = useState(1)
  const [applicationData, setApplicationData] = useState({
    companyName: "",
    industry: "",
    annualTurnover: "",
    coverageType: "",
    coverageAmount: "",
    countries: [],
    buyers: [],
    riskProfile: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPolicyTypeLabel = (type: string) => {
    switch (type) {
      case "single_buyer":
        return "Single Buyer Policy"
      case "whole_turnover":
        return "Whole Turnover Policy"
      case "key_account":
        return "Key Account Policy"
      case "excess_of_loss":
        return "Excess of Loss Policy"
      default:
        return type
    }
  }

  const totalCoverage = policies.filter((p) => p.status === "active").reduce((sum, p) => sum + p.coverage, 0)

  const totalPremium = policies.filter((p) => p.status === "active").reduce((sum, p) => sum + p.premium, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trade Credit Insurance</h1>
          <p className="text-muted-foreground">Protect your business against buyer default and political risks</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50">
            <Shield className="h-3 w-3 mr-1" />
            {policies.filter((p) => p.status === "active").length} Active Policies
          </Badge>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      {/* Coverage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coverage</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalCoverage / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              Across {policies.filter((p) => p.status === "active").length} active policies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Premium</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPremium.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalPremium / totalCoverage) * 100).toFixed(2)}% of coverage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claims Ratio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2.3%</div>
            <p className="text-xs text-muted-foreground">Below industry average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected Buyers</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Across 8 countries</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="policies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="policies">My Policies</TabsTrigger>
          <TabsTrigger value="quotes">Get Quotes</TabsTrigger>
          <TabsTrigger value="apply">Apply Now</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-6">
          <div className="space-y-4">
            {policies.map((policy) => (
              <Card key={policy.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{policy.policyNumber}</h3>
                        <p className="text-muted-foreground">{getPolicyTypeLabel(policy.type)}</p>
                        <p className="text-sm text-muted-foreground">{policy.insurer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(policy.status)}
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage Amount</p>
                      <p className="font-semibold">${policy.coverage.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Premium</p>
                      <p className="font-semibold">${policy.premium.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deductible</p>
                      <p className="font-semibold">${policy.deductible.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Policy Period</p>
                      <p className="font-semibold">
                        {policy.startDate} - {policy.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Covered Countries</p>
                      <div className="flex flex-wrap gap-1">
                        {policy.countries.map((country, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Protected Buyers</p>
                      <div className="flex flex-wrap gap-1">
                        {policy.buyers.slice(0, 3).map((buyer, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {buyer}
                          </Badge>
                        ))}
                        {policy.buyers.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{policy.buyers.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Get Insurance Quotes
              </CardTitle>
              <CardDescription>Compare quotes from multiple insurers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="coverage-type">Coverage Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whole_turnover">Whole Turnover</SelectItem>
                      <SelectItem value="single_buyer">Single Buyer</SelectItem>
                      <SelectItem value="key_account">Key Account</SelectItem>
                      <SelectItem value="excess_of_loss">Excess of Loss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverage-amount">Coverage Amount</Label>
                  <Input id="coverage-amount" placeholder="Enter amount" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="machinery">Machinery</SelectItem>
                      <SelectItem value="chemicals">Chemicals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Get Quotes
              </Button>
            </CardContent>
          </Card>

          {/* Available Quotes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Quotes</h3>
            {quotes.map((quote) => (
              <Card key={quote.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{quote.type}</h3>
                      <p className="text-muted-foreground">{quote.insurer}</p>
                      <p className="text-sm text-muted-foreground">Valid until: {quote.validUntil}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${quote.premium.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Annual Premium</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage</p>
                      <p className="font-semibold">${quote.coverage.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deductible</p>
                      <p className="font-semibold">${quote.deductible.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Premium Rate</p>
                      <p className="font-semibold">{((quote.premium / quote.coverage) * 100).toFixed(2)}%</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {quote.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apply" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Insurance Application
              </CardTitle>
              <CardDescription>Step {applicationStep} of 4 - Complete your insurance application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Progress value={(applicationStep / 4) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Company Info</span>
                  <span>Coverage Details</span>
                  <span>Risk Assessment</span>
                  <span>Review & Submit</span>
                </div>
              </div>

              {applicationStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name *</Label>
                      <Input
                        id="company-name"
                        placeholder="Enter company name"
                        value={applicationData.companyName}
                        onChange={(e) => setApplicationData({ ...applicationData, companyName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry *</Label>
                      <Select
                        value={applicationData.industry}
                        onValueChange={(value) => setApplicationData({ ...applicationData, industry: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="textiles">Textiles</SelectItem>
                          <SelectItem value="machinery">Machinery</SelectItem>
                          <SelectItem value="chemicals">Chemicals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="annual-turnover">Annual Turnover *</Label>
                      <Input
                        id="annual-turnover"
                        placeholder="Enter annual turnover"
                        type="number"
                        value={applicationData.annualTurnover}
                        onChange={(e) => setApplicationData({ ...applicationData, annualTurnover: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {applicationStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Coverage Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="coverage-type">Coverage Type *</Label>
                      <Select
                        value={applicationData.coverageType}
                        onValueChange={(value) => setApplicationData({ ...applicationData, coverageType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select coverage type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="whole_turnover">Whole Turnover Policy</SelectItem>
                          <SelectItem value="single_buyer">Single Buyer Policy</SelectItem>
                          <SelectItem value="key_account">Key Account Policy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coverage-amount">Coverage Amount *</Label>
                      <Input
                        id="coverage-amount"
                        placeholder="Enter coverage amount"
                        type="number"
                        value={applicationData.coverageAmount}
                        onChange={(e) => setApplicationData({ ...applicationData, coverageAmount: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {applicationStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Risk Assessment</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="risk-profile">Risk Profile</Label>
                      <Textarea
                        id="risk-profile"
                        placeholder="Describe your business risk profile, key customers, and markets"
                        value={applicationData.riskProfile}
                        onChange={(e) => setApplicationData({ ...applicationData, riskProfile: e.target.value })}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Additional Coverage Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="political-risk" />
                          <Label htmlFor="political-risk">Political Risk Coverage</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="currency-risk" />
                          <Label htmlFor="currency-risk">Currency Risk Coverage</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="pre-shipment" />
                          <Label htmlFor="pre-shipment">Pre-shipment Coverage</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {applicationStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Review & Submit</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Application Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Company:</span>
                          <span className="ml-2 font-medium">{applicationData.companyName}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Industry:</span>
                          <span className="ml-2 font-medium">{applicationData.industry}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Coverage Type:</span>
                          <span className="ml-2 font-medium">{applicationData.coverageType}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Coverage Amount:</span>
                          <span className="ml-2 font-medium">${applicationData.coverageAmount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the terms and conditions and privacy policy
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setApplicationStep(Math.max(1, applicationStep - 1))}
                  disabled={applicationStep === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (applicationStep < 4) {
                      setApplicationStep(applicationStep + 1)
                    } else {
                      // Submit application
                      console.log("Application submitted")
                    }
                  }}
                >
                  {applicationStep === 4 ? "Submit Application" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>File a Claim</CardTitle>
                <CardDescription>Report a buyer default or political risk event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="policy-select">Select Policy</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      {policies
                        .filter((p) => p.status === "active")
                        .map((policy) => (
                          <SelectItem key={policy.id} value={policy.id}>
                            {policy.policyNumber} - {getPolicyTypeLabel(policy.type)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="claim-type">Claim Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select claim type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer_default">Buyer Default</SelectItem>
                      <SelectItem value="political_risk">Political Risk</SelectItem>
                      <SelectItem value="currency_inconvertibility">Currency Inconvertibility</SelectItem>
                      <SelectItem value="contract_frustration">Contract Frustration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="claim-amount">Claim Amount</Label>
                  <Input id="claim-amount" placeholder="Enter claim amount" type="number" />
                </div>
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Start Claim Process
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claims History</CardTitle>
                <CardDescription>Your previous claims and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">CLM-2023-001</p>
                      <p className="text-sm text-muted-foreground">Buyer Default - $45,000</p>
                      <p className="text-xs text-muted-foreground">Filed: Dec 15, 2023</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Settled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">CLM-2023-002</p>
                      <p className="text-sm text-muted-foreground">Political Risk - $28,000</p>
                      <p className="text-xs text-muted-foreground">Filed: Nov 8, 2023</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
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
