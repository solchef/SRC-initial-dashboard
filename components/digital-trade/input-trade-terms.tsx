"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, DollarSign, Truck, Shield, FileText, AlertTriangle, Save, Send, Eye } from "lucide-react"

interface TradeTermsData {
  // Payment Terms
  paymentMethod: string
  paymentTerms: string
  currency: string
  totalAmount: string
  advancePayment: string

  // Delivery Terms
  incoterms: string
  deliveryLocation: string
  deliveryDate: string
  shippingMethod: string

  // Quality & Inspection
  qualityStandards: string
  inspectionRequired: boolean
  inspectionLocation: string
  inspectionCertificate: string

  // Risk & Insurance
  riskAllocation: string
  insuranceRequired: boolean
  insuranceProvider: string
  coverageAmount: string

  // Legal & Compliance
  governingLaw: string
  disputeResolution: string
  complianceRequirements: string[]

  // Additional Terms
  forceMAjeure: boolean
  warranties: string[]
  additionalTerms: string
}

const initialData: TradeTermsData = {
  paymentMethod: "",
  paymentTerms: "",
  currency: "USD",
  totalAmount: "",
  advancePayment: "",
  incoterms: "",
  deliveryLocation: "",
  deliveryDate: "",
  shippingMethod: "",
  qualityStandards: "",
  inspectionRequired: false,
  inspectionLocation: "",
  inspectionCertificate: "",
  riskAllocation: "",
  insuranceRequired: false,
  insuranceProvider: "",
  coverageAmount: "",
  governingLaw: "",
  disputeResolution: "",
  complianceRequirements: [],
  forceMAjeure: false,
  warranties: [],
  additionalTerms: "",
}

