import { headers } from "next/headers";
import { ProfileVisitsChart, ProjectClicksChart } from "@/components/analytics-charts";

async function getAnalyticsData() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  
  const res = await fetch(`${protocol}://${host}/api/analytics`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch analytics data");
  return res.json();
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <section className="space-y-6 px-4 h-full w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          View insights about your portfolio&apos;s performance.
          Track visits and engagement over time.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <ProfileVisitsChart data={data.profileVisits} />
        <ProjectClicksChart data={data.projectClicks} />
      </div>
    </section>
  )
}