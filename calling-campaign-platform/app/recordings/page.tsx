"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Calendar, Download, Pause, Phone, Play, Search, Users, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

// Update the RecordingRow component to include state and handlers
function RecordingRow({ recording }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulate playback progress
  React.useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 5
        })
      }, 500)
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const handleDownload = () => {
    alert(`Downloading recording ${recording.id}`)
  }

  return (
    <TableRow>
      <TableCell>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={togglePlayback}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        </Button>
      </TableCell>
      <TableCell className="font-medium">{recording.id}</TableCell>
      <TableCell>{recording.campaign}</TableCell>
      <TableCell>{recording.agent}</TableCell>
      <TableCell>{recording.customer}</TableCell>
      <TableCell>{recording.duration}</TableCell>
      <TableCell>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            recording.outcome === "Successful"
              ? "bg-green-100 text-green-800"
              : recording.outcome === "Callback"
                ? "bg-blue-100 text-blue-800"
                : recording.outcome === "Rejected"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {recording.outcome}
        </span>
      </TableCell>
      <TableCell>{recording.date}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleDownload}>
          <Download className="h-4 w-4" />
          <span className="sr-only">Download</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}

// Update the RecordingsPage component to include state and handlers
export default function RecordingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filteredRecordings, setFilteredRecordings] = useState(recordings)
  const [selectedCampaign, setSelectedCampaign] = useState("all")

  // Handler for search input
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    filterRecordings(query, activeTab, selectedCampaign)
  }

  // Handler for tab change
  const handleTabChange = (value) => {
    setActiveTab(value)

    filterRecordings(searchQuery, value, selectedCampaign)
  }

  // Handler for campaign filter
  const handleCampaignFilter = (value) => {
    setSelectedCampaign(value)

    filterRecordings(searchQuery, activeTab, value)
  }

  // Filter recordings based on search, tab, and campaign
  const filterRecordings = (query, tab, campaign) => {
    let filtered = [...recordings]

    // Filter by tab (outcome)
    if (tab !== "all") {
      filtered = filtered.filter((recording) => recording.outcome.toLowerCase() === tab.toLowerCase())
    }

    // Filter by campaign
    if (campaign !== "all") {
      filtered = filtered.filter((recording) => recording.campaign.toLowerCase().includes(campaign.toLowerCase()))
    }

    // Filter by search query
    if (query.trim() !== "") {
      filtered = filtered.filter(
        (recording) =>
          recording.id.toLowerCase().includes(query.toLowerCase()) ||
          recording.campaign.toLowerCase().includes(query.toLowerCase()) ||
          recording.agent.toLowerCase().includes(query.toLowerCase()) ||
          recording.customer.toLowerCase().includes(query.toLowerCase()),
      )
    }

    setFilteredRecordings(filtered)
  }

  // Handler for export button
  const handleExport = () => {
    alert("Exporting selected recordings")
  }

  // Handler for download selected button
  const handleDownloadSelected = () => {
    alert("Downloading selected recordings")
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
            <Button size="sm" onClick={handleDownloadSelected}>
              Download Selected
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
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
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
              <h1 className="text-2xl font-semibold tracking-tight">Call Recordings</h1>
              <p className="text-muted-foreground">Browse and manage your call recordings</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all" value={selectedCampaign} onValueChange={handleCampaignFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="feedback">Q2 Customer Feedback</SelectItem>
                  <SelectItem value="product">Product Launch</SelectItem>
                  <SelectItem value="service">Service Upgrade</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-1" onClick={handleExport}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search recordings..."
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
              <TabsTrigger value="all">All Recordings</TabsTrigger>
              <TabsTrigger value="successful">Successful</TabsTrigger>
              <TabsTrigger value="callback">Callbacks</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Recordings</CardTitle>
                  <CardDescription>Browse all call recordings from your campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Call ID</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Outcome</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecordings.map((recording) => (
                        <RecordingRow key={recording.id} recording={recording} />
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

const recordings = [
  {
    id: "CALL-1234",
    campaign: "Q2 Customer Feedback",
    agent: "Alex Johnson",
    customer: "John Smith",
    duration: "4:32",
    outcome: "Successful",
    date: "Apr 12, 2023",
  },
  {
    id: "CALL-1235",
    campaign: "Product Launch",
    agent: "Maria Garcia",
    customer: "Sarah Williams",
    duration: "3:45",
    outcome: "Callback",
    date: "Apr 12, 2023",
  },
  {
    id: "CALL-1236",
    campaign: "Service Upgrade",
    agent: "David Kim",
    customer: "Michael Brown",
    duration: "5:12",
    outcome: "Rejected",
    date: "Apr 11, 2023",
  },
  {
    id: "CALL-1237",
    campaign: "Q2 Customer Feedback",
    agent: "Alex Johnson",
    customer: "Emily Davis",
    duration: "4:18",
    outcome: "Successful",
    date: "Apr 11, 2023",
  },
  {
    id: "CALL-1238",
    campaign: "Product Launch",
    agent: "Maria Garcia",
    customer: "Robert Wilson",
    duration: "3:22",
    outcome: "Successful",
    date: "Apr 10, 2023",
  },
  {
    id: "CALL-1239",
    campaign: "Service Upgrade",
    agent: "David Kim",
    customer: "Jennifer Lee",
    duration: "6:05",
    outcome: "Callback",
    date: "Apr 10, 2023",
  },
  {
    id: "CALL-1240",
    campaign: "Q2 Customer Feedback",
    agent: "Sarah Johnson",
    customer: "Thomas Anderson",
    duration: "4:47",
    outcome: "Rejected",
    date: "Apr 9, 2023",
  },
]

