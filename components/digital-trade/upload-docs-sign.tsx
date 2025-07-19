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
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Trash2,
  PenTool,
  Shield,
  Clock,
  User,
  Building,
} from "lucide-react"

interface TradeDocument {
  id: string
  name: string
  type: "invoice" | "bill_of_lading" | "packing_list" | "certificate" | "insurance" | "letter_of_credit"
  status: "uploaded" | "signed" | "verified" | "rejected"
  uploadDate: string
  signedBy?: string[]
  signedDate?: string
  size: string
  required: boolean
}

interface Signatory {
  id: string
  name: string
  email: string
  role: "buyer" | "seller" | "bank" | "insurer" | "inspector"
  status: "pending" | "signed" | "declined"
  signedDate?: string
}

const mockDocuments: TradeDocument[] = [
  {
    id: "1",
    name: "Commercial_Invoice_TRD001.pdf",
    type: "invoice",
    status: "signed",
    uploadDate: "2024-01-15",
    signedBy: ["John Smith", "Alice Johnson"],
    signedDate: "2024-01-16",
    size: "2.4 MB",
    required: true,
  },
  {
    id: "2",
    name: "Bill_of_Lading_TRD001.pdf",
    type: "bill_of_lading",
    status: "uploaded",
    uploadDate: "2024-01-16",
    size: "1.8 MB",
    required: true,
  },
  {
    id: "3",
    name: "Packing_List_TRD001.pdf",
    type: "packing_list",
    status: "verified",
    uploadDate: "2024-01-14",
    signedBy: ["John Smith"],
    signedDate: "2024-01-15",
    size: "1.2 MB",
    required: true,
  },
]

const mockSignatories: Signatory[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "seller",
    status: "signed",
    signedDate: "2024-01-16",
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "alice.johnson@buyer.com",
    role: "buyer",
    status: "signed",
    signedDate: "2024-01-16",
  },
  {
    id: "3",
    name: "Bank Representative",
    email: "trade@globalbank.com",
    role: "bank",
    status: "pending",
  },
]

const documentTypes = [
  { id: "invoice", name: "Commercial Invoice", required: true, description: "Detailed invoice for goods/services" },
  { id: "bill_of_lading", name: "Bill of Lading", required: true, description: "Shipping document" },
  { id: "packing_list", name: "Packing List", required: true, description: "Detailed list of packed items" },
  { id: "certificate", name: "Certificate of Origin", required: false, description: "Origin certification" },
  { id: "insurance", name: "Insurance Certificate", required: false, description: "Cargo insurance document" },
  { id: "letter_of_credit", name: "Letter of Credit", required: false, description: "Bank guarantee document" },
]

export function UploadDocsSignInterface() {
  const [documents, setDocuments] = useState<TradeDocument[]>(mockDocuments)
  const [signatories, setSignatories] = useState<Signatory[]>(mockSignatories)
  const [selectedDocument, setSelectedDocument] = useState<string>("")
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
      case "signed":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <PenTool className="h-3 w-3 mr-1" />
            Signed
          </Badge>
        )
      case "uploaded":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Upload className="h-3 w-3 mr-1" />
            Uploaded
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

  const getSignatoryStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
        return <Badge className="bg-green-100 text-green-800">Signed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "declined":
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "buyer":
      case "seller":
        return <User className="h-4 w-4" />
      case "bank":
      case "insurer":
        return <Building className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getDocumentIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-primary" />
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
    (documents.filter((d) => d.status === "verified" || d.status === "signed").length /
      documentTypes.filter((t) => t.required).length) *
    100

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Documents & Digital Signing</h1>
          <p className="text-muted-foreground">Upload trade documents and manage digital signatures</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {documents.filter((d) => d.status === "verified" || d.status === "signed").length} /{" "}
            {documentTypes.filter((t) => t.required).length} Complete
          </Badge>
          <Badge className={completionRate === 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
            {Math.round(completionRate)}% Ready
          </Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Document Processing Status
          </CardTitle>
          <CardDescription>Track document upload and signature completion</CardDescription>
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
                  {documents.filter((d) => d.status === "signed").length}
                </div>
                <div className="text-sm text-muted-foreground">Signed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {documents.filter((d) => d.status === "uploaded").length}
                </div>
                <div className="text-sm text-muted-foreground">Uploaded</div>
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

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="signatures">Signatures</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <div className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {getDocumentIcon(doc.type)}
                      <div>
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {documentTypes.find((t) => t.id === doc.type)?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded: {doc.uploadDate} • Size: {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(doc.status)}
                      {documentTypes.find((t) => t.id === doc.type)?.required && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>

                  {doc.signedBy && doc.signedBy.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Signed by:</p>
                      <div className="flex flex-wrap gap-2">
                        {doc.signedBy.map((signer, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                            {signer}
                          </Badge>
                        ))}
                      </div>
                      {doc.signedDate && (
                        <p className="text-xs text-muted-foreground mt-1">Signed on: {doc.signedDate}</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    {doc.status === "uploaded" && (
                      <Button size="sm">
                        <PenTool className="h-3 w-3 mr-1" />
                        Sign Document
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          {/* Document Upload Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((docType) => {
              const existingDoc = documents.find((d) => d.type === docType.id)
              return (
                <Card key={docType.id} className={`${docType.required ? "border-primary/50" : ""}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center gap-2">
                        {getDocumentIcon(docType.id)}
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
                          Size: {existingDoc.size} • Uploaded: {existingDoc.uploadDate}
                        </div>
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

        <TabsContent value="signatures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-primary" />
                Digital Signature Management
              </CardTitle>
              <CardDescription>Manage signatories and track signature status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {signatories.map((signatory) => (
                  <div key={signatory.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getRoleIcon(signatory.role)}
                      </div>
                      <div>
                        <h3 className="font-medium">{signatory.name}</h3>
                        <p className="text-sm text-muted-foreground">{signatory.email}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {signatory.role} •{" "}
                          {signatory.signedDate ? `Signed: ${signatory.signedDate}` : "Pending signature"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSignatoryStatusBadge(signatory.status)}
                      {signatory.status === "pending" && (
                        <Button size="sm">
                          <PenTool className="h-3 w-3 mr-1" />
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Signatory</CardTitle>
              <CardDescription>Add new parties who need to sign documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signatory-name">Name</Label>
                  <Input id="signatory-name" placeholder="Enter signatory name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatory-email">Email</Label>
                  <Input id="signatory-email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatory-role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="insurer">Insurer</SelectItem>
                      <SelectItem value="inspector">Inspector</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4">
                <User className="h-4 w-4 mr-2" />
                Add Signatory
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Document Verification
              </CardTitle>
              <CardDescription>Automated verification and compliance checks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {documents.filter((d) => d.status === "verified").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Verified Documents</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">
                      {documents.filter((d) => d.status === "uploaded").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Pending Verification</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">
                      {documents.filter((d) => d.status === "rejected").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Rejected Documents</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Verification Checklist</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Document authenticity verified</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Digital signatures validated</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Compliance checks in progress</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Final verification pending</span>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
