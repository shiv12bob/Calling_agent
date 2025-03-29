"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Calendar, ChevronLeft, ChevronRight, Clock, Phone, Plus, Users, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Update the SchedulePage component to include state and handlers
export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState("April 2023")
  const [activeTab, setActiveTab] = useState("calendar")
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  // Handler for previous month
  const handlePreviousMonth = () => {
    setCurrentMonth("March 2023")
  }

  // Handler for next month
  const handleNextMonth = () => {
    setCurrentMonth("May 2023")
  }

  // Handler for tab change
  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  // Handler for scheduling a campaign
  const handleScheduleCampaign = () => {
    setShowScheduleDialog(true)
  }

  // Handler for saving a schedule
  const handleSaveSchedule = () => {
    alert("Schedule saved successfully!")
    setShowScheduleDialog(false)
  }

  // Handler for editing a campaign schedule
  const handleEditCampaign = (campaignId) => {
    setSelectedCampaign(campaignId)
    alert(`Editing schedule for campaign ${campaignId}`)
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
            <Button size="sm" onClick={handleScheduleCampaign}>
              Schedule Campaign
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
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
            >
              <Calendar className="h-4 w-4" />
              Schedule
            </Link>
            <Link
              href="/integrations"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
              Integrations
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Campaign Schedule</h1>
              <p className="text-muted-foreground">Manage and schedule your calling campaigns</p>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1" onClick={handleScheduleCampaign}>
                    <Plus className="h-4 w-4" />
                    Schedule Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Schedule Campaign</DialogTitle>
                    <DialogDescription>Set up the schedule for your calling campaign</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="campaign">Campaign</Label>
                      <Select>
                        <SelectTrigger id="campaign">
                          <SelectValue placeholder="Select campaign" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feedback">Q2 Customer Feedback</SelectItem>
                          <SelectItem value="product">Product Launch</SelectItem>
                          <SelectItem value="service">Service Upgrade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input id="start-date" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input id="end-date" type="date" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input id="start-time" type="time" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input id="end-time" type="time" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="days">Days of Week</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                          <Button
                            key={day}
                            variant="outline"
                            className="h-8 w-10 p-0"
                            data-selected={day !== "Sat" && day !== "Sun"}
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="agents">Assign Agents</Label>
                      <Select>
                        <SelectTrigger id="agents">
                          <SelectValue placeholder="Select agents" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Available Agents</SelectItem>
                          <SelectItem value="senior">Senior Agents Only</SelectItem>
                          <SelectItem value="custom">Custom Selection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveSchedule}>
                      Save Schedule
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="calendar" value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="agents">Agent Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{currentMonth}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePreviousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous month</span>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next month</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-sm">
                    {/* Empty cells for previous month */}
                    {[...Array(6)].map((_, i) => (
                      <div key={`prev-${i}`} className="h-24 rounded-md bg-muted/20 p-1 text-muted-foreground">
                        <div className="text-right">{26 + i}</div>
                      </div>
                    ))}

                    {/* Current month days */}
                    {[...Array(30)].map((_, i) => {
                      const day = i + 1
                      const hasEvents = scheduledCampaigns.some((campaign) => campaign.dates.includes(`Apr ${day}`))

                      return (
                        <div
                          key={`day-${day}`}
                          className={`h-24 rounded-md p-1 ${
                            hasEvents ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/20"
                          }`}
                          onClick={() => hasEvents && handleScheduleCampaign()}
                        >
                          <div className="text-right">{day}</div>
                          <div className="mt-1 space-y-1">
                            {scheduledCampaigns
                              .filter((campaign) => campaign.dates.includes(`Apr ${day}`))
                              .map((campaign) => (
                                <div
                                  key={`${day}-${campaign.id}`}
                                  className="flex items-center gap-1 rounded bg-primary/10 px-1 py-0.5 text-xs cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditCampaign(campaign.id)
                                  }}
                                >
                                  <div
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      campaign.id === 1
                                        ? "bg-blue-500"
                                        : campaign.id === 2
                                          ? "bg-green-500"
                                          : "bg-orange-500"
                                    }`}
                                  />
                                  <span className="truncate">{campaign.name}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                    })}

                    {/* Empty cells for next month */}
                    {[...Array(5)].map((_, i) => (
                      <div key={`next-${i}`} className="h-24 rounded-md bg-muted/20 p-1 text-muted-foreground">
                        <div className="text-right">{i + 1}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Campaigns</CardTitle>
                  <CardDescription>View all your scheduled calling campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {scheduledCampaigns.map((campaign) => (
                      <div key={campaign.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{campaign.name}</h3>
                          <Button variant="outline" size="sm" onClick={() => handleEditCampaign(campaign.id)}>
                            Edit
                          </Button>
                        </div>
                        <div className="grid gap-4 rounded-md border p-4 md:grid-cols-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Date Range</span>
                            </div>
                            <p>{campaign.dateRange}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Time Window</span>
                            </div>
                            <p>{campaign.timeWindow}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>Assigned Agents</span>
                            </div>
                            <p>{campaign.agents}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {campaign.dates.slice(0, 5).map((date) => (
                            <span
                              key={`${campaign.id}-${date}`}
                              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium"
                            >
                              {date}
                            </span>
                          ))}
                          {campaign.dates.length > 5 && (
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                              +{campaign.dates.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Availability</CardTitle>
                  <CardDescription>Manage agent schedules and availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {agentAvailability.map((agent) => (
                      <div key={agent.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <p className="text-sm text-muted-foreground">{agent.experience}</p>
                          </div>
                        </div>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-7 border-b text-center text-sm font-medium">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                              <div key={day} className="border-r py-2 last:border-r-0">
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 text-center">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                              const available = agent.availability.includes(day)
                              return (
                                <div key={`${agent.id}-${day}`} className="border-r p-2 last:border-r-0">
                                  <div
                                    className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${
                                      available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {available ? "✓" : "✗"}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <div className="grid grid-cols-7 border-t text-center text-xs">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                              const hoursValue = agent.hours[day] || "N/A"
                              return (
                                <div key={`${agent.id}-${day}-hours`} className="border-r p-2 last:border-r-0">
                                  {hoursValue}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

const scheduledCampaigns = [
  {
    id: 1,
    name: "Q2 Customer Feedback",
    dateRange: "Apr 10 - Apr 30, 2023",
    timeWindow: "9:00 AM - 5:00 PM",
    agents: "8 agents assigned",
    dates: [
      "Apr 10",
      "Apr 11",
      "Apr 12",
      "Apr 13",
      "Apr 14",
      "Apr 17",
      "Apr 18",
      "Apr 19",
      "Apr 20",
      "Apr 21",
      "Apr 24",
      "Apr 25",
      "Apr 26",
      "Apr 27",
      "Apr 28",
    ],
  },
  {
    id: 2,
    name: "Product Launch Announcement",
    dateRange: "Apr 5 - Apr 25, 2023",
    timeWindow: "10:00 AM - 4:00 PM",
    agents: "6 agents assigned",
    dates: [
      "Apr 5",
      "Apr 6",
      "Apr 7",
      "Apr 10",
      "Apr 11",
      "Apr 12",
      "Apr 13",
      "Apr 14",
      "Apr 17",
      "Apr 18",
      "Apr 19",
      "Apr 20",
      "Apr 21",
      "Apr 24",
      "Apr 25",
    ],
  },
  {
    id: 3,
    name: "Service Upgrade Offer",
    dateRange: "Apr 3 - Apr 21, 2023",
    timeWindow: "11:00 AM - 6:00 PM",
    agents: "5 agents assigned",
    dates: [
      "Apr 3",
      "Apr 4",
      "Apr 5",
      "Apr 6",
      "Apr 7",
      "Apr 10",
      "Apr 11",
      "Apr 12",
      "Apr 13",
      "Apr 14",
      "Apr 17",
      "Apr 18",
      "Apr 19",
      "Apr 20",
      "Apr 21",
    ],
  },
]

const agentAvailability = [
  {
    id: 1,
    name: "Alex Johnson",
    experience: "Senior Agent • 3 years",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    hours: {
      Mon: "9:00 AM - 5:00 PM",
      Tue: "9:00 AM - 5:00 PM",
      Wed: "9:00 AM - 5:00 PM",
      Thu: "9:00 AM - 5:00 PM",
      Fri: "9:00 AM - 5:00 PM",
      Sat: "N/A",
      Sun: "N/A",
    },
  },
  {
    id: 2,
    name: "Maria Garcia",
    experience: "Senior Agent • 2 years",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    hours: {
      Mon: "10:00 AM - 6:00 PM",
      Tue: "10:00 AM - 6:00 PM",
      Wed: "10:00 AM - 6:00 PM",
      Thu: "10:00 AM - 6:00 PM",
      Fri: "10:00 AM - 6:00 PM",
      Sat: "N/A",
      Sun: "N/A",
    },
  },
  {
    id: 3,
    name: "David Kim",
    experience: "Junior Agent • 1 year",
    availability: ["Mon", "Wed", "Thu", "Fri", "Sat"],
    hours: {
      Mon: "9:00 AM - 5:00 PM",
      Tue: "N/A",
      Wed: "9:00 AM - 5:00 PM",
      Thu: "9:00 AM - 5:00 PM",
      Fri: "9:00 AM - 5:00 PM",
      Sat: "10:00 AM - 2:00 PM",
      Sun: "N/A",
    },
  },
]

