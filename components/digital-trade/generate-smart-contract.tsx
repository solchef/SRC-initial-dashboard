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
import { Switch } from "@/components/ui/switch"
import { Code, Zap, CheckCircle, Eye, Copy, Shield, DollarSign, Calendar, Play } from "lucide-react"

interface SmartContract {
  id: string
  name: string
  type: "payment" | "delivery" | "escrow" | "insurance" | "compliance"
  status: "draft" | "generated" | "deployed" | "active" | "completed"
  blockchain: "ethereum" | "polygon" | "bsc" | "arbitrum"
  address?: string
  createdDate: string
  deployedDate?: string
  gasUsed?: number
  transactionHash?: string
}

interface ContractTemplate {
  id: string
  name: string
  type: string
  description: string
  parameters: string[]
  complexity: "simple" | "medium" | "complex"
  estimatedGas: number
}

const mockContracts: SmartContract[] = [
  {
    id: "1",
    name: "Trade Payment Contract TRD-001",
    type: "payment",
    status: "active",
    blockchain: "ethereum",
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    createdDate: "2024-01-15",
    deployedDate: "2024-01-16",
    gasUsed: 245000,
    transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: "2",
    name: "Delivery Milestone Contract TRD-002",
    type: "delivery",
    status: "deployed",
    blockchain: "polygon",
    address: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
    createdDate: "2024-01-18",
    deployedDate: "2024-01-18",
    gasUsed: 180000,
  },
]

const contractTemplates: ContractTemplate[] = [
  {
    id: "payment_escrow",
    name: "Payment Escrow Contract",
    type: "payment",
    description: "Automated payment release based on delivery confirmation",
    parameters: ["Payment Amount", "Buyer Address", "Seller Address", "Delivery Deadline"],
    complexity: "simple",
    estimatedGas: 200000,
  },
  {
    id: "milestone_payment",
    name: "Milestone Payment Contract",
    type: "delivery",
    description: "Progressive payments based on delivery milestones",
    parameters: ["Total Amount", "Milestone Count", "Milestone Criteria", "Payment Schedule"],
    complexity: "medium",
    estimatedGas: 350000,
  },
  {
    id: "trade_insurance",
    name: "Trade Insurance Contract",
    type: "insurance",
    description: "Automated insurance claims and payouts",
    parameters: ["Coverage Amount", "Premium", "Risk Conditions", "Claim Triggers"],
    complexity: "complex",
    estimatedGas: 500000,
  },
  {
    id: "compliance_check",
    name: "Compliance Verification Contract",
    type: "compliance",
    description: "Automated compliance verification and reporting",
    parameters: ["Compliance Rules", "Verification Sources", "Reporting Schedule"],
    complexity: "medium",
    estimatedGas: 280000,
  },
]

