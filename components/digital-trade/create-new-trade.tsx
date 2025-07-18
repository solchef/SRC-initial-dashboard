"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Zap, Building, MapPin, Package, CheckCircle, ArrowRight, Save, Eye } from "lucide-react"

interface TradeFormData {
  // Basic Information
  tradeType: string
  commodity: string
  quantity: string
  unitPrice: string
  totalValue: string
  currency: string

  // Parties
  buyer: string
  seller: string
  buyerAddress: string
  sellerAddress: string

  // Terms
  paymentTerms: string
  deliveryTerms: string
  deliveryDate: string
  paymentDate: string

  // Logistics
  originPort: string
  destinationPort: string
  shippingMethod: string

  // Additional
  description: string
  specialInstructions: string
}

export function CreateNewTradeInterface() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<TradeFormData>({
    tradeType: "",
    commodity: "",
    quantity: "",
    unitPrice: "",
    totalValue: "",
    currency: "USD",
    buyer: "",
    seller: "",
    buyerAddress: "",
    sellerAddress: "",
    paymentTerms: "",
    deliveryTerms: "",
    deliveryDate: "",
    paymentDate: "",
    originPort: "",
    destinationPort: "",
    shippingMethod: "",
    description: "",
    specialInstructions: "",
  })

  const steps = [
    { id: 1, title: "Basic Information", description: "Trade type and commodity details" },
    { id: 2, title: "Parties & Terms", description: "Buyer, seller, and trade terms" },
    { id: 3, title: "Logistics", description: "Shipping and delivery information" },
    { id: 4, title: "Review & Create", description: "Review and finalize trade" },
  ]

  const updateFormData = (field: keyof TradeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Auto-calculate total value
    if (field === "quantity" || field === "unitPrice") {
      const quantity = field === "quantity" ? Number.parseFloat(value) : Number.parseFloat(formData.quantity)
      const unitPrice = field === "unitPrice" ? Number.parseFloat(value) : Number.parseFloat(formData.unitPrice)
      if (!isNaN(quantity) && !isNaN(unitPrice)) {
        setFormData((prev) => ({ ...prev, totalValue: (quantity * unitPrice).toString() }))
      }
    }
  }

  const getStepProgress = () => {
    return (currentStep / steps.length) * 100
  }

  const isStepComplete = (stepId: number) => {
    switch (stepId) {
      case 1:
        return formData.tradeType && formData.commodity && formData.quantity && formData.unitPrice
      case 2:
        return formData.buyer && formData.seller && formData.paymentTerms && formData.deliveryTerms
      case 3:
        return formData.originPort && formData.destinationPort && formData.shippingMethod
      case 4:
        return true
      default:
        return false
    }
  }

  const canProceedToNext = () => {
    return isStepComplete(currentStep)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create New Trade</h1>
          <p className="text-muted-foreground">Set up a new trade transaction with digital documentation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
            <div className="grid grid-cols-4 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-center p-3 rounded-lg border ${
                    currentStep === step.id
                      ? "border-primary bg-primary/5"
                      : currentStep > step.id
                        ? "border-green-200 bg-green-50 dark:bg-green-950/20"
                        : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          currentStep === step.id ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step.id}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tradeType">Trade Type *</Label>
                  <Select value={formData.tradeType} onValueChange={(value) => updateFormData("tradeType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trade type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import">Import</SelectItem>
                      <SelectItem value="export">Export</SelectItem>
                      <SelectItem value="domestic">Domestic Trade</SelectItem>
                      <SelectItem value="transit">Transit Trade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity *</Label>
                  <Select value={formData.commodity} onValueChange={(value) => updateFormData("commodity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select commodity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="machinery">Machinery</SelectItem>
                      <SelectItem value="chemicals">Chemicals</SelectItem>
                      <SelectItem value="food">Food Products</SelectItem>
                      <SelectItem value="raw-materials">Raw Materials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={(e) => updateFormData("quantity", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="unitPrice"
                      placeholder="0.00"
                      value={formData.unitPrice}
                      onChange={(e) => updateFormData("unitPrice", e.target.value)}
                    />
                    <Select value={formData.currency} onValueChange={(value) => updateFormData("currency", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalValue">Total Value</Label>
                  <Input
                    id="totalValue"
                    placeholder="Auto-calculated"
                    value={formData.totalValue}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of goods..."
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building className="h-4 w-4" />
                      Buyer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="buyer">Buyer Name *</Label>
                      <Input
                        id="buyer"
                        placeholder="Company or individual name"
                        value={formData.buyer}
                        onChange={(e) => updateFormData("buyer", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buyerAddress">Buyer Address</Label>
                      <Textarea
                        id="buyerAddress"
                        placeholder="Full address..."
                        value={formData.buyerAddress}
                        onChange={(e) => updateFormData("buyerAddress", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building className="h-4 w-4" />
                      Seller Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="seller">Seller Name *</Label>
                      <Input
                        id="seller"
                        placeholder="Company or individual name"
                        value={formData.seller}
                        onChange={(e) => updateFormData("seller", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sellerAddress">Seller Address</Label>
                      <Textarea
                        id="sellerAddress"
                        placeholder="Full address..."
                        value={formData.sellerAddress}
                        onChange={(e) => updateFormData("sellerAddress", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms *</Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) => updateFormData("paymentTerms", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advance">Advance Payment</SelectItem>
                        <SelectItem value="lc">Letter of Credit</SelectItem>
                        <SelectItem value="net30">Net 30 Days</SelectItem>
                        <SelectItem value="net60">Net 60 Days</SelectItem>
                        <SelectItem value="cod">Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentDate">Payment Date</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={formData.paymentDate}
                      onChange={(e) => updateFormData("paymentDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryTerms">Delivery Terms *</Label>
                    <Select
                      value={formData.deliveryTerms}
                      onValueChange={(value) => updateFormData("deliveryTerms", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fob">FOB (Free on Board)</SelectItem>
                        <SelectItem value="cif">CIF (Cost, Insurance, Freight)</SelectItem>
                        <SelectItem value="exw">EXW (Ex Works)</SelectItem>
                        <SelectItem value="dap">DAP (Delivered at Place)</SelectItem>
                        <SelectItem value="ddp">DDP (Delivered Duty Paid)</SelectItem>
                      </SelectContent>
                    </Select>
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
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="originPort">Origin Port *</Label>
                    <Select value={formData.originPort} onValueChange={(value) => updateFormData("originPort", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select origin port" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shanghai">Shanghai, China</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                        <SelectItem value="rotterdam">Rotterdam, Netherlands</SelectItem>
                        <SelectItem value="losangeles">Los Angeles, USA</SelectItem>
                        <SelectItem value="hamburg">Hamburg, Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destinationPort">Destination Port *</Label>
                    <Select
                      value={formData.destinationPort}
                      onValueChange={(value) => updateFormData("destinationPort", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination port" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newyork">New York, USA</SelectItem>
                        <SelectItem value="london">London, UK</SelectItem>
                        <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                        <SelectItem value="dubai">Dubai, UAE</SelectItem>
                        <SelectItem value="mumbai">Mumbai, India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingMethod">Shipping Method *</Label>
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
                        <SelectItem value="multimodal">Multimodal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      placeholder="Any special handling or shipping instructions..."
                      value={formData.specialInstructions}
                      onChange={(e) => updateFormData("specialInstructions", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      Trade Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Trade Type:</span>
                      <span className="font-medium capitalize">{formData.tradeType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commodity:</span>
                      <span className="font-medium capitalize">{formData.commodity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span className="font-medium">{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <span className="font-bold text-primary">
                        {formData.totalValue} {formData.currency}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      Parties
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Buyer:</span>
                      <span className="font-medium">{formData.buyer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seller:</span>
                      <span className="font-medium">{formData.seller}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Terms:</span>
                      <span className="font-medium">{formData.paymentTerms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Terms:</span>
                      <span className="font-medium">{formData.deliveryTerms}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Logistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex justify-between">
                      <span>Origin:</span>
                      <span className="font-medium">{formData.originPort}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Destination:</span>
                      <span className="font-medium">{formData.destinationPort}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Method:</span>
                      <span className="font-medium">{formData.shippingMethod}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {currentStep < steps.length ? (
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              disabled={!canProceedToNext()}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Create Trade
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
