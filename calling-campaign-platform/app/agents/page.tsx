"use client"

import Link from "next/link"
import { useState } from "react"
import { BarChart3, Calendar, Phone, Plus, Search, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filteredAgents, setFilteredAgents] = useState(agentsList)

  // Handler for search input
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      setFilteredAgents(agentsList)
    } else {
      const filtered = agentsList.filter((agent) => agent.name.toLowerCase().includes(query.toLowerCase()))
      setFilteredAgents(filtered)
    }
  }

  // Handler for tab change
  const handleTabChange = (value) => {
    setActiveTab(value)

    if (value === "all") {
      setFilteredAgents(agentsList)
    } else {
      const filtered = agentsList.filter((agent) => agent.status.toLowerCase() === value.toLowerCase())
      setFilteredAgents(filtered)
    }
  }

  // Handler for adding an agent
  const handleAddAgent = () => {
    alert("Add agent functionality would open here")
  }

  // Handler for filter button
  const handleFilter = () => {
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
            <Button size="sm" onClick={handleAddAgent}>
              Add Agent
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
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
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
              <h1 className="text-2xl font-semibold tracking-tight">Agents</h1>
              <p className="text-muted-foreground">Manage your calling agents</p>
            </div>
            <Button className="flex items-center gap-1" onClick={handleAddAgent}>
              <Plus className="h-4 w-4" />
              Add Agent
            </Button>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search agents..."
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
              <TabsTrigger value="all">All Agents</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Agents</CardTitle>
                  <CardDescription>Manage all your calling agents from one place.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Calls Completed</TableHead>
                        <TableHead>Success Rate</TableHead>
                        <TableHead>Current Campaign</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAgents.map((agent) => (
                        <TableRow key={agent.id}>
                          <TableCell className="font-medium">{agent.name}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                agent.status === "Available"
                                  ? "bg-green-100 text-green-800"
                                  : agent.status === "Assigned"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {agent.status}
                            </span>
                          </TableCell>
                          <TableCell>{agent.experience}</TableCell>
                          <TableCell>{agent.callsCompleted}</TableCell>
                          <TableCell>{agent.successRate}%</TableCell>
                          <TableCell>{agent.currentCampaign || "—"}</TableCell>
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

const agentsList = [
  {
    id: 1,
    name: "Alex Johnson",
    status: "Assigned",
    experience: "3 years",
    callsCompleted: 1245,
    successRate: 98,
    currentCampaign: "Q2 Customer Feedback",
  },
  {
    id: 2,
    name: "Maria Garcia",
    status: "Assigned",
    experience: "2 years",
    callsCompleted: 987,
    successRate: 95,
    currentCampaign: "Product Launch Announcement",
  },
  {
    id: 3,
    name: "David Kim",
    status: "Available",
    experience: "1 year",
    callsCompleted: 543,
    successRate: 92,
    currentCampaign: null,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    status: "Available",
    experience: "2 years",
    callsCompleted: 876,
    successRate: 94,
    currentCampaign: null,
  },
  {
    id: 5,
    name: "Michael Chen",
    status: "Assigned",
    experience: "4 years",
    callsCompleted: 1532,
    successRate: 97,
    currentCampaign: "New Feature Feedback",
  },
  {
    id: 6,
    name: "Jessica Williams",
    status: "Inactive",
    experience: "1 year",
    callsCompleted: 321,
    successRate: 88,
    currentCampaign: null,
  },
  {
    id: 7,
    name: "Robert Taylor",
    status: "Available",
    experience: "2 years",
    callsCompleted: 765,
    successRate: 91,
    currentCampaign: null,
  },
]

