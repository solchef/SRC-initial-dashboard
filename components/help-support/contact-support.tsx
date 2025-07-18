"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Phone, Mail, MessageCircle, Send, FileText, Headphones } from "lucide-react"

interface SupportTicket {
  id: string
  subject: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in_progress" | "resolved" | "closed"
  createdDate: string
  lastUpdate: string
  description: string
}

export function ContactSupportInterface() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    priority: "",
    subject: "",
    description: "",
  })

  const [tickets] = useState<SupportTicket[]>([
    {
      id: "TICK-001",
      subject: "Unable to upload KYC documents",
      category: "Technical",
      priority: "medium",
      status: "in_progress",
      createdDate: "2024-01-17",
      lastUpdate: "2024-01-18",
      description: "Getting error when trying to upload passport document for KYC verification",
    },
    {
      id: "TICK-002",
      subject: "Question about trade financing terms",
      category: "General",
      priority: "low",
      status: "resolved",
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-16",
      description: "Need clarification on payment terms and delivery conditions",
    },
    {
      id: "TICK-003",
      subject: "Account verification delay",
      category: "Account",
      priority: "high",
      status: "open",
      createdDate: "2024-01-18",
      lastUpdate: "2024-01-18",
      description: "My account verification has been pending for over 48 hours",
    },
  ])

  const supportChannels = [
    {
      name: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 5 minutes",
      icon: MessageCircle,
      status: "online",
    },
    {
      name: "Email Support",
      description: "Send us a detailed message",
      availability: "24/7",
      responseTime: "< 4 hours",
      icon: Mail,
      status: "available",
    },
    {
      name: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM UTC",
      responseTime: "< 2 minutes",
      icon: Phone,
      status: "available",
    },
    {
      name: "Video Call",
      description: "Schedule a screen-sharing session",
      availability: "By appointment",
      responseTime: "Same day",
      icon: Headphones,
      status: "available",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-600 text-white border-red-600">Urgent</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Open</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Closed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      case "available":
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      case "busy":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
      case "offline":
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Support ticket submitted:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      category: "",
      priority: "",
      subject: "",
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Support</h1>
          <p className="text-muted-foreground">Get help from our expert support team</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Average response time: 2 hours
        </Badge>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="channels">Support Channels</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Submit Support Request
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="account">Account & Billing</SelectItem>
                          <SelectItem value="compliance">Compliance & KYC</SelectItem>
                          <SelectItem value="trading">Trading & Finance</SelectItem>
                          <SelectItem value="general">General Question</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority *</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General inquiry</SelectItem>
                          <SelectItem value="medium">Medium - Non-urgent issue</SelectItem>
                          <SelectItem value="high">High - Urgent issue</SelectItem>
                          <SelectItem value="urgent">Urgent - Critical problem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide detailed information about your issue..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Support Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Help</CardTitle>
                  <CardDescription>Common issues and solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start h-auto p-3 bg-transparent">
                      <div className="text-left">
                        <p className="font-medium">Can't upload documents?</p>
                        <p className="text-sm text-muted-foreground">Check file format and size limits</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-auto p-3 bg-transparent">
                      <div className="text-left">
                        <p className="font-medium">Account verification pending?</p>
                        <p className="text-sm text-muted-foreground">Learn about the verification process</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-auto p-3 bg-transparent">
                      <div className="text-left">
                        <p className="font-medium">How to create a trade?</p>
                        <p className="text-sm text-muted-foreground">Step-by-step trade creation guide</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-auto p-3 bg-transparent">
                      <div className="text-left">
                        <p className="font-medium">Payment issues?</p>
                        <p className="text-sm text-muted-foreground">Troubleshoot payment problems</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>For urgent issues requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <Phone className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-800 dark:text-red-200">Emergency Hotline</p>
                        <p className="text-sm text-red-700 dark:text-red-300">+1-800-SRC-HELP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-200">Priority Email</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">urgent@srcecosystem.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <channel.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">{channel.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(channel.status)}
                      <span className="text-xs text-muted-foreground capitalize">{channel.status}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium">{channel.availability}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Response Time:</span>
                      <span className="font-medium">{channel.responseTime}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <channel.icon className="h-4 w-4 mr-2" />
                    Contact via {channel.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                My Support Tickets
              </CardTitle>
              <CardDescription>Track the status of your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{ticket.subject}</h4>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Ticket ID: {ticket.id}</span>
                          <span>Category: {ticket.category}</span>
                          <span>Created: {ticket.createdDate}</span>
                          <span>Last Update: {ticket.lastUpdate}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
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
