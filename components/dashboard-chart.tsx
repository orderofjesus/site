"use client"

import * as React from "react"
import { IconTrendingUp } from "@tabler/icons-react"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  registrations: {
    label: "Registrations",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface Registration {
  registeredAt: number
}

interface DashboardChartProps {
  registrations: Registration[]
}

export function DashboardChart({ registrations }: DashboardChartProps) {
  const [timeRange, setTimeRange] = React.useState("6m")

  const getMonthsToShow = () => {
    switch (timeRange) {
      case "3m":
        return 3
      case "6m":
        return 6
      case "12m":
        return 12
      default:
        return 6
    }
  }

  const monthsToShow = getMonthsToShow()
  
  // Generate chart data for the last N months
  const chartData = React.useMemo(() => {
    const data = []
    const now = new Date()
    
    for (let i = monthsToShow - 1; i >= 0; i--) {
      // Get the first day of the month N months ago
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      
      const count = registrations.filter(reg => {
        const regDate = new Date(reg.registeredAt)
        return regDate >= date && regDate < nextMonth
      }).length
      
      data.push({
        month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        registrations: count,
      })
    }
    
    return data
  }, [registrations, monthsToShow])

  const totalRegistrations = registrations.length

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Event Registration Trends</CardTitle>
          <CardDescription>
            Your event registrations over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a time range"
          >
            <SelectValue placeholder="Last 6 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="3m" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="12m" className="rounded-lg">
              Last 12 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillRegistrations" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-registrations)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-registrations)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value.split(" ")[0]
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="registrations"
              type="natural"
              fill="url(#fillRegistrations)"
              stroke="var(--color-registrations)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total registrations: {totalRegistrations} <IconTrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing event registrations for the last {monthsToShow} months
        </div>
      </CardFooter>
    </Card>
  )
}
