"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AnalyticsData } from "@/types";

function addDummyDays(data: { date: string; count: number }[]) {
  // Get the date from the single data point
  const date = data[0]?.date || new Date().toISOString().split('T')[0];
  const result = [];

  // Add 4 previous days with zero counts
  for (let i = 4; i >= 0; i--) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - i);
    const dateStr = currentDate.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      count: 0
    });
  }

  // Set the actual count for the real data point
  if (data[0]) {
    const lastIndex = result.findIndex(d => d.date === data[0].date);
    if (lastIndex !== -1) {
      result[lastIndex].count = data[0].count;
    }
  }

  return result;
}

const profileVisitsConfig = {
  visits: {
    label: "Profile Visits",
    color: "hsl(var(--chart-1))",
  },
}

export function ProfileVisitsChart({ data }: { data: AnalyticsData['profileVisits'] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-3xl font-medium eb-garamond">Profile Visits</CardTitle>
          <CardDescription>Number of visitors to your portfolio.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[200px] text-muted-foreground">
          No profile visits data available
        </CardContent>
      </Card>
    );
  }

  // Get unique dates to check data points
  const uniqueDates = new Set(data.map(d => d.date));
  
  // Process the data based on number of unique dates
  const unsortedData = uniqueDates.size === 1 
    ? addDummyDays(data).map(item => ({
        date: item.date,
        visits: item.count,
      }))
    : data.map(item => ({
        date: item.date,
        visits: item.count,
      }));

  // Sort data chronologically
  const chartData = unsortedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Calculate max value for Y-axis
  const maxVisits = Math.max(...chartData.map(d => d.visits));
  const yAxisMax = Math.ceil(maxVisits);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-3xl font-medium eb-garamond">Profile Visits</CardTitle>
        <CardDescription>Number of visitors to your portfolio.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={profileVisitsConfig} className="min-h-[200px] max-h-[500px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              domain={[0, yAxisMax]}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="visits"
              strokeWidth={2}
              activeDot={{ r: 4 }}
              stroke="var(--color-visits)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

interface ProjectChartProps {
  projectName: string;
  data: {
    date: string;
    count: number;
  }[];
}

function ProjectChart({ projectName, data }: ProjectChartProps) {
  // Get unique dates to check data points
  const uniqueDates = new Set(data.map(d => d.date));
  
  // Process the data based on number of unique dates
  const unsortedData = uniqueDates.size === 1
    ? addDummyDays(data).map(item => ({
        date: item.date,
        clicks: item.count,
      }))
    : data.map(item => ({
        date: item.date,
        clicks: item.count,
      }));

  // Sort data chronologically
  const chartData = unsortedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate max value for Y-axis
  const maxClicks = Math.max(...chartData.map(d => d.clicks));
  const yAxisMax = Math.ceil(maxClicks * 1.2); // Add 20% padding

  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardHeader className="pt-4">
        <CardTitle className="truncate text-2xl font-medium eb-garamond">{projectName}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[350px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              domain={[0, yAxisMax]}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="clicks"
              strokeWidth={2}
              activeDot={{ r: 4 }}
              stroke="var(--color-clicks)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ProjectClicksChart({ data }: { data: AnalyticsData['projectClicks'] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-3xl font-medium eb-garamond">Project Clicks</CardTitle>
          <CardDescription>Number of clicks on your projects.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[200px] text-muted-foreground">
          No project analytics data available
        </CardContent>
      </Card>
    );
  }

  // Process data to group by project
  const projectsData = data.reduce((acc, curr) => {
    if (!acc[curr.projectId]) {
      acc[curr.projectId] = {
        name: curr.projectName,
        data: [],
      };
    }
    acc[curr.projectId].data.push({
      date: curr.date,
      count: curr.count,
    });
    return acc;
  }, {} as Record<string, { name: string; data: { date: string; count: number }[] }>);

  // Sort projects by latest timestamp and total clicks
  const sortedProjects = Object.entries(projectsData)
    .map(([id, project]) => ({
      id,
      name: project.name,
      data: project.data.sort((a, b) => a.date.localeCompare(b.date)),
      latestDate: project.data.reduce((max, curr) => curr.date > max ? curr.date : max, ""),
      totalClicks: project.data.reduce((sum, curr) => sum + curr.count, 0),
    }))
    .sort((a, b) => {
      const dateCompare = b.latestDate.localeCompare(a.latestDate);
      if (dateCompare !== 0) return dateCompare;
      return b.totalClicks - a.totalClicks;
    });

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-3xl font-medium eb-garamond">Project Clicks</CardTitle>
        <CardDescription>Includes clicks on both GitHub and deployed project link.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {sortedProjects.map((project) => (
            <ProjectChart
              key={project.id}
              projectName={project.name}
              data={project.data}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