export function GenerateSmartContractInterface() {
  const [contracts, setContracts] = useState<SmartContract[]>(mockContracts)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [contractParams, setContractParams] = useState<Record<string, string>>({})
  const [generationStep, setGenerationStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "deployed":
        return <Badge className="bg-blue-100 text-blue-800">Deployed</Badge>
      case "generated":
        return <Badge className="bg-purple-100 text-purple-800">Generated</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "delivery":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "escrow":
        return <Shield className="h-4 w-4 text-purple-500" />
      case "insurance":
        return <Shield className="h-4 w-4 text-orange-500" />
      case "compliance":
        return <CheckCircle className="h-4 w-4 text-red-500" />
      default:
        return <Code className="h-4 w-4 text-gray-500" />
    }
  }

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return <Badge className="bg-green-100 text-green-800">Simple</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "complex":
        return <Badge className="bg-red-100 text-red-800">Complex</Badge>
      default:
        return <Badge variant="outline">{complexity}</Badge>
    }
  }

  const handleGeneration = () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate contract generation
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 20
      })
    }, 500)
  }

  const selectedTemplateData = contractTemplates.find((t) => t.id === selectedTemplate)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Smart Contract Generator</h1>
          <p className="text-muted-foreground">Generate and deploy automated smart contracts for trade finance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{contracts.filter((c) => c.status === "active").length} Active Contracts</Badge>
          <Button>
            <Code className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>
      </div>

      {/* Contract Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.length}</div>
            <p className="text-xs text-muted-foreground">
              {contracts.filter((c) => c.status === "active").length} currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gas Saved</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">425K</div>
            <p className="text-xs text-muted-foreground">Through optimization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">Contract execution rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Value Locked</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">In active contracts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contracts">My Contracts</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="deploy">Deploy & Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-6">
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getTypeIcon(contract.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{contract.name}</h3>
                        <p className="text-muted-foreground capitalize">{contract.type} Contract</p>
                        <p className="text-sm text-muted-foreground">
                          {contract.blockchain.charAt(0).toUpperCase() + contract.blockchain.slice(1)} Network
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(contract.status)}
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Contract Address</p>
                      <p className="font-mono text-sm">
                        {contract.address
                          ? `${contract.address.slice(0, 10)}...${contract.address.slice(-8)}`
                          : "Not deployed"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-semibold">{contract.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gas Used</p>
                      <p className="font-semibold">{contract.gasUsed?.toLocaleString() || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Network</p>
                      <p className="font-semibold capitalize">{contract.blockchain}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Code className="h-3 w-3 mr-1" />
                      View Code
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Address
                    </Button>
                    {contract.status === "active" && (
                      <Button size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Execute
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Generate Smart Contract
              </CardTitle>
              <CardDescription>Step {generationStep} of 4 - Create a new smart contract for your trade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Progress value={(generationStep / 4) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Template</span>
                  <span>Parameters</span>
                  <span>Review</span>
                  <span>Deploy</span>
                </div>
              </div>

              {generationStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Select Contract Template</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contractTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-colors ${
                          selectedTemplate === template.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(template.type)}
                              <h4 className="font-medium">{template.name}</h4>
                            </div>
                            {getComplexityBadge(template.complexity)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{template.parameters.length} parameters</span>
                            <span>~{template.estimatedGas.toLocaleString()} gas</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {generationStep === 2 && selectedTemplateData && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configure Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTemplateData.parameters.map((param, index) => (
                      <div key={index} className="space-y-2">
                        <Label htmlFor={param}>{param} *</Label>
                        <Input
                          id={param}
                          placeholder={`Enter ${param.toLowerCase()}`}
                          value={contractParams[param] || ""}
                          onChange={(e) =>
                            setContractParams({
                              ...contractParams,
                              [param]: e.target.value,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Advanced Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="blockchain">Blockchain Network</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select network" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ethereum">Ethereum</SelectItem>
                            <SelectItem value="polygon">Polygon</SelectItem>
                            <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                            <SelectItem value="arbitrum">Arbitrum</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gas-limit">Gas Limit</Label>
                        <Input
                          id="gas-limit"
                          placeholder="Auto-calculated"
                          value={selectedTemplateData.estimatedGas.toLocaleString()}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {generationStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Review Contract</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Contract Summary</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Template:</span>
                            <span className="ml-2 font-medium">{selectedTemplateData?.name}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Type:</span>
                            <span className="ml-2 font-medium capitalize">{selectedTemplateData?.type}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Complexity:</span>
                            <span className="ml-2 font-medium capitalize">{selectedTemplateData?.complexity}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Est. Gas:</span>
                            <span className="ml-2 font-medium">
                              {selectedTemplateData?.estimatedGas.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Generated Code Preview</h4>
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <div>pragma solidity ^0.8.0;</div>
                          <div></div>
                          <div>contract TradePaymentEscrow {`{`}</div>
                          <div className="ml-4">address public buyer;</div>
                          <div className="ml-4">address public seller;</div>
                          <div className="ml-4">uint256 public amount;</div>
                          <div className="ml-4">bool public delivered;</div>
                          <div></div>
                          <div className="ml-4">constructor(address _buyer, address _seller) {`{`}</div>
                          <div className="ml-8">buyer = _buyer;</div>
                          <div className="ml-8">seller = _seller;</div>
                          <div className="ml-8">amount = msg.value;</div>
                          <div className="ml-4">{`}`}</div>
                          <div>{`}`}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {generationStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Deploy Contract</h3>
                  {isGenerating ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Zap className="h-8 w-8 animate-pulse mx-auto mb-4 text-primary" />
                        <h4 className="text-lg font-medium mb-2">Generating Contract...</h4>
                        <p className="text-muted-foreground mb-4">
                          Compiling smart contract and preparing for deployment
                        </p>
                        <Progress value={generationProgress} className="w-full max-w-md mx-auto" />
                        <p className="text-sm text-muted-foreground mt-2">{generationProgress}% complete</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Deployment Settings</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Auto-deploy after generation</Label>
                              <div className="flex items-center space-x-2">
                                <Switch id="auto-deploy" />
                                <Label htmlFor="auto-deploy" className="text-sm">
                                  Deploy immediately
                                </Label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Gas Price (Gwei)</Label>
                              <Input placeholder="Auto" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Button className="w-full" onClick={handleGeneration} disabled={isGenerating}>
                        <Zap className="h-4 w-4 mr-2" />
                        Generate & Deploy Contract
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setGenerationStep(Math.max(1, generationStep - 1))}
                  disabled={generationStep === 1 || isGenerating}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (generationStep < 4) {
                      setGenerationStep(generationStep + 1)
                    }
                  }}
                  disabled={generationStep === 4 || isGenerating}
                >
                  {generationStep === 4 ? "Deploy" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(template.type)}
                      {template.name}
                    </div>
                    {getComplexityBadge(template.complexity)}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Required Parameters</h4>
                    <div className="space-y-1">
                      {template.parameters.map((param, index) => (
                        <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                          {param}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Gas:</span>
                    <span className="font-medium">{template.estimatedGas.toLocaleString()}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedTemplate(template.id)
                      setGenerationStep(2)
                    }}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Status</CardTitle>
                <CardDescription>Monitor contract deployment and execution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Contract compiled successfully</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Deployed to blockchain</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Contract active and monitoring</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Statistics</CardTitle>
                <CardDescription>Blockchain network performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gas Price (Gwei)</span>
                    <span className="font-medium">25.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Block Time</span>
                    <span className="font-medium">12.8s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network Congestion</span>
                    <Badge className="bg-green-100 text-green-800">Low</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Deploy Cost</span>
                    <span className="font-medium">$12.50</span>
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
