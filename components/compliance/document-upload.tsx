"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, CheckCircle, AlertCircle, Eye, Download, Trash2 } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  status: "pending" | "approved" | "rejected"
  uploadDate: string
  size: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Certificate_of_Incorporation.pdf",
    type: "Business Registration",
    status: "approved",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Tax_Certificate_2024.pdf",
    type: "Tax Documentation",
    status: "pending",
    uploadDate: "2024-01-16",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Financial_Statements_Q4.pdf",
    type: "Financial Records",
    status: "rejected",
    uploadDate: "2024-01-14",
    size: "3.2 MB",
  },
]

export function DocumentUploadInterface() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [uploadProgress, setUploadProgress] = useState(0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
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
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const documentCategories = [
    {
      id: "business",
      name: "Business Documents",
      required: ["Certificate of Incorporation", "Business License", "Tax Certificate"],
      optional: ["Articles of Association", "Memorandum of Association"],
    },
    {
      id: "financial",
      name: "Financial Documents",
      required: ["Financial Statements", "Bank Statements", "Audit Reports"],
      optional: ["Cash Flow Statements", "Balance Sheets"],
    },
    {
      id: "compliance",
      name: "Compliance Documents",
      required: ["AML Policy", "KYC Documentation", "Regulatory Licenses"],
      optional: ["Internal Policies", "Compliance Certificates"],
    },
    {
      id: "trade",
      name: "Trade Documents",
      required: ["Trade License", "Import/Export License"],
      optional: ["Previous Trade Records", "References"],
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Upload Center</h1>
          <p className="text-muted-foreground">Upload and manage your compliance documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {documents.filter((d) => d.status === "approved").length} / {documents.length} Approved
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="manage">Manage Documents</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Upload</CardTitle>
              <CardDescription>Drag and drop files or click to browse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop files here or click to upload</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                </p>
                <Button>Choose Files</Button>
              </div>

              {uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Uploading...</span>
                    <span className="text-sm">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>Upload required documents for this category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Required Documents</h4>
                    {category.required.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded mb-1">
                        <span className="text-sm">{doc}</span>
                        <Button variant="outline" size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Optional Documents</h4>
                    {category.optional.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded mb-1">
                        <span className="text-sm text-muted-foreground">{doc}</span>
                        <Button variant="ghost" size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>View and manage your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                        </p>
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

        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Requirements</CardTitle>
              <CardDescription>Complete guide to required documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {documentCategories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-red-600">Required Documents</h4>
                        <ul className="space-y-1">
                          {category.required.map((doc, index) => (
                            <li key={index} className="text-sm flex items-center gap-2">
                              <AlertCircle className="h-3 w-3 text-red-500" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-blue-600">Optional Documents</h4>
                        <ul className="space-y-1">
                          {category.optional.map((doc, index) => (
                            <li key={index} className="text-sm flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-blue-500" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
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
