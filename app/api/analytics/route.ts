import { db } from "@/db/drizzle";
import { profileVisits, projectsClicks, projects } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

function addDummyDays(data: { date: string; count: number }[]) {
  const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date));
  const latestDate = new Date(sortedData[0]?.date || new Date());
  const result = [];

  // Add 4 previous days with zero counts
  for (let i = 4; i >= 0; i--) {
    const date = new Date(latestDate);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Find if we have real data for this date
    const existingData = data.find(d => d.date === dateStr);
    result.push({
      date: dateStr,
      count: existingData?.count || 0
    });
  }

  return result;
}

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get profile visits data grouped by day for the specific user
    const profileVisitsData = await db
      .select({
        date: sql<string>`to_char(to_timestamp(timestamp), 'YYYY-MM-DD')`,
        count: sql<number>`count(*)`,
      })
      .from(profileVisits)
      .where(sql`${profileVisits.userId} = ${userId}`)
      .groupBy(sql`to_char(to_timestamp(timestamp), 'YYYY-MM-DD')`)
      .orderBy(sql`to_char(to_timestamp(timestamp), 'YYYY-MM-DD')`);

    // Get project clicks data grouped by project and day for the specific user
    const projectClicksData = await db
      .select({
        projectId: projectsClicks.projectId,
        projectName: projects.name,
        date: sql<string>`to_char(to_timestamp(${projectsClicks.timestamp}), 'YYYY-MM-DD')`,
        count: sql<number>`count(*)`,
      })
      .from(projectsClicks)
      .leftJoin(projects, sql`${projects.id} = ${projectsClicks.projectId}`)
      .where(sql`${projects.userId} = ${userId}`)
      .groupBy(projectsClicks.projectId, projects.name, sql`to_char(to_timestamp(${projectsClicks.timestamp}), 'YYYY-MM-DD')`)
      .orderBy(sql`to_char(to_timestamp(${projectsClicks.timestamp}), 'YYYY-MM-DD')`);

    // Process project clicks data to include dummy days for each project
    const projectIds = [...new Set(projectClicksData.map(d => d.projectId))];
    const processedProjectClicks = projectIds.flatMap(projectId => {
      const projectData = projectClicksData
        .filter(d => d.projectId === projectId)
        .map(d => ({ 
          date: d.date, 
          count: d.count,
          projectName: d.projectName || 'Unknown Project'
        }));
      
      return addDummyDays(projectData).map(d => ({
        ...d,
        projectId,
        projectName: projectData[0]?.projectName || 'Unknown Project'
      }));
    });

    return NextResponse.json({
      profileVisits: addDummyDays(profileVisitsData),
      projectClicks: processedProjectClicks,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
