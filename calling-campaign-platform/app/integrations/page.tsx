"use client"

import Link from "next/link"
import { BarChart3, Calendar, Check, ExternalLink, Phone, Plus, Settings, Users } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Update the IntegrationsPage component to include state and handlers
export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("crm")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [integrationType, setIntegrationType] = useState("crm")
  const [apiKey, setApiKey] = useState("")
  const [webhook, setWebhook] = useState("")
  const [syncData, setSyncData] = useState(false)
  const [syncFrequency, setSyncFrequency] = useState("15")
  const [autoSync, setAutoSync] = useState(true)
  const [twoWaySync, setTwoWaySync] = useState(true)
  const [conflictResolution, setConflictResolution] = useState("newest")

  // Handler for tab change
  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  // Handler for adding an integration
  const handleAddIntegration = () => {
    setShowAddDialog(true)
  }

  // Handler for saving an integration
  const handleSaveIntegration = () => {
    alert("Integration saved successfully!")
    setShowAddDialog(false)
  }

  // Handler for connecting an integration
  const handleConnectIntegration = (id, type) => {
    alert(`Connecting to ${type} integration ${id}`)
  }

  // Handler for configuring an integration
  const handleConfigureIntegration = (id, type) => {
    alert(`Configuring ${type} integration ${id}`)
  }

  // Handler for syncing an integration
  const handleSyncIntegration = (id, type) => {
    alert(`Syncing ${type} integration ${id}`)
  }

  // Handler for viewing an integration dashboard
  const handleViewDashboard = (id, type) => {
    alert(`Opening dashboard for ${type} integration ${id}`)
  }

  // Handler for testing an integration
  const handleTestIntegration = (id, type) => {
    alert(`Testing ${type} integration ${id}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <Phone className="h-5 w-5" />
            <span>CallCampaign</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Help
            </Button>
            <Button size="sm" onClick={handleAddIntegration}>
              Add Integration
            </Button>
          </nav>
        </div>
      </header>
      <div className="container flex-1 items-start py-6 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <nav className="grid items-start px-2 py-4 text-sm">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/campaigns"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Phone className="h-4 w-4" />
              Campaigns
            </Link>
            <Link
              href="/agents"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Users className="h-4 w-4" />
              Agents
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/recordings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Phone className="h-4 w-4" />
              Recordings
            </Link>
            <Link
              href="/schedule"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="h-4 w-4" />
              Schedule
            </Link>
            <Link
              href="/integrations"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
              Integrations
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
              <p className="text-muted-foreground">Connect your calling platform with other services</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1" onClick={handleAddIntegration}>
                  <Plus className="h-4 w-4" />
                  Add Integration
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Integration</DialogTitle>
                  <DialogDescription>Connect your calling platform with external services</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="integration-type">Integration Type</Label>
                    <Select value={integrationType} onValueChange={setIntegrationType}>
                      <SelectTrigger id="integration-type">
                        <SelectValue placeholder="Select integration type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crm">CRM System</SelectItem>
                        <SelectItem value="analytics">Analytics Platform</SelectItem>
                        <SelectItem value="communication">Communication Tool</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="webhook">Webhook URL (Optional)</Label>
                    <Input
                      id="webhook"
                      placeholder="https://your-service.com/webhook"
                      value={webhook}
                      onChange={(e) => setWebhook(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sync-data" checked={syncData} onCheckedChange={setSyncData} />
                    <Label htmlFor="sync-data">Sync existing data</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSaveIntegration}>
                    Save Integration
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="crm" value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="crm">CRM Systems</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="crm" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {crmIntegrations.map((integration) => (
                  <Card key={integration.id} className={integration.connected ? "border-primary/50" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        {integration.connected && (
                          <div className="flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            <Check className="mr-1 h-3 w-3" />
                            Connected
                          </div>
                        )}
                      </div>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {integration.connected ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span className="font-medium text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Sync:</span>
                              <span>{integration.lastSync}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Records Synced:</span>
                              <span>{integration.recordsSynced}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-16 items-center justify-center">
                            <span className="text-muted-foreground">Not connected</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {integration.connected ? (
                        <div className="flex w-full gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleConfigureIntegration(integration.id, "CRM")}
                          >
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleSyncIntegration(integration.id, "CRM")}
                          >
                            Sync Now
                          </Button>
                        </div>
                      ) : (
                        <Button className="w-full" onClick={() => handleConnectIntegration(integration.id, "CRM")}>
                          Connect
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {analyticsIntegrations.map((integration) => (
                  <Card key={integration.id} className={integration.connected ? "border-primary/50" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        {integration.connected && (
                          <div className="flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            <Check className="mr-1 h-3 w-3" />
                            Connected
                          </div>
                        )}
                      </div>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {integration.connected ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span className="font-medium text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Data Sharing:</span>
                              <span>{integration.dataSharing}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Activity:</span>
                              <span>{integration.lastActivity}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-16 items-center justify-center">
                            <span className="text-muted-foreground">Not connected</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {integration.connected ? (
                        <div className="flex w-full gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleConfigureIntegration(integration.id, "Analytics")}
                          >
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center justify-center gap-1 flex-1"
                            onClick={() => handleViewDashboard(integration.id, "Analytics")}
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Dashboard
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => handleConnectIntegration(integration.id, "Analytics")}
                        >
                          Connect
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="communication" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {communicationIntegrations.map((integration) => (
                  <Card key={integration.id} className={integration.connected ? "border-primary/50" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        {integration.connected && (
                          <div className="flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            <Check className="mr-1 h-3 w-3" />
                            Connected
                          </div>
                        )}
                      </div>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {integration.connected ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span className="font-medium text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Notifications:</span>
                              <span>{integration.notifications}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Channel:</span>
                              <span>{integration.channel}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-16 items-center justify-center">
                            <span className="text-muted-foreground">Not connected</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {integration.connected ? (
                        <div className="flex w-full gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleConfigureIntegration(integration.id, "Communication")}
                          >
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleTestIntegration(integration.id, "Communication")}
                          >
                            Test
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => handleConnectIntegration(integration.id, "Communication")}
                        >
                          Connect
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Data Sync Settings</CardTitle>
              <CardDescription>Configure how your data is synchronized between systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Automatic Synchronization</h4>
                    <p className="text-sm text-muted-foreground">Automatically sync data between systems</p>
                  </div>
                  <Switch id="auto-sync" defaultChecked={autoSync} onCheckedChange={setAutoSync} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Sync Frequency</h4>
                    <p className="text-sm text-muted-foreground">How often data should be synchronized</p>
                  </div>
                  <Select defaultValue={syncFrequency} onValueChange={setSyncFrequency}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                      <SelectItem value="daily">Once daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Two-Way Sync</h4>
                    <p className="text-sm text-muted-foreground">Sync changes from both systems</p>
                  </div>
                  <Switch id="two-way-sync" defaultChecked={twoWaySync} onCheckedChange={setTwoWaySync} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Conflict Resolution</h4>
                    <p className="text-sm text-muted-foreground">How to handle conflicting data</p>
                  </div>
                  <Select defaultValue={conflictResolution} onValueChange={setConflictResolution}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest Wins</SelectItem>
                      <SelectItem value="crm">CRM System Wins</SelectItem>
                      <SelectItem value="campaign">Campaign System Wins</SelectItem>
                      <SelectItem value="manual">Manual Resolution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

const crmIntegrations = [
  {
    id: 1,
    name: "Salesforce",
    description: "Connect with Salesforce CRM to sync contacts and campaign data",
    connected: true,
    lastSync: "10 minutes ago",
    recordsSynced: "1,245",
  },
  {
    id: 2,
    name: "HubSpot",
    description: "Integrate with HubSpot to manage contacts and track campaign performance",
    connected: true,
    lastSync: "1 hour ago",
    recordsSynced: "876",
  },
  {
    id: 3,
    name: "Zoho CRM",
    description: "Connect with Zoho CRM for contact management and call tracking",
    connected: false,
  },
  {
    id: 4,
    name: "Microsoft Dynamics",
    description: "Integrate with Microsoft Dynamics 365 for comprehensive CRM capabilities",
    connected: false,
  },
]

const analyticsIntegrations = [
  {
    id: 1,
    name: "Google Analytics",
    description: "Track campaign performance and user behavior with Google Analytics",
    connected: true,
    dataSharing: "Full Access",
    lastActivity: "15 minutes ago",
  },
  {
    id: 2,
    name: "Mixpanel",
    description: "Advanced analytics for tracking user interactions and campaign metrics",
    connected: false,
  },
  {
    id: 3,
    name: "Tableau",
    description: "Visualize campaign data and create custom reports with Tableau",
    connected: true,
    dataSharing: "Read Only",
    lastActivity: "2 hours ago",
  },
]

const communicationIntegrations = [
  {
    id: 1,
    name: "Slack",
    description: "Get notifications and updates about your campaigns in Slack",
    connected: true,
    notifications: "Enabled",
    channel: "#campaigns",
  },
  {
    id: 2,
    name: "Microsoft Teams",
    description: "Collaborate and receive campaign updates in Microsoft Teams",
    connected: false,
  },
  {
    id: 3,
    name: "Email Notifications",
    description: "Receive campaign updates and alerts via email",
    connected: true,
    notifications: "Daily Digest",
    channel: "team@example.com",
  },
]

