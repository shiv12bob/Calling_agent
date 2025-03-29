"use client"

import Link from "next/link"
import { ArrowLeft, Phone, Plus, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Add useState import
import { useState } from "react"

// Update the NewCampaignPage component to include state and handlers
export default function NewCampaignPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "draft",
    audienceType: "existing",
    contactList: "",
    estimatedCalls: "",
    scriptName: "",
    scriptContent: "",
    selectedAgents: [...agents],
    enableRecording: true,
    recordingConsent:
      "This call may be recorded for quality and training purposes. By continuing with this call, you consent to the recording.",
    storageDuration: "90",
    autoTranscribe: true,
    crmSystem: "salesforce",
    syncContacts: true,
    syncCalls: true,
    syncOutcomes: true,
    createTasks: true,
    twoWaySync: false,
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startTime: "09:00",
    endTime: "17:00",
    timezone: "est",
    autoSchedule: false,
  })

  // Active tab state
  const [activeTab, setActiveTab] = useState("details")

  // Handler for input changes
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    })
  }

  // Handler for select changes
  const handleSelectChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  // Handler for removing an agent
  const handleRemoveAgent = (agentId) => {
    setFormData({
      ...formData,
      selectedAgents: formData.selectedAgents.filter((agent) => agent.id !== agentId),
    })
  }

  // Handler for day selection
  const handleDayToggle = (day) => {
    if (formData.daysOfWeek.includes(day)) {
      setFormData({
        ...formData,
        daysOfWeek: formData.daysOfWeek.filter((d) => d !== day),
      })
    } else {
      setFormData({
        ...formData,
        daysOfWeek: [...formData.daysOfWeek, day],
      })
    }
  }

  // Handler for saving the campaign
  const handleSaveCampaign = () => {
    // In a real app, this would save the campaign data to the server
    console.log("Saving campaign:", formData)
    alert("Campaign saved successfully!")
    window.location.href = "/campaigns"
  }

  // Handler for canceling
  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      window.location.href = "/campaigns"
    }
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
            <Button size="sm" onClick={handleSaveCampaign}>
              Save Campaign
            </Button>
          </nav>
        </div>
      </header>
      <div className="container py-6">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/campaigns">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Create New Campaign</h1>
        </div>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Campaign Details</TabsTrigger>
            <TabsTrigger value="audience">Target Audience</TabsTrigger>
            <TabsTrigger value="script">Call Script</TabsTrigger>
            <TabsTrigger value="agents">Assign Agents</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="recording">Recording</TabsTrigger>
            <TabsTrigger value="crm">CRM Integration</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>Basic information about your calling campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter campaign name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose of this campaign"
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" value={formData.startDate} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Initial Status</Label>
                  <Select defaultValue={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
                <CardDescription>Define who will receive calls in this campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="audienceType">Audience Type</Label>
                  <Select
                    defaultValue={formData.audienceType}
                    onValueChange={(value) => handleSelectChange("audienceType", value)}
                  >
                    <SelectTrigger id="audienceType">
                      <SelectValue placeholder="Select audience type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="existing">Existing Customers</SelectItem>
                      <SelectItem value="leads">New Leads</SelectItem>
                      <SelectItem value="custom">Custom List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactList">Contact List</Label>
                  <Select onValueChange={(value) => handleSelectChange("contactList", value)}>
                    <SelectTrigger id="contactList">
                      <SelectValue placeholder="Select a contact list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium Customers</SelectItem>
                      <SelectItem value="recent">Recent Customers</SelectItem>
                      <SelectItem value="inactive">Inactive Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedCalls">Estimated Number of Calls</Label>
                  <Input
                    id="estimatedCalls"
                    type="number"
                    placeholder="Enter number"
                    type="number"
                    placeholder="Enter number"
                    value={formData.estimatedCalls}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Schedule Settings</CardTitle>
                <CardDescription>Configure when calls will be made</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Days of Week</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button
                        key={day}
                        variant="outline"
                        className={`h-8 w-10 p-0 ${formData.daysOfWeek.includes(day) ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => handleDayToggle(day)}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" value={formData.startTime} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" value={formData.endTime} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    defaultValue={formData.timezone}
                    onValueChange={(value) => handleSelectChange("timezone", value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoSchedule"
                    checked={formData.autoSchedule}
                    onCheckedChange={(checked) => setFormData({ ...formData, autoSchedule: checked })}
                  />
                  <Label htmlFor="autoSchedule">Enable automatic scheduling optimization</Label>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Call Script</CardTitle>
                  <CardDescription>Define what agents will say during calls</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scriptName">Script Name</Label>
                  <Input
                    id="scriptName"
                    placeholder="Enter script name"
                    value={formData.scriptName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scriptContent">Script Content</Label>
                  <Textarea
                    id="scriptContent"
                    placeholder="Enter the script that agents will follow"
                    className="min-h-[200px]"
                    value={formData.scriptContent}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Script Variables</Label>
                  <div className="rounded-md border p-3">
                    <div className="text-sm text-muted-foreground">
                      Use these variables in your script to personalize calls:
                    </div>
                    <div className="mt-2 space-y-1 text-sm">
                      <div>
                        <code>{"{customer_name}"}</code> - Customer's name
                      </div>
                      <div>
                        <code>{"{company_name}"}</code> - Company name
                      </div>
                      <div>
                        <code>{"{product_name}"}</code> - Product name
                      </div>
                      <div>
                        <code>{"{last_purchase_date}"}</code> - Last purchase date
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Assign Agents</CardTitle>
                  <CardDescription>Select agents who will make calls for this campaign</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => alert("Add agent functionality would open here")}
                >
                  <Plus className="h-4 w-4" />
                  Add Agent
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.selectedAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{agent.experience}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveAgent(agent.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recording Settings</CardTitle>
                <CardDescription>Configure call recording options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enableRecording"
                    checked={formData.enableRecording}
                    onCheckedChange={(checked) => setFormData({ ...formData, enableRecording: checked })}
                  />
                  <Label htmlFor="enableRecording">Enable call recording</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recordingConsent">Recording Consent Message</Label>
                  <Textarea
                    id="recordingConsent"
                    placeholder="This call may be recorded for quality and training purposes..."
                    className="min-h-[80px]"
                    value={formData.recordingConsent}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storageDuration">Storage Duration</Label>
                  <Select
                    defaultValue={formData.storageDuration}
                    onValueChange={(value) => handleSelectChange("storageDuration", value)}
                  >
                    <SelectTrigger id="storageDuration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoTranscribe"
                    checked={formData.autoTranscribe}
                    onCheckedChange={(checked) => setFormData({ ...formData, autoTranscribe: checked })}
                  />
                  <Label htmlFor="autoTranscribe">Automatically transcribe recordings</Label>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>CRM Integration</CardTitle>
                <CardDescription>Configure how campaign data syncs with your CRM</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crmSystem">CRM System</Label>
                  <Select
                    defaultValue={formData.crmSystem}
                    onValueChange={(value) => handleSelectChange("crmSystem", value)}
                  >
                    <SelectTrigger id="crmSystem">
                      <SelectValue placeholder="Select CRM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salesforce">Salesforce</SelectItem>
                      <SelectItem value="hubspot">HubSpot</SelectItem>
                      <SelectItem value="zoho">Zoho CRM</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data Sync Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="syncContacts"
                        checked={formData.syncContacts}
                        onCheckedChange={(checked) => setFormData({ ...formData, syncContacts: checked })}
                      />
                      <Label htmlFor="syncContacts">Sync contacts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="syncCalls"
                        checked={formData.syncCalls}
                        onCheckedChange={(checked) => setFormData({ ...formData, syncCalls: checked })}
                      />
                      <Label htmlFor="syncCalls">Sync call records</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="syncOutcomes"
                        checked={formData.syncOutcomes}
                        onCheckedChange={(checked) => setFormData({ ...formData, syncOutcomes: checked })}
                      />
                      <Label htmlFor="syncOutcomes">Sync call outcomes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="createTasks"
                        checked={formData.createTasks}
                        onCheckedChange={(checked) => setFormData({ ...formData, createTasks: checked })}
                      />
                      <Label htmlFor="createTasks">Create follow-up tasks in CRM</Label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="twoWaySync"
                    checked={formData.twoWaySync}
                    onCheckedChange={(checked) => setFormData({ ...formData, twoWaySync: checked })}
                  />
                  <Label htmlFor="twoWaySync">Enable two-way synchronization</Label>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSaveCampaign}>Save Campaign</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const agents = [
  {
    id: 1,
    name: "Alex Johnson",
    experience: "Senior Agent • 3 years",
  },
  {
    id: 2,
    name: "Maria Garcia",
    experience: "Senior Agent • 2 years",
  },
  {
    id: 3,
    name: "David Kim",
    experience: "Junior Agent • 1 year",
  },
]

