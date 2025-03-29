"use client"

import Link from "next/link"
import { BarChart3, Calendar, Download, Phone, Users, Settings } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

// Update the AnalyticsPage component to include state and handlers
export default function AnalyticsPage() {
  const [period, setPeriod] = useState("last30days")
  const [activeTab, setActiveTab] = useState("overview")

  // Handler for period change
  const handlePeriodChange = (value) => {
    setPeriod(value)
    // In a real app, this would fetch new data for the selected period
    alert(`Fetching data for period: ${value}`)
  }

  // Handler for tab change
  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  // Handler for export button
  const handleExport = () => {
    alert("Exporting analytics data")
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
            <Button size="sm" onClick={handleExport}>
              Export Reports
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
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
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
              <h1 className="text-2xl font-semibold tracking-tight">Analytics & Reports</h1>
              <p className="text-muted-foreground">Detailed insights and performance metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue={period} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last90days">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-1" onClick={handleExport}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,642</div>
                <p className="text-xs text-muted-foreground">+12.3% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.8%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4m 12s</div>
                <p className="text-xs text-muted-foreground">-18s from last period</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
              <TabsTrigger value="agents">Agent Performance</TabsTrigger>
              <TabsTrigger value="outcomes">Call Outcomes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Call Volume Trends</CardTitle>
                  <CardDescription>Daily call volume over the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      data={callVolumeData}
                      xAxisKey="date"
                      yAxisKey="calls"
                      padding={{ left: 40, bottom: 20 }}
                    >
                      <ChartXAxis />
                      <ChartYAxis />
                      <ChartGrid />
                      <ChartLine strokeWidth={2} curve="monotone" className="stroke-primary" />
                      <ChartTooltip>
                        {({ point }) => {
                          if (!point?.data) return null
                          return (
                            <ChartTooltipContent>
                              <p className="font-medium">{point.data.date}</p>
                              <p className="text-sm text-muted-foreground">{point.data.calls} calls</p>
                            </ChartTooltipContent>
                          )
                        }}
                      </ChartTooltip>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Call Outcomes</CardTitle>
                    <CardDescription>Distribution of call results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <Chart
                        type="pie"
                        data={callOutcomesData}
                        options={{
                          plugins: {
                            legend: {
                              position: "right",
                            },
                            tooltip: {
                              callbacks: {
                                label: (context) => {
                                  const label = context.label || ""
                                  const value = context.raw || 0
                                  const percentage = Math.round((value / 100) * 100)
                                  return `${label}: ${percentage}%`
                                },
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Comparison</CardTitle>
                    <CardDescription>Performance across active campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <Chart
                        type="bar"
                        data={campaignComparisonData}
                        options={{
                          indexAxis: "y",
                          plugins: {
                            legend: {
                              position: "bottom",
                            },
                          },
                          scales: {
                            x: {
                              stacked: true,
                              max: 100,
                            },
                            y: {
                              stacked: true,
                            },
                          },
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Detailed metrics for each campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {campaignPerformanceData.map((campaign) => (
                      <div key={campaign.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{campaign.name}</h3>
                          <span className="text-sm text-muted-foreground">{campaign.period}</span>
                        </div>
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Calls Made</p>
                            <p className="text-xl font-medium">{campaign.callsMade}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Conversion Rate</p>
                            <p className="text-xl font-medium">{campaign.conversionRate}%</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Avg. Duration</p>
                            <p className="text-xl font-medium">{campaign.avgDuration}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Cost per Conversion</p>
                            <p className="text-xl font-medium">${campaign.costPerConversion}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: `${campaign.progress}%` }} />
                          </div>
                          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                            <span>Progress: {campaign.progress}%</span>
                            <span>
                              {campaign.completedCalls} / {campaign.totalCalls} calls
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                  <CardDescription>Performance metrics for each agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {agentPerformanceData.map((agent) => (
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
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Calls Completed</p>
                            <p className="text-xl font-medium">{agent.callsCompleted}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Success Rate</p>
                            <p className="text-xl font-medium">{agent.successRate}%</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Avg. Call Time</p>
                            <p className="text-xl font-medium">{agent.avgCallTime}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                            <p className="text-xl font-medium">{agent.customerSatisfaction}/5</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Efficiency</span>
                                <span>{agent.metrics.efficiency}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-blue-500"
                                  style={{ width: `${agent.metrics.efficiency}%` }}
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Quality</span>
                                <span>{agent.metrics.quality}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-green-500"
                                  style={{ width: `${agent.metrics.quality}%` }}
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Conversion</span>
                                <span>{agent.metrics.conversion}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-purple-500"
                                  style={{ width: `${agent.metrics.conversion}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="outcomes">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Call Outcomes Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of call results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 font-medium">Outcome Distribution</h3>
                      <div className="h-[300px]">
                        <Chart
                          type="doughnut"
                          data={callOutcomesDetailedData}
                          options={{
                            plugins: {
                              legend: {
                                position: "right",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-4 font-medium">Outcome Trends</h3>
                      <div className="h-[300px]">
                        <Chart
                          type="line"
                          data={outcomesTrendData}
                          options={{
                            plugins: {
                              legend: {
                                position: "bottom",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 font-medium">Outcome by Time of Day</h3>
                    <div className="h-[300px]">
                      <Chart
                        type="bar"
                        data={outcomesByTimeData}
                        options={{
                          plugins: {
                            legend: {
                              position: "bottom",
                            },
                          },
                        }}
                      />
                    </div>
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

// Sample data for charts
const callVolumeData = [
  { date: "Apr 1", calls: 145 },
  { date: "Apr 2", calls: 132 },
  { date: "Apr 3", calls: 164 },
  { date: "Apr 4", calls: 187 },
  { date: "Apr 5", calls: 142 },
  { date: "Apr 6", calls: 95 },
  { date: "Apr 7", calls: 102 },
  { date: "Apr 8", calls: 154 },
  { date: "Apr 9", calls: 168 },
  { date: "Apr 10", calls: 172 },
  { date: "Apr 11", calls: 198 },
  { date: "Apr 12", calls: 187 },
  { date: "Apr 13", calls: 120 },
  { date: "Apr 14", calls: 118 },
]

const callOutcomesData = {
  labels: ["Successful", "Callback Scheduled", "Not Interested", "No Answer", "Other"],
  datasets: [
    {
      data: [35, 20, 25, 15, 5],
      backgroundColor: [
        "rgba(34, 197, 94, 0.7)",
        "rgba(59, 130, 246, 0.7)",
        "rgba(249, 115, 22, 0.7)",
        "rgba(156, 163, 175, 0.7)",
        "rgba(107, 114, 128, 0.7)",
      ],
      borderColor: [
        "rgb(34, 197, 94)",
        "rgb(59, 130, 246)",
        "rgb(249, 115, 22)",
        "rgb(156, 163, 175)",
        "rgb(107, 114, 128)",
      ],
      borderWidth: 1,
    },
  ],
}

const campaignComparisonData = {
  labels: ["Q2 Customer Feedback", "Product Launch", "Service Upgrade", "Satisfaction Survey", "New Feature Feedback"],
  datasets: [
    {
      label: "Successful",
      data: [35, 42, 28, 38, 31],
      backgroundColor: "rgba(34, 197, 94, 0.7)",
    },
    {
      label: "Callback",
      data: [20, 18, 22, 15, 25],
      backgroundColor: "rgba(59, 130, 246, 0.7)",
    },
    {
      label: "Not Interested",
      data: [25, 20, 30, 22, 24],
      backgroundColor: "rgba(249, 115, 22, 0.7)",
    },
    {
      label: "No Answer",
      data: [15, 12, 14, 18, 16],
      backgroundColor: "rgba(156, 163, 175, 0.7)",
    },
    {
      label: "Other",
      data: [5, 8, 6, 7, 4],
      backgroundColor: "rgba(107, 114, 128, 0.7)",
    },
  ],
}

const campaignPerformanceData = [
  {
    id: 1,
    name: "Q2 Customer Feedback",
    period: "Apr 1 - Apr 30",
    callsMade: 342,
    conversionRate: 38.6,
    avgDuration: "4m 32s",
    costPerConversion: 12.45,
    progress: 68,
    completedCalls: 342,
    totalCalls: 500,
  },
  {
    id: 2,
    name: "Product Launch Announcement",
    period: "Apr 5 - Apr 25",
    callsMade: 189,
    conversionRate: 42.3,
    avgDuration: "3m 58s",
    costPerConversion: 10.87,
    progress: 63,
    completedCalls: 189,
    totalCalls: 300,
  },
  {
    id: 3,
    name: "Service Upgrade Offer",
    period: "Mar 25 - Apr 15",
    callsMade: 120,
    conversionRate: 28.4,
    avgDuration: "5m 12s",
    costPerConversion: 15.32,
    progress: 48,
    completedCalls: 120,
    totalCalls: 250,
  },
]

const agentPerformanceData = [
  {
    id: 1,
    name: "Alex Johnson",
    experience: "Senior Agent • 3 years",
    callsCompleted: 245,
    successRate: 98,
    avgCallTime: "4m 12s",
    customerSatisfaction: 4.8,
    metrics: {
      efficiency: 95,
      quality: 92,
      conversion: 88,
    },
  },
  {
    id: 2,
    name: "Maria Garcia",
    experience: "Senior Agent • 2 years",
    callsCompleted: 231,
    successRate: 95,
    avgCallTime: "3m 45s",
    customerSatisfaction: 4.7,
    metrics: {
      efficiency: 92,
      quality: 94,
      conversion: 85,
    },
  },
  {
    id: 3,
    name: "David Kim",
    experience: "Junior Agent • 1 year",
    callsCompleted: 218,
    successRate: 92,
    avgCallTime: "4m 32s",
    customerSatisfaction: 4.5,
    metrics: {
      efficiency: 88,
      quality: 90,
      conversion: 82,
    },
  },
]

const callOutcomesDetailedData = {
  labels: [
    "Sale Completed",
    "Demo Scheduled",
    "Callback Requested",
    "Not Interested",
    "Wrong Number",
    "No Answer",
    "Voicemail",
  ],
  datasets: [
    {
      data: [25, 10, 20, 15, 10, 12, 8],
      backgroundColor: [
        "rgba(34, 197, 94, 0.7)",
        "rgba(16, 185, 129, 0.7)",
        "rgba(59, 130, 246, 0.7)",
        "rgba(249, 115, 22, 0.7)",
        "rgba(239, 68, 68, 0.7)",
        "rgba(156, 163, 175, 0.7)",
        "rgba(107, 114, 128, 0.7)",
      ],
      borderColor: [
        "rgb(34, 197, 94)",
        "rgb(16, 185, 129)",
        "rgb(59, 130, 246)",
        "rgb(249, 115, 22)",
        "rgb(239, 68, 68)",
        "rgb(156, 163, 175)",
        "rgb(107, 114, 128)",
      ],
      borderWidth: 1,
    },
  ],
}

const outcomesTrendData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Sale Completed",
      data: [22, 24, 27, 25],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      tension: 0.3,
    },
    {
      label: "Callback Requested",
      data: [18, 22, 19, 20],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.3,
    },
    {
      label: "Not Interested",
      data: [16, 14, 15, 15],
      borderColor: "rgb(249, 115, 22)",
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      tension: 0.3,
    },
  ],
}

const outcomesByTimeData = {
  labels: ["9-10 AM", "10-11 AM", "11-12 PM", "12-1 PM", "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM"],
  datasets: [
    {
      label: "Successful",
      data: [28, 32, 35, 25, 30, 34, 38, 32],
      backgroundColor: "rgba(34, 197, 94, 0.7)",
    },
    {
      label: "Callback",
      data: [22, 20, 18, 15, 19, 21, 20, 22],
      backgroundColor: "rgba(59, 130, 246, 0.7)",
    },
    {
      label: "Not Interested",
      data: [18, 16, 15, 20, 22, 18, 16, 19],
      backgroundColor: "rgba(249, 115, 22, 0.7)",
    },
  ],
}

