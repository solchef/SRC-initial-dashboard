"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  DollarSign,
  FileText,
  Clock,
  Settings,
  Eye,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"

interface Notification {
  id: string
  type: "trade" | "payment" | "risk" | "compliance" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionRequired: boolean
}

export function NotificationsInterface() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "trade",
      title: "New trade opportunity",
      message: "High-yield import financing available for electronics from Asia Pacific region",
      timestamp: "2024-01-18T10:30:00Z",
      read: false,
      priority: "high",
      actionRequired: true,
    },
    {
      id: "2",
      type: "risk",
      title: "Risk alert",
      message: "Political risk increased for Region A - review active trades",
      timestamp: "2024-01-18T09:15:00Z",
      read: false,
      priority: "medium",
      actionRequired: true,
    },
    {
      id: "3",
      type: "payment",
      title: "Payment received",
      message: "$50,000 repayment processed from Global Imports Ltd",
      timestamp: "2024-01-18T08:45:00Z",
      read: true,
      priority: "low",
      actionRequired: false,
    },
    {
      id: "4",
      type: "compliance",
      title: "Document verification complete",
      message: "KYC documents for TechCorp Imports have been verified and approved",
      timestamp: "2024-01-17T16:20:00Z",
      read: true,
      priority: "medium",
      actionRequired: false,
    },
    {
      id: "5",
      type: "system",
      title: "System maintenance scheduled",
      message: "Platform maintenance scheduled for January 20, 2024 from 2:00 AM to 4:00 AM UTC",
      timestamp: "2024-01-17T14:00:00Z",
      read: false,
      priority: "low",
      actionRequired: false,
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    tradeUpdates: true,
    paymentAlerts: true,
    riskAlerts: true,
    complianceUpdates: true,
    systemNotifications: false,
    emailNotifications: true,
    pushNotifications: true,
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "payment":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "risk":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "compliance":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "system":
        return <Info className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAsUnread = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: false } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your trade finance activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{unreadCount} unread</Badge>
          {actionRequiredCount > 0 && (
            <Badge className="bg-red-100 text-red-800 border-red-200">{actionRequiredCount} require action</Badge>
          )}
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`${!notification.read ? "border-primary/50 bg-primary/5" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                          {notification.title}
                        </h3>
                        {getPriorityBadge(notification.priority)}
                        {notification.actionRequired && (
                          <Badge className="bg-orange-100 text-orange-800 border-orange-200">Action Required</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        <span className="capitalize">{notification.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read ? (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => markAsUnread(notification.id)}>
                        <MarkAsUnread className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {["trade", "payment", "risk", "compliance"].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {notifications
              .filter((n) => n.type === type)
              .map((notification) => (
                <Card key={notification.id} className={`${!notification.read ? "border-primary/50 bg-primary/5" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                              {notification.title}
                            </h3>
                            {getPriorityBadge(notification.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read ? (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => markAsUnread(notification.id)}>
                            <MarkAsUnread className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="trade-updates">Trade Updates</Label>
                    <Switch
                      id="trade-updates"
                      checked={notificationSettings.tradeUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, tradeUpdates: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="payment-alerts">Payment Alerts</Label>
                    <Switch
                      id="payment-alerts"
                      checked={notificationSettings.paymentAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, paymentAlerts: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="risk-alerts">Risk Alerts</Label>
                    <Switch
                      id="risk-alerts"
                      checked={notificationSettings.riskAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, riskAlerts: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compliance-updates">Compliance Updates</Label>
                    <Switch
                      id="compliance-updates"
                      checked={notificationSettings.complianceUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, complianceUpdates: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-notifications">System Notifications</Label>
                    <Switch
                      id="system-notifications"
                      checked={notificationSettings.systemNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, systemNotifications: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
