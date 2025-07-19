"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react"

interface FinancialDocument {
  id: string
  name: string
  type: "balance_sheet" | "income_statement" | "cash_flow" | "tax_return" | "bank_statement" | "audit_report"
  period: string
  uploadDate: string
  status: "pending" | "verified" | "rejected" | "processing"
  size: string
  currency?: string
  keyMetrics?: {
    revenue?: number
    profit?: number
    assets?: number
    liabilities?: number
  }
}

const mockDocuments: FinancialDocument[] = [
  {
    id: "1",
    name: "Balance_Sheet_Q4_2023.pdf",
    type: "balance_sheet",
    period: "Q4 2023",
    uploadDate: "2024-01-15",
    status: "verified",
    size: "2.4 MB",
    currency: "USD",
    keyMetrics: {
      assets: 2500000,
      liabilities: 1200000,
    },
  },
  {
    id: "2",
    name: "Income_Statement_2023.pdf",
    type: "income_statement",
    period: "2023",
    uploadDate: "2024-01-16",
    status: "processing",
    size: "1.8 MB",
    currency: "USD",
    keyMetrics: {
      revenue: 5200000,
      profit: 650000,
    },
  },
  {
    id: "3",
    name: "Cash_Flow_Statement_2023.pdf",
    type: "cash_flow",
    period: "2023",
    uploadDate: "2024-01-14",
    status: "rejected",
    size: "1.5 MB",
    currency: "USD",
  },
]

const documentTypes = [
  { id: "balance_sheet", name: "Balance Sheet", required: true, description: "Statement of financial position" },
  { id: "income_statement", name: "Income Statement", required: true, description: "Profit and loss statement" },
  { id: "cash_flow", name: "Cash Flow Statement", required: true, description: "Statement of cash flows" },
  { id: "tax_return", name: "Tax Return", required: false, description: "Annual tax filing documents" },
  { id: "bank_statement", name: "Bank Statement", required: false, description: "Recent bank account statements" },
  { id: "audit_report", name: "Audit Report", required: false, description: "Independent auditor's report" },
]

export function UploadFinancialsInterface() {
  const [documents, setDocuments] = useState<FinancialDocument[]>(mockDocuments)
  const [selectedPeriod, setSelectedPeriod] = useState("2023")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "balance_sheet":
        return <DollarSign className="h-5 w-5 text-blue-500" />
      case "income_statement":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "cash_flow":
        return <Calendar className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const handleFileUpload = (type: string) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const completionRate =
    (documents.filter((d) => d.status === "verified").length / documentTypes.filter((t) => t.required).length) * 100

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Financial Documents</h1>
          <p className="text-muted-foreground">Upload your financial statements for credit assessment</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {documents.filter((d) => d.status === "verified").length} / {documentTypes.filter((t) => t.required).length}{" "}
            Required
          </Badge>
          <Badge className={completionRate === 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
            {Math.round(completionRate)}% Complete
          </Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Upload Progress
          </CardTitle>
          <CardDescription>Complete all required documents to proceed with credit assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {documents.filter((d) => d.status === "verified").length}
                </div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {documents.filter((d) => d.status === "processing").length}
                </div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {documents.filter((d) => d.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {documents.filter((d) => d.status === "rejected").length}
                </div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="manage">Manage Documents</TabsTrigger>
          <TabsTrigger value="analysis">Financial Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Upload Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Document Settings</CardTitle>
              <CardDescription>Configure document details before uploading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period">Financial Period</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="Q4_2023">Q4 2023</SelectItem>
                      <SelectItem value="Q3_2023">Q3 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Document Format</Label>
                  <div className="text-sm text-muted-foreground">Supported: PDF, Excel, CSV (Max 10MB)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((docType) => {
              const existingDoc = documents.find((d) => d.type === docType.id)
              return (
                <Card key={docType.id} className={`${docType.required ? "border-primary/50" : ""}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(docType.id)}
                        {docType.name}
                      </div>
                      {docType.required && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{docType.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {existingDoc ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{existingDoc.name}</span>
                          {getStatusBadge(existingDoc.status)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Period: {existingDoc.period} • Size: {existingDoc.size}
                        </div>
                        {existingDoc.keyMetrics && (
                          <div className="space-y-1 text-xs">
                            {existingDoc.keyMetrics.revenue && (
                              <div className="flex justify-between">
                                <span>Revenue:</span>
                                <span className="font-medium">${existingDoc.keyMetrics.revenue.toLocaleString()}</span>
                              </div>
                            )}
                            {existingDoc.keyMetrics.assets && (
                              <div className="flex justify-between">
                                <span>Assets:</span>
                                <span className="font-medium">${existingDoc.keyMetrics.assets.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Drop {docType.name.toLowerCase()} here</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileUpload(docType.id)}
                            disabled={isUploading}
                          >
                            Choose File
                          </Button>
                        </div>
                        {isUploading && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-1" />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>Manage your financial documents and their verification status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(doc.type)}
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {documentTypes.find((t) => t.id === doc.type)?.name} • {doc.period} • {doc.size}
                        </p>
                        <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
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
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Key metrics extracted from uploaded documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Total Revenue (2023)</span>
                    <span className="text-lg font-bold text-green-600">$5.2M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Net Profit (2023)</span>
                    <span className="text-lg font-bold text-green-600">$650K</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Total Assets</span>
                    <span className="text-lg font-bold text-blue-600">$2.5M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Total Liabilities</span>
                    <span className="text-lg font-bold text-red-600">$1.2M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Ratios</CardTitle>
                <CardDescription>Calculated financial health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Profit Margin</span>
                      <span className="font-medium">12.5%</span>
                    </div>
                    <Progress value={12.5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Debt-to-Equity Ratio</span>
                      <span className="font-medium">0.48</span>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Ratio</span>
                      <span className="font-medium">2.1</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>ROA (Return on Assets)</span>
                      <span className="font-medium">26%</span>
                    </div>
                    <Progress value={26} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Credit Assessment Impact</CardTitle>
              <CardDescription>How your financial documents affect your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">+45</div>
                  <div className="text-sm text-muted-foreground">Credit Score Impact</div>
                  <div className="text-xs text-muted-foreground mt-1">Strong financials</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">A-</div>
                  <div className="text-sm text-muted-foreground">Credit Rating</div>
                  <div className="text-xs text-muted-foreground mt-1">Excellent</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">$500K</div>
                  <div className="text-sm text-muted-foreground">Credit Limit</div>
                  <div className="text-xs text-muted-foreground mt-1">Recommended</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