export function InputTradeTermsInterface() {
  const [formData, setFormData] = useState<TradeTermsData>(initialData)
  const [currentSection, setCurrentSection] = useState("payment")
  const [completedSections, setCompletedSections] = useState<string[]>([])

  const sections = [
    { id: "payment", title: "Payment Terms", icon: DollarSign },
    { id: "delivery", title: "Delivery Terms", icon: Truck },
    { id: "quality", title: "Quality & Inspection", icon: CheckCircle },
    { id: "risk", title: "Risk & Insurance", icon: Shield },
    { id: "legal", title: "Legal & Compliance", icon: FileText },
    { id: "additional", title: "Additional Terms", icon: AlertTriangle },
  ]

  const calculateProgress = () => {
    return (completedSections.length / sections.length) * 100
  }

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId])
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleArrayUpdate = (field: string, value: string, checked: boolean) => {
    const currentArray = formData[field as keyof TradeTermsData] as string[]
    if (checked) {
      updateFormData(field, [...currentArray, value])
    } else {
      updateFormData(
        field,
        currentArray.filter((item) => item !== value),
      )
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Input Trade Terms</h1>
          <p className="text-muted-foreground">Configure comprehensive trade terms and conditions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Submit Terms
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Progress Overview
          </CardTitle>
          <CardDescription>Complete all sections to finalize trade terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Completion Progress</span>
              <span>
                {completedSections.length} of {sections.length} sections completed
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`p-3 border rounded-lg text-center cursor-pointer transition-colors ${
                    currentSection === section.id
                      ? "border-primary bg-primary/5"
                      : completedSections.includes(section.id)
                        ? "border-green-200 bg-green-50"
                        : "hover:bg-muted/50"
                  }`}
                  onClick={() => setCurrentSection(section.id)}
                >
                  <section.icon className="h-5 w-5 mx-auto mb-1" />
                  <p className="text-xs font-medium">{section.title}</p>
                  {completedSections.includes(section.id) && (
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentSection} onValueChange={setCurrentSection} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          {sections.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="text-xs">
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Payment Terms & Conditions
              </CardTitle>
              <CardDescription>Define payment methods, terms, and financial arrangements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => updateFormData("paymentMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lc">Letter of Credit (LC)</SelectItem>
                      <SelectItem value="tt">Telegraphic Transfer (TT)</SelectItem>
                      <SelectItem value="dp">Documents against Payment (DP)</SelectItem>
                      <SelectItem value="da">Documents against Acceptance (DA)</SelectItem>
                      <SelectItem value="oa">Open Account</SelectItem>
                      <SelectItem value="cash">Cash in Advance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select
                    value={formData.paymentTerms}
                    onValueChange={(value) => updateFormData("paymentTerms", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sight">At Sight</SelectItem>
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="60days">60 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                      <SelectItem value="120days">120 Days</SelectItem>
                      <SelectItem value="custom">Custom Terms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => updateFormData("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                      <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    placeholder="Enter total trade value"
                    value={formData.totalAmount}
                    onChange={(e) => updateFormData("totalAmount", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="advancePayment">Advance Payment (%)</Label>
                  <Input
                    id="advancePayment"
                    type="number"
                    placeholder="Enter advance payment percentage"
                    value={formData.advancePayment}
                    onChange={(e) => updateFormData("advancePayment", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => markSectionComplete("payment")}>Complete Payment Terms</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Delivery Terms & Logistics
              </CardTitle>
              <CardDescription>Define delivery conditions, locations, and shipping arrangements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="incoterms">Incoterms</Label>
                  <Select value={formData.incoterms} onValueChange={(value) => updateFormData("incoterms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Incoterms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exw">EXW - Ex Works</SelectItem>
                      <SelectItem value="fca">FCA - Free Carrier</SelectItem>
                      <SelectItem value="cpt">CPT - Carriage Paid To</SelectItem>
                      <SelectItem value="cip">CIP - Carriage and Insurance Paid To</SelectItem>
                      <SelectItem value="dap">DAP - Delivered at Place</SelectItem>
                      <SelectItem value="dpu">DPU - Delivered at Place Unloaded</SelectItem>
                      <SelectItem value="ddp">DDP - Delivered Duty Paid</SelectItem>
                      <SelectItem value="fas">FAS - Free Alongside Ship</SelectItem>
                      <SelectItem value="fob">FOB - Free on Board</SelectItem>
                      <SelectItem value="cfr">CFR - Cost and Freight</SelectItem>
                      <SelectItem value="cif">CIF - Cost, Insurance and Freight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryLocation">Delivery Location</Label>
                  <Input
                    id="deliveryLocation"
                    placeholder="Enter delivery address/port"
                    value={formData.deliveryLocation}
                    onChange={(e) => updateFormData("deliveryLocation", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => updateFormData("deliveryDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingMethod">Shipping Method</Label>
                  <Select
                    value={formData.shippingMethod}
                    onValueChange={(value) => updateFormData("shippingMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sea">Sea Freight</SelectItem>
                      <SelectItem value="air">Air Freight</SelectItem>
                      <SelectItem value="land">Land Transport</SelectItem>
                      <SelectItem value="multimodal">Multimodal Transport</SelectItem>
                      <SelectItem value="courier">Courier Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => markSectionComplete("delivery")}>Complete Delivery Terms</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Quality Standards & Inspection
              </CardTitle>
              <CardDescription>Define quality requirements and inspection procedures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qualityStandards">Quality Standards</Label>
                  <Textarea
                    id="qualityStandards"
                    placeholder="Describe quality standards, specifications, and requirements"
                    value={formData.qualityStandards}
                    onChange={(e) => updateFormData("qualityStandards", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inspectionRequired"
                    checked={formData.inspectionRequired}
                    onCheckedChange={(checked) => updateFormData("inspectionRequired", checked)}
                  />
                  <Label htmlFor="inspectionRequired">Pre-shipment inspection required</Label>
                </div>

                {formData.inspectionRequired && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-6">
                    <div className="space-y-2">
                      <Label htmlFor="inspectionLocation">Inspection Location</Label>
                      <Input
                        id="inspectionLocation"
                        placeholder="Enter inspection location"
                        value={formData.inspectionLocation}
                        onChange={(e) => updateFormData("inspectionLocation", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inspectionCertificate">Inspection Certificate</Label>
                      <Select
                        value={formData.inspectionCertificate}
                        onValueChange={(value) => updateFormData("inspectionCertificate", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select certificate type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sgs">SGS Certificate</SelectItem>
                          <SelectItem value="bv">Bureau Veritas</SelectItem>
                          <SelectItem value="intertek">Intertek</SelectItem>
                          <SelectItem value="tuv">TÜV Certificate</SelectItem>
                          <SelectItem value="custom">Custom Certificate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => markSectionComplete("quality")}>Complete Quality Terms</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Risk Allocation & Insurance
              </CardTitle>
              <CardDescription>Define risk allocation and insurance requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Risk Allocation</Label>
                  <RadioGroup
                    value={formData.riskAllocation}
                    onValueChange={(value) => updateFormData("riskAllocation", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyer" id="buyer" />
                      <Label htmlFor="buyer">Buyer assumes all risks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seller" id="seller" />
                      <Label htmlFor="seller">Seller assumes all risks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shared" id="shared" />
                      <Label htmlFor="shared">Shared risk allocation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="incoterms" id="incoterms" />
                      <Label htmlFor="incoterms">As per Incoterms</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insuranceRequired"
                    checked={formData.insuranceRequired}
                    onCheckedChange={(checked) => updateFormData("insuranceRequired", checked)}
                  />
                  <Label htmlFor="insuranceRequired">Trade insurance required</Label>
                </div>

                {formData.insuranceRequired && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-6">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        id="insuranceProvider"
                        placeholder="Enter insurance company name"
                        value={formData.insuranceProvider}
                        onChange={(e) => updateFormData("insuranceProvider", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverageAmount">Coverage Amount</Label>
                      <Input
                        id="coverageAmount"
                        type="number"
                        placeholder="Enter coverage amount"
                        value={formData.coverageAmount}
                        onChange={(e) => updateFormData("coverageAmount", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => markSectionComplete("risk")}>Complete Risk Terms</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Legal & Compliance Framework
              </CardTitle>
              <CardDescription>Define legal jurisdiction and compliance requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="governingLaw">Governing Law</Label>
                  <Select
                    value={formData.governingLaw}
                    onValueChange={(value) => updateFormData("governingLaw", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select governing law" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English Law</SelectItem>
                      <SelectItem value="singapore">Singapore Law</SelectItem>
                      <SelectItem value="newyork">New York Law</SelectItem>
                      <SelectItem value="swiss">Swiss Law</SelectItem>
                      <SelectItem value="hongkong">Hong Kong Law</SelectItem>
                      <SelectItem value="uae">UAE Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disputeResolution">Dispute Resolution</Label>
                  <Select
                    value={formData.disputeResolution}
                    onValueChange={(value) => updateFormData("disputeResolution", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dispute resolution method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arbitration">International Arbitration</SelectItem>
                      <SelectItem value="mediation">Mediation</SelectItem>
                      <SelectItem value="litigation">Court Litigation</SelectItem>
                      <SelectItem value="icc">ICC Arbitration</SelectItem>
                      <SelectItem value="siac">SIAC Arbitration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Compliance Requirements</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "AML/KYC Compliance",
                    "Export License Required",
                    "Import License Required",
                    "Sanctions Screening",
                    "OFAC Compliance",
                    "EU Sanctions Compliance",
                    "Environmental Compliance",
                    "Labor Standards Compliance",
                  ].map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-2">
                      <Checkbox
                        id={requirement}
                        checked={formData.complianceRequirements.includes(requirement)}
                        onCheckedChange={(checked) =>
                          handleArrayUpdate("complianceRequirements", requirement, checked as boolean)
                        }
                      />
                      <Label htmlFor={requirement} className="text-sm">
                        {requirement}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => markSectionComplete("legal")}>Complete Legal Terms</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Additional Terms & Warranties
              </CardTitle>
              <CardDescription>Define additional contractual terms and warranties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="forceMajeure"
                    checked={formData.forceMAjeure}
                    onCheckedChange={(checked) => updateFormData("forceMAjeure", checked)}
                  />
                  <Label htmlFor="forceMajeure">Include Force Majeure clause</Label>
                </div>

                <div className="space-y-2">
                  <Label>Warranties & Guarantees</Label>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      "Product Quality Warranty",
                      "Delivery Time Guarantee",
                      "Compliance Warranty",
                      "Title and Ownership Warranty",
                      "Non-Infringement Warranty",
                      "Performance Guarantee",
                    ].map((warranty) => (
                      <div key={warranty} className="flex items-center space-x-2">
                        <Checkbox
                          id={warranty}
                          checked={formData.warranties.includes(warranty)}
                          onCheckedChange={(checked) => handleArrayUpdate("warranties", warranty, checked as boolean)}
                        />
                        <Label htmlFor={warranty} className="text-sm">
                          {warranty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
                  <Textarea
                    id="additionalTerms"
                    placeholder="Enter any additional terms, conditions, or special provisions"
                    value={formData.additionalTerms}
                    onChange={(e) => updateFormData("additionalTerms", e.target.value)}
                    rows={6}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => markSectionComplete("additional")}>Complete Additional Terms</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {completedSections.length === sections.length && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">All Sections Completed!</h3>
                <p className="text-green-700">Your trade terms are ready for review and submission.</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Trade Terms
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
