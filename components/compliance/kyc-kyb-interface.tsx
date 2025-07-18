"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, AlertTriangle, User, Building, FileText, Eye, Edit, Save, X } from "lucide-react"

interface KYCData {
  personalInfo: {
    firstName: string
    lastName: string
    dateOfBirth: string
    nationality: string
    idNumber: string
    phoneNumber: string
    email: string
    address: string
  }
  verification: {
    idDocument: string
    proofOfAddress: string
    selfie: string
  }
  status: "pending" | "verified" | "rejected" | "incomplete"
}

interface KYBData {
  companyInfo: {
    companyName: string
    registrationNumber: string
    incorporationDate: string
    jurisdiction: string
    businessType: string
    industry: string
    website: string
    phoneNumber: string
    registeredAddress: string
  }
  documents: {
    certificateOfIncorporation: string
    articlesOfAssociation: string
    proofOfAddress: string
    directorsList: string
  }
  beneficialOwners: Array<{
    name: string
    percentage: number
    verified: boolean
  }>
  status: "pending" | "verified" | "rejected" | "incomplete"
}

export function KYCKYBInterface() {
  const [activeTab, setActiveTab] = useState("kyc")
  const [isEditing, setIsEditing] = useState(false)

  const [kycData, setKycData] = useState<KYCData>({
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1985-06-15",
      nationality: "United States",
      idNumber: "123-45-6789",
      phoneNumber: "+1-555-0123",
      email: "john.doe@example.com",
      address: "123 Main St, New York, NY 10001",
    },
    verification: {
      idDocument: "passport_uploaded.pdf",
      proofOfAddress: "utility_bill.pdf",
      selfie: "selfie_verification.jpg",
    },
    status: "verified",
  })

  const [kybData, setKybData] = useState<KYBData>({
    companyInfo: {
      companyName: "TechCorp Imports Ltd",
      registrationNumber: "TC123456789",
      incorporationDate: "2018-03-15",
      jurisdiction: "Delaware, USA",
      businessType: "Private Limited Company",
      industry: "Import/Export",
      website: "https://techcorpimports.com",
      phoneNumber: "+1-555-0199",
      registeredAddress: "456 Business Ave, Delaware, DE 19901",
    },
    documents: {
      certificateOfIncorporation: "certificate_inc.pdf",
      articlesOfAssociation: "articles_assoc.pdf",
      proofOfAddress: "business_address_proof.pdf",
      directorsList: "directors_list.pdf",
    },
    beneficialOwners: [
      { name: "John Doe", percentage: 65, verified: true },
      { name: "Jane Smith", percentage: 35, verified: true },
    ],
    status: "verified",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
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
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Incomplete
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">KYC & KYB Verification</h1>
          <p className="text-muted-foreground">Complete your identity and business verification</p>
        </div>
        <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Information
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="kyc" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            KYC (Individual)
          </TabsTrigger>
          <TabsTrigger value="kyb" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            KYB (Business)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kyc" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Your personal details for identity verification</CardDescription>
                </div>
                {getStatusBadge(kycData.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={kycData.personalInfo.firstName}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={kycData.personalInfo.lastName}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={kycData.personalInfo.dateOfBirth}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder={kycData.personalInfo.nationality} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    value={kycData.personalInfo.idNumber}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={kycData.personalInfo.phoneNumber}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={kycData.personalInfo.address}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Document Verification
              </CardTitle>
              <CardDescription>Upload required documents for identity verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>ID Document</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{kycData.verification.idDocument}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Proof of Address</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{kycData.verification.proofOfAddress}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Selfie Verification</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{kycData.verification.selfie}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyb" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Company Information
                  </CardTitle>
                  <CardDescription>Business details for company verification</CardDescription>
                </div>
                {getStatusBadge(kybData.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={kybData.companyInfo.companyName}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={kybData.companyInfo.registrationNumber}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incorporationDate">Incorporation Date</Label>
                  <Input
                    id="incorporationDate"
                    type="date"
                    value={kybData.companyInfo.incorporationDate}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    value={kybData.companyInfo.jurisdiction}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder={kybData.companyInfo.businessType} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llc">Limited Liability Company</SelectItem>
                      <SelectItem value="corp">Corporation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole">Sole Proprietorship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder={kybData.companyInfo.industry} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import-export">Import/Export</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registeredAddress">Registered Address</Label>
                <Textarea
                  id="registeredAddress"
                  value={kybData.companyInfo.registeredAddress}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Business Documents
              </CardTitle>
              <CardDescription>Required corporate documents for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certificate of Incorporation</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{kybData.documents.certificateOfIncorporation}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Articles of Association</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{kybData.documents.articlesOfAssociation}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Proof of Business Address</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{kybData.documents.proofOfAddress}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Directors List</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{kybData.documents.directorsList}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Beneficial Owners
              </CardTitle>
              <CardDescription>Individuals who own 25% or more of the company</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {kybData.beneficialOwners.map((owner, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{owner.name}</p>
                        <p className="text-sm text-muted-foreground">{owner.percentage}% ownership</p>
                      </div>
                    </div>
                    {owner.verified ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
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
