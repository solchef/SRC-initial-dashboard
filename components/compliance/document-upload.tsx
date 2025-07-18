"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Upload,
  FileText,
  ImageIcon,
  File,
  CheckCircle,
  Clock,
  X,
  Eye,
  Download,
  MoreHorizontal,
  Trash2,
  RefreshCw,
} from "lucide-react"

interface DocumentFile {
  id: string
  name: string
  type: string
  size: number
  category: string
  status: "uploaded" | "processing" | "verified" | "rejected"
  uploadDate: string
  expiryDate?: string
  rejectionReason?: string
}

const documentCategories = [
  { id: "identity", name: "Identity Documents", required: true },
  { id: "address", name: "Proof of Address", required: true },
  { id: "business", name: "Business Documents", required: true },
  { id: "financial", name: "Financial Statements", required: false },
  { id: "trade", name: "Trade Documents", required: false },
  { id: "other", name: "Other Documents", required: false },
]

export function DocumentUploadInterface() {
  const [documents, setDocuments] = useState<DocumentFile[]>([
    {
      id: "1",
      name: "passport_john_doe.pdf",
      type: "application/pdf",
      size: 2048000,
      category: "identity",
      status: "verified",
      uploadDate: "2024-01-15",
      expiryDate: "2029-06-15",
    },
    {
      id: "2",
      name: "utility_bill_january.pdf",
      type: "application/pdf",
      size: 1024000,
      category: "address",
      status: "verified",
      uploadDate: "2024-01-16",
    },
    {
      id: "3",
      name: "certificate_incorporation.pdf",
      type: "application/pdf",
      size: 3072000,
      category: "business",
      status: "processing",
      uploadDate: "2024-01-18",
    },
    {
      id: "4",
      name: "financial_statement_2023.pdf",
      type: "application/pdf",
      size: 5120000,
      category: "financial",
      status: "rejected",
      uploadDate: "2024-01-10",
      rejectionReason: "Document quality too low, please upload a clearer version",
    },
  ])

  const [dragActive, setDragActive] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("identity")

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newDocument: DocumentFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        category: selectedCategory,
        status: "uploaded",
        uploadDate: new Date().toISOString().split("T")[0],
      }
      setDocuments((prev) => [...prev, newDocument])
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <RefreshCw className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Uploaded
          </Badge>
        )
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />
    if (type.includes("image")) return <ImageIcon className="h-5 w-5 text-blue-500" />
    return <File className="h-5 w-5 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getCategoryProgress = (categoryId: string) => {
    const categoryDocs = documents.filter((doc) => doc.category === categoryId)
    const verifiedDocs = categoryDocs.filter((doc) => doc.status === "verified")
    return categoryDocs.length > 0 ? (verifiedDocs.length / categoryDocs.length) * 100 : 0
  }

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Upload</h1>
          <p className="text-muted-foreground">Upload and manage your verification documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {documents.filter((d) => d.status === "verified").length} / {documents.length} Verified
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="manage">Manage Documents</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload New Documents
              </CardTitle>
              <CardDescription>Drag and drop files or click to browse</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Document Category</Label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {documentCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} {cat.required && "(Required)"}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: PDF, JPG, PNG (Max 10MB per file)
                </p>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select Files
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{formatFileSize(doc.size)}</span>
                          <span>Uploaded: {doc.uploadDate}</span>
                          <span className="capitalize">{doc.category.replace("_", " ")}</span>
                          {doc.expiryDate && <span>Expires: {doc.expiryDate}</span>}
                        </div>
                        {doc.rejectionReason && <p className="text-sm text-red-600 mt-1">{doc.rejectionReason}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(doc.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => deleteDocument(doc.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    {category.required && <Badge variant="destructive">Required</Badge>}
                  </div>
                  <Progress value={getCategoryProgress(category.id)} className="h-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.id === "identity" && (
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Government-issued photo ID (Passport, Driver's License)</li>
                        <li>• Must be valid and not expired</li>
                        <li>• Clear, high-resolution image</li>
                      </ul>
                    )}
                    {category.id === "address" && (
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Utility bill (not older than 3 months)</li>
                        <li>• Bank statement</li>
                        <li>• Government correspondence</li>
                      </ul>
                    )}
                    {category.id === "business" && (
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Certificate of Incorporation</li>
                        <li>• Articles of Association</li>
                        <li>• Business registration documents</li>
                      </ul>
                    )}
                    {category.id === "financial" && (
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Annual financial statements</li>
                        <li>• Tax returns</li>
                        <li>• Bank statements (last 6 months)</li>
                      </ul>
                    )}
                    {category.id === "trade" && (
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Import/Export licenses</li>
                        <li>• Trade agreements</li>
                        <li>• Shipping documents</li>
                      </ul>
                    )}
                    {category.id === "other" && (
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Additional supporting documents</li>
                        <li>• Compliance certificates</li>
                        <li>• Reference letters</li>
                      </ul>
                    )}
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="font-medium">
                      {documents.filter((d) => d.category === category.id && d.status === "verified").length} verified
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      of {documents.filter((d) => d.category === category.id).length} uploaded
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
