"use client"

import Link from "next/link"
import { ArrowUpRight, BarChart3, Phone, Users, Calendar, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Add useState import
import { useState } from "react"

// Update the Dashboard component to include state and handlers
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("campaigns")

  // Handler for creating a new campaign
  const handleCreateCampaign = () => {
    window.location.href = "/campaigns/new"
  }

  // Handler for viewing all campaigns
  const handleViewAllCampaigns = () => {
    window.location.href = "/campaigns"
  }

  // Handler for viewing all agents
  const handleViewAllAgents = () => {
    window.location.href = "/agents"
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
            <Link href="#" className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground">
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
              Integrations
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <Button onClick={handleCreateCampaign}>
              <Link href="/campaigns/new" className="flex items-center gap-1">
                New Campaign
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Agents</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+4 new agents</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calls Completed</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,483</div>
                <p className="text-xs text-muted-foreground">+342 from yesterday</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>You have run 12 campaigns this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCampaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between">
                      <div className="grid gap-1">
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {campaign.completedCalls} / {campaign.totalCalls} calls completed
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => (window.location.href = `/campaigns/${campaign.id}`)}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleViewAllCampaigns}>
                  View All Campaigns
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Performing Agents</CardTitle>
                <CardDescription>Based on call completion rate.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.completionRate}% completion rate</p>
                      </div>
                      <div className="font-medium">{agent.callsCompleted}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleViewAllAgents}>
                  View All Agents
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

const recentCampaigns = [
  {
    id: 1,
    name: "Q2 Customer Feedback",
    status: "Active",
    completedCalls: 342,
    totalCalls: 500,
  },
  {
    id: 2,
    name: "Product Launch Announcement",
    status: "Active",
    completedCalls: 189,
    totalCalls: 300,
  },
  {
    id: 3,
    name: "Service Upgrade Offer",
    status: "Paused",
    completedCalls: 120,
    totalCalls: 250,
  },
  {
    id: 4,
    name: "Customer Satisfaction Survey",
    status: "Completed",
    completedCalls: 400,
    totalCalls: 400,
  },
]

const topAgents = [
  {
    id: 1,
    name: "Alex Johnson",
    completionRate: 98,
    callsCompleted: 245,
  },
  {
    id: 2,
    name: "Maria Garcia",
    completionRate: 95,
    callsCompleted: 231,
  },
  {
    id: 3,
    name: "David Kim",
    completionRate: 92,
    callsCompleted: 218,
  },
]

