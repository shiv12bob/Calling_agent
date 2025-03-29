"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, BarChart3, Clock, Phone, Search, Users, Calendar, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Update the CampaignsPage component to include state and handlers
export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns)

  // Handler for search input
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      setFilteredCampaigns(campaigns)
    } else {
      const filtered = campaigns.filter((campaign) => campaign.name.toLowerCase().includes(query.toLowerCase()))
      setFilteredCampaigns(filtered)
    }
  }

  // Handler for tab change
  const handleTabChange = (value) => {
    setActiveTab(value)

    if (value === "all") {
      setFilteredCampaigns(campaigns)
    } else {
      const filtered = campaigns.filter((campaign) => campaign.status.toLowerCase() === value.toLowerCase())
      setFilteredCampaigns(filtered)
    }
  }

  // Handler for creating a new campaign
  const handleCreateCampaign = () => {
    window.location.href = "/campaigns/new"
  }

  // Handler for viewing a campaign
  const handleViewCampaign = (id) => {
    // In a real app, this would navigate to the campaign detail page
    alert(`Viewing campaign ${id}`)
  }

  // Handler for filter button
  const handleFilter = () => {
    // In a real app, this would open a filter dialog
    alert("Filter functionality would open here")
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
            <Button size="sm" onClick={handleCreateCampaign}>
              Create Campaign
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
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
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
              <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
              <p className="text-muted-foreground">Create and manage your calling campaigns</p>
            </div>
            <Button onClick={handleCreateCampaign}>
              <Link href="/campaigns/new" className="flex items-center gap-1">
                New Campaign
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" className="shrink-0" onClick={handleFilter}>
              Filter
            </Button>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Campaigns</CardTitle>
                  <CardDescription>Manage all your calling campaigns from one place.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Agents</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                campaign.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : campaign.status === "Paused"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {campaign.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {campaign.completedCalls} / {campaign.totalCalls} calls
                          </TableCell>
                          <TableCell>{campaign.agents}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{campaign.created}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewCampaign(campaign.id)}>
                              <ArrowUpRight className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Campaigns</CardTitle>
                  <CardDescription>Currently running campaigns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Agents</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell>
                            {campaign.completedCalls} / {campaign.totalCalls} calls
                          </TableCell>
                          <TableCell>{campaign.agents}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{campaign.created}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewCampaign(campaign.id)}>
                              <ArrowUpRight className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

const campaigns = [
  {
    id: 1,
    name: "Q2 Customer Feedback",
    status: "Active",
    completedCalls: 342,
    totalCalls: 500,
    agents: 8,
    created: "2 days ago",
  },
  {
    id: 2,
    name: "Product Launch Announcement",
    status: "Active",
    completedCalls: 189,
    totalCalls: 300,
    agents: 6,
    created: "3 days ago",
  },
  {
    id: 3,
    name: "Service Upgrade Offer",
    status: "Paused",
    completedCalls: 120,
    totalCalls: 250,
    agents: 5,
    created: "1 week ago",
  },
  {
    id: 4,
    name: "Customer Satisfaction Survey",
    status: "Completed",
    completedCalls: 400,
    totalCalls: 400,
    agents: 10,
    created: "2 weeks ago",
  },
  {
    id: 5,
    name: "New Feature Feedback",
    status: "Active",
    completedCalls: 78,
    totalCalls: 200,
    agents: 4,
    created: "1 day ago",
  },
  {
    id: 6,
    name: "Renewal Reminder",
    status: "Paused",
    completedCalls: 45,
    totalCalls: 150,
    agents: 3,
    created: "5 days ago",
  },
]

