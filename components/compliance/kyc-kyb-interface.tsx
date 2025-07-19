"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, FileText, Building, User } from "lucide-react"

export function KYCKYBInterface() {
  const [kycProgress, setKycProgress] = useState(75)
  const [kybProgress, setKybProgress] = useState(60)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">KYC & KYB Verification</h1>
          <p className="text-muted-foreground">Complete your identity and business verification</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="kyc" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="kyc" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            KYC (Know Your Customer)
          </TabsTrigger>
          <TabsTrigger value="kyb" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            KYB (Know Your Business)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kyc" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Personal Information Verification
                <div className="flex items-center gap-2">
                  <Progress value={kycProgress} className="w-32" />
                  <span className="text-sm text-muted-foreground">{kycProgress}%</span>
                </div>
              </CardTitle>
              <CardDescription>Verify your personal identity information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input id="dateOfBirth" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Document Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="drivers_license">Driver's License</SelectItem>
                        <SelectItem value="national_id">National ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number *</Label>
                    <Input id="idNumber" placeholder="Enter ID number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea id="address" placeholder="Enter your full address" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Document Upload</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Upload ID Document (Front)</p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Upload ID Document (Back)</p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save & Continue</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyb" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Business Information Verification
                <div className="flex items-center gap-2">
                  <Progress value={kybProgress} className="w-32" />
                  <span className="text-sm text-muted-foreground">{kybProgress}%</span>
                </div>
              </CardTitle>
              <CardDescription>Verify your business information and documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" placeholder="Enter company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <Input id="registrationNumber" placeholder="Enter registration number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incorporationDate">Incorporation Date *</Label>
                    <Input id="incorporationDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="trading">Trading</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID *</Label>
                    <Input id="taxId" placeholder="Enter tax identification number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Business Address *</Label>
                    <Textarea id="businessAddress" placeholder="Enter business address" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Business Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Certificate of Incorporation</p>
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Business License</p>
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Tax Certificate</p>
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save & Continue</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
