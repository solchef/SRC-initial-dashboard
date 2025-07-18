"use client"
import {
  BarChart3,
  Calculator,
  ChevronDown,
  CreditCard,
  DollarSign,
  FileText,
  Globe,
  HelpCircle,
  Home,
  LineChart,
  MapPin,
  PieChart,
  Search,
  Settings,
  Shield,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  AlertTriangle,
  Bell,
  CheckCircle,
  FileCheck,
  Handshake,
  Lock,
  Target,
  Zap,
  Eye,
  RefreshCw,
  BookOpen,
  MessageCircle,
  Download,
  Filter,
  Coins,
  ArrowUpDown,
  Clock,
  Award,
  Leaf,
} from "lucide-react"
import type React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useUserRole } from "@/hooks/use-user-role"
import { useState } from "react"

// SME Menu Structure
const smeMenuItems = [
  {
    title: "Dashboard",
    icon: Home,
    items: [
      { title: "Portfolio Summary", icon: PieChart },
      { title: "Trade Pipeline Tracker", icon: TrendingUp },
      { title: "Notifications", icon: Bell },
      { title: "Risk Alerts", icon: AlertTriangle },
    ],
  },
  {
    title: "Compliance & Onboarding",
    icon: Shield,
    items: [
      { title: "KYC, KYB", icon: CheckCircle },
      { title: "Document Upload", icon: FileText },
      { title: "AML Screening", icon: Search },
      { title: "Onboarding Status Tracker", icon: Target },
    ],
  },
  {
    title: "Credit Assessment",
    icon: Calculator,
    items: [
      { title: "Credit Profile", icon: Users },
      { title: "Score Report", icon: BarChart3 },
      { title: "Upload Financials", icon: FileCheck },
      { title: "Creditworthiness History", icon: LineChart },
      { title: "Apply for Credit Insurance", icon: Lock },
    ],
  },
  {
    title: "Trade Evaluation",
    icon: Eye,
    items: [
      { title: "Transaction Risk Assessment", icon: AlertTriangle },
      { title: "Due Diligence", icon: Search },
      { title: "Trade History Analyzer", icon: BarChart3 },
      { title: "Red Flag Detection", icon: AlertTriangle },
    ],
  },
  {
    title: "Digital Trade Creation",
    icon: FileText,
    items: [
      { title: "Create New Trade", icon: Zap },
      { title: "Input Trade Terms", icon: FileCheck },
      { title: "Upload Docs & Sign", icon: FileText },
      { title: "Generate Smart Contract", icon: Settings },
    ],
  },
  {
    title: "Supply Chain Documentation",
    icon: Truck,
    items: [
      { title: "Tokenize Docs", icon: Coins },
      { title: "Onchain Signature & Exchange", icon: Handshake },
      { title: "Stakeholder Invites", icon: Users },
    ],
  },
  {
    title: "Financing Marketplace",
    icon: DollarSign,
    items: [
      { title: "Tokenize Trade Asset", icon: Coins },
      { title: "Submit to Liquidity Pool", icon: ArrowUpDown },
      { title: "Compare Offers", icon: BarChart3 },
      { title: "Accept & Track Funding", icon: TrendingUp },
      { title: "Smart Contract Execution", icon: Settings },
    ],
  },
  {
    title: "Supply Chain Digital Twin",
    icon: Globe,
    items: [
      { title: "Shipment Tracking", icon: MapPin },
      { title: "Inventory Monitoring", icon: Eye },
      { title: "Emission Metrics", icon: Leaf },
      { title: "QA & Certifications", icon: Award },
    ],
  },
  {
    title: "Risk Monitoring",
    icon: AlertTriangle,
    items: [
      { title: "Real-Time Risk Dashboard", icon: RefreshCw },
      { title: "Climate/Political Risk", icon: Globe },
      { title: "Compliance Triggers", icon: Bell },
      { title: "Credit/Quality Risk", icon: AlertTriangle },
    ],
  },
  {
    title: "Payments & FX",
    icon: CreditCard,
    items: [
      { title: "Multi-Currency Wallet", icon: Wallet },
      { title: "Real-Time FX", icon: ArrowUpDown },
      { title: "Payment Tracking", icon: Clock },
      { title: "Settlement Ledger", icon: FileText },
    ],
  },
  {
    title: "Reports & Analytics",
    icon: BarChart3,
    items: [
      { title: "Financing History", icon: LineChart },
      { title: "Risk Analytics", icon: AlertTriangle },
      { title: "Carbon Reports", icon: Leaf },
      { title: "Downloadable Files", icon: Download },
    ],
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    items: [
      { title: "Chat Assistant (AI)", icon: MessageCircle },
      { title: "Legal Resources", icon: BookOpen },
      { title: "Contact Support", icon: HelpCircle },
    ],
  },
]

