"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Paperclip, ThumbsUp, ThumbsDown, Copy, RefreshCw } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
  helpful?: boolean
}

export function ChatAssistantInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI assistant for the $SRC Ecosystem. I can help you with trade finance questions, platform navigation, compliance requirements, and more. How can I assist you today?",
      timestamp: "2024-01-18T10:00:00Z",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    "How do I create a new trade?",
    "What documents do I need for KYC?",
    "How does AML screening work?",
    "Explain trade finance terms",
    "How to upload financial documents?",
    "What are the payment options?",
  ]

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAIResponse(inputMessage),
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("trade") && input.includes("create")) {
      return "To create a new trade, navigate to 'Digital Trade Creation' > 'Create New Trade' in the sidebar. You'll need to provide:\n\n1. Basic trade information (commodity, quantity, value)\n2. Buyer and seller details\n3. Payment and delivery terms\n4. Logistics information\n\nThe system will guide you through each step with a progress indicator. Would you like me to explain any specific part of the trade creation process?"
    }

    if (input.includes("kyc") || input.includes("document")) {
      return "For KYC (Know Your Customer) verification, you'll need:\n\n**Individual KYC:**\n- Government-issued photo ID\n- Proof of address (utility bill, bank statement)\n- Selfie verification\n\n**Business KYB:**\n- Certificate of incorporation\n- Business registration documents\n- Beneficial ownership information\n- Financial statements\n\nYou can upload these in 'Compliance & Onboarding' > 'Document Upload'. The system supports PDF, JPG, and PNG formats up to 10MB per file."
    }

    if (input.includes("aml") || input.includes("screening")) {
      return "AML (Anti-Money Laundering) screening is an automated process that checks individuals and entities against:\n\n- OFAC sanctions lists\n- UN sanctions lists\n- EU sanctions lists\n- PEP (Politically Exposed Persons) databases\n- Adverse media sources\n\nScreening runs automatically when you complete KYC/KYB. Results are categorized as:\n- ✅ Clear: No matches found\n- ⚠️ Flagged: Potential matches requiring review\n- ❌ Blocked: Confirmed sanctions matches\n\nYou can view detailed results in 'Compliance & Onboarding' > 'AML Screening'."
    }

    return "I understand you're asking about trade finance. I can help with various topics including:\n\n- Trade creation and management\n- Compliance and documentation\n- Payment and financing options\n- Risk assessment and monitoring\n- Platform navigation\n\nCould you please be more specific about what you'd like to know? You can also use the quick action buttons below for common questions."
  }

  const markHelpful = (messageId: string, helpful: boolean) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, helpful } : msg)))
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Chat Assistant</h1>
          <p className="text-muted-foreground">Get instant help with trade finance questions and platform guidance</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Chat with AI Assistant
            </CardTitle>
            <CardDescription>Ask questions about trade finance, compliance, or platform features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <ScrollArea className="h-96 w-full border rounded-lg p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user" ? "bg-primary text-white" : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">{new Date(message.timestamp).toLocaleTimeString()}</p>
                        {message.type === "assistant" && (
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => markHelpful(message.id, true)}
                            >
                              <ThumbsUp className={`h-3 w-3 ${message.helpful === true ? "text-green-500" : ""}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => markHelpful(message.id, false)}
                            >
                              <ThumbsDown className={`h-3 w-3 ${message.helpful === false ? "text-red-500" : ""}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => copyMessage(message.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your question here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="pr-10"
                />
                <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={sendMessage} disabled={!inputMessage.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common questions and topics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto p-3 bg-transparent"
                onClick={() => setInputMessage(action)}
              >
                <span className="text-sm">{action}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Help Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Help Topics</CardTitle>
          <CardDescription>Browse common topics and frequently asked questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Getting Started</h4>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  Platform Overview
                </Button>
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  Account Setup
                </Button>
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  First Trade Guide
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Compliance</h4>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  KYC Requirements
                </Button>
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  Document Upload
                </Button>
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  AML Screening
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Trade Finance</h4>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  Payment Terms
                </Button>
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  Risk Assessment
                </Button>
                <Button variant="ghost" className="w-full justify-start h-auto p-2 text-sm">
                  Financing Options
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
