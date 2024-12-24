"use client"

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { ProfileVisitsChart, ProjectClicksChart } from "@/components/analytics-charts";
import { AnalyticsData } from "@/types";

function AnalyticsPage() {
  const { user } = useUser();
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/analytics?userId=${user?.id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch analytics data");
        const analyticsData = await res.json();
        setData(analyticsData);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  if (!data) return <div>Loading...</div>;

  return (
    <section className="space-y-6 px-4 h-full w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-medium eb-garamond mb-2">Analytics</h1>
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

export default AnalyticsPage;