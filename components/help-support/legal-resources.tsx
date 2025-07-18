"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Download, Eye, Search, FileText, Scale, Shield, Globe } from "lucide-react"

interface LegalDocument {
  id: string
  title: string
  category: "terms" | "privacy" | "compliance" | "contracts" | "regulations"
  description: string
  lastUpdated: string
  version: string
  fileSize: string
  language: string
  mandatory: boolean
}

export function LegalResourcesInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const [documents] = useState<LegalDocument[]>([
    {
      id: "DOC-001",
      title: "Terms of Service",
      category: "terms",
      description: "Complete terms and conditions for using the $SRC Ecosystem platform",
      lastUpdated: "2024-01-15",
      version: "v2.1",
      fileSize: "245 KB",
      language: "English",
      mandatory: true,
    },
    {
      id: "DOC-002",
      title: "Privacy Policy",
      category: "privacy",
      description: "How we collect, use, and protect your personal and business data",
      lastUpdated: "2024-01-10",
      version: "v1.8",
      fileSize: "189 KB",
      language: "English",
      mandatory: true,
    },
    {
      id: "DOC-003",
      title: "AML/KYC Compliance Guide",
      category: "compliance",
      description: "Anti-Money Laundering and Know Your Customer compliance requirements",
      lastUpdated: "2024-01-12",
      version: "v3.2",
      fileSize: "567 KB",
      language: "English",
      mandatory: true,
    },
    {
      id: "DOC-004",
      title: "Trade Finance Agreement Template",
      category: "contracts",
      description: "Standard template for trade finance agreements and contracts",
      lastUpdated: "2024-01-08",
      version: "v1.5",
      fileSize: "423 KB",
      language: "English",
      mandatory: false,
    },
    {
      id: "DOC-005",
      title: "International Trade Regulations",
      category: "regulations",
      description: "Overview of international trade laws and regulatory requirements",
      lastUpdated: "2024-01-05",
      version: "v2.0",
      fileSize: "892 KB",
      language: "English",
      mandatory: false,
    },
    {
      id: "DOC-006",
      title: "Smart Contract Terms",
      category: "contracts",
      description: "Legal framework for blockchain-based smart contracts in trade finance",
      lastUpdated: "2024-01-14",
      version: "v1.3",
      fileSize: "334 KB",
      language: "English",
      mandatory: false,
    },
    {
      id: "DOC-007",
      title: "Data Protection Guidelines",
      category: "privacy",
      description: "GDPR and international data protection compliance guidelines",
      lastUpdated: "2024-01-11",
      version: "v2.4",
      fileSize: "278 KB",
      language: "English",
      mandatory: true,
    },
    {
      id: "DOC-008",
      title: "Sanctions Compliance Manual",
      category: "compliance",
      description: "Comprehensive guide to international sanctions compliance",
      lastUpdated: "2024-01-16",
      version: "v1.9",
      fileSize: "645 KB",
      language: "English",
      mandatory: true,
    },
  ])

  const categories = [
    { id: "all", name: "All Documents", icon: FileText },
    { id: "terms", name: "Terms & Conditions", icon: Scale },
    { id: "privacy", name: "Privacy & Data", icon: Shield },
    { id: "compliance", name: "Compliance", icon: Shield },
    { id: "contracts", name: "Contracts", icon: FileText },
    { id: "regulations", name: "Regulations", icon: Globe },
  ]

  const getCategoryBadge = (category: string) => {
    const colors = {
      terms: "bg-blue-100 text-blue-800 border-blue-200",
      privacy: "bg-green-100 text-green-800 border-green-200",
      compliance: "bg-red-100 text-red-800 border-red-200",
      contracts: "bg-purple-100 text-purple-800 border-purple-200",
      regulations: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const mandatoryDocs = documents.filter((doc) => doc.mandatory)
  const recentlyUpdated = documents
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Legal Resources</h1>
          <p className="text-muted-foreground">Access legal documents, compliance guides, and regulatory information</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {documents.length} documents available
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{mandatoryDocs.length}</div>
            <p className="text-sm text-muted-foreground">Mandatory Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {documents.filter((d) => d.category === "compliance").length}
            </div>
            <p className="text-sm text-muted-foreground">Compliance Guides</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {documents.filter((d) => d.category === "contracts").length}
            </div>
            <p className="text-sm text-muted-foreground">Contract Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{recentlyUpdated.length}</div>
            <p className="text-sm text-muted-foreground">Recently Updated</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Documents</TabsTrigger>
          <TabsTrigger value="mandatory">Mandatory Reading</TabsTrigger>
          <TabsTrigger value="updates">Recent Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <category.icon className="h-4 w-4" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{document.title}</h3>
                          <Badge className={getCategoryBadge(document.category)}>
                            {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
                          </Badge>
                          {document.mandatory && (
                            <Badge className="bg-red-100 text-red-800 border-red-200">Mandatory</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{document.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Version {document.version}</span>
                          <span>Updated: {document.lastUpdated}</span>
                          <span>Size: {document.fileSize}</span>
                          <span>Language: {document.language}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No documents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse different categories.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="mandatory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Mandatory Legal Documents
              </CardTitle>
              <CardDescription>These documents must be read and acknowledged before using the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mandatoryDocs.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{document.title}</h4>
                        <p className="text-sm text-muted-foreground">{document.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Version {document.version} • Updated {document.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800 border-red-200">Required</Badge>
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Read & Acknowledge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Updates
              </CardTitle>
              <CardDescription>Latest changes to legal documents and policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentlyUpdated.map((document) => (
                  <div key={document.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{document.title}</h4>
                        <Badge className={getCategoryBadge(document.category)}>
                          {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{document.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Updated to version {document.version}</span>
                        <span>{document.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Changes
                      </Button>
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