// Liquidity Provider Menu Structure
const liquidityProviderMenuItems = [
  {
    title: "Dashboard",
    icon: Home,
    items: [
      { title: "Portfolio Value", icon: PieChart },
      { title: "Active Deals", icon: Handshake },
      { title: "Payouts & ROI", icon: TrendingUp },
      { title: "Risk Summary", icon: AlertTriangle },
    ],
  },
  {
    title: "Deal Flow",
    icon: Filter,
    items: [
      { title: "Browse Tokenized Assets", icon: Coins },
      { title: "Make Offers", icon: Handshake },
      { title: "Auto-Invest Settings", icon: Settings },
    ],
  },
  {
    title: "Capital & Wallet",
    icon: Wallet,
    items: [
      { title: "Deposit (Fiat/Crypto)", icon: ArrowUpDown },
      { title: "Wallet Overview", icon: Wallet },
      { title: "Withdrawals & History", icon: Clock },
    ],
  },
  {
    title: "Risk & Credit",
    icon: AlertTriangle,
    items: [
      { title: "Credit Reports", icon: FileText },
      { title: "Red Flags", icon: AlertTriangle },
      { title: "Watchlist", icon: Eye },
    ],
  },
  {
    title: "Tokenized Asset Mgmt",
    icon: Coins,
    items: [
      { title: "Funded Trades", icon: Handshake },
      { title: "Smart Contracts", icon: Settings },
      { title: "Secondary Marketplace", icon: ArrowUpDown },
    ],
  },
  {
    title: "Repayments & Earnings",
    icon: DollarSign,
    items: [
      { title: "Repayment Tracker", icon: Clock },
      { title: "Interest Earnings", icon: TrendingUp },
      { title: "Missed Payments", icon: AlertTriangle },
      { title: "Smart Contract Logs", icon: FileText },
    ],
  },
  {
    title: "Compliance & Onboarding",
    icon: Shield,
    items: [
      { title: "KYB, AML", icon: CheckCircle },
      { title: "Regulatory Docs", icon: FileText },
    ],
  },
  {
    title: "Portfolio Analytics",
    icon: BarChart3,
    items: [
      { title: "ROI Charts", icon: LineChart },
      { title: "Liquidity Ratios", icon: PieChart },
      { title: "ESG Metrics", icon: Leaf },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { title: "Deal Alerts", icon: Bell },
      { title: "Risk Flags", icon: AlertTriangle },
      { title: "Contract Maturity", icon: Clock },
    ],
  },
  {
    title: "Settings & Preferences",
    icon: Settings,
    items: [
      { title: "Auto-Funding", icon: Zap },
      { title: "Notification Settings", icon: Bell },
    ],
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    items: [
      { title: "Onboarding Walkthrough", icon: Target },
      { title: "Legal Center", icon: BookOpen },
      { title: "Chat Support", icon: MessageCircle },
    ],
  },
]

export function AppSidebar({
  onPageChange,
  ...props
}: React.ComponentProps<typeof Sidebar> & { onPageChange?: (page: string | null) => void }) {
  const { userRole } = useUserRole()
  const menuItems = userRole === "sme" ? smeMenuItems : liquidityProviderMenuItems
  const [activePage, setActivePage] = useState<string | null>(null)

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center p-1 flex-shrink-0">
            <img src="/images/src-logo.png" alt="$SRC Logo" className="w-full h-full object-contain" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="font-semibold text-sidebar-foreground">$SRC Ecosystem</h2>
            <p className="text-xs text-sidebar-foreground/70">Trade Finance Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {menuItems.map((section, index) => (
          <SidebarGroup key={index}>
            <Collapsible defaultOpen={index === 0} className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group-data-[collapsible=icon]:justify-center">
                  <div className="flex items-center gap-2">
                    <section.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">{section.title}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item, itemIndex) => (
                      <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="w-full justify-start pl-8 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer"
                          onClick={() => {
                            // Handle dashboard section clicks
                            if (section.title === "Dashboard") {
                              if (item.title === "Portfolio Summary") {
                                setActivePage("portfolio-summary")
                                onPageChange?.("portfolio-summary")
                              } else if (item.title === "Trade Pipeline Tracker") {
                                setActivePage("trade-pipeline-tracker")
                                onPageChange?.("trade-pipeline-tracker")
                              } else if (item.title === "Notifications") {
                                setActivePage("notifications")
                                onPageChange?.("notifications")
                              } else if (item.title === "Risk Alerts") {
                                setActivePage("risk-alerts")
                                onPageChange?.("risk-alerts")
                              }
                            }
                            // Handle compliance section clicks
                            else if (section.title === "Compliance & Onboarding") {
                              if (item.title === "KYC, KYB") {
                                setActivePage("kyc-kyb")
                                onPageChange?.("kyc-kyb")
                              } else if (item.title === "Document Upload") {
                                setActivePage("document-upload")
                                onPageChange?.("document-upload")
                              } else if (item.title === "AML Screening") {
                                setActivePage("aml-screening")
                                onPageChange?.("aml-screening")
                              } else if (item.title === "Onboarding Status Tracker") {
                                setActivePage("onboarding-status")
                                onPageChange?.("onboarding-status")
                              }
                            }
                            // Handle credit assessment section clicks
                            else if (section.title === "Credit Assessment") {
                              if (item.title === "Credit Profile") {
                                setActivePage("credit-profile")
                                onPageChange?.("credit-profile")
                              } else if (item.title === "Score Report") {
                                setActivePage("score-report")
                                onPageChange?.("score-report")
                              } else if (item.title === "Upload Financials") {
                                setActivePage("upload-financials")
                                onPageChange?.("upload-financials")
                              } else if (item.title === "Creditworthiness History") {
                                setActivePage("creditworthiness-history")
                                onPageChange?.("creditworthiness-history")
                              } else if (item.title === "Apply for Credit Insurance") {
                                setActivePage("credit-insurance")
                                onPageChange?.("credit-insurance")
                              }
                            } else {
                              setActivePage(null)
                              onPageChange?.(null)
                            }
                          }}
                        >
                          <item.icon className="h-4 w-4 text-primary/80 flex-shrink-0" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4 group-data-[collapsible=icon]:hidden">
        <div className="text-xs text-sidebar-foreground/70 text-center">
          <p>© 2024 $SRC Ecosystem</p>
          <p>v2.1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
