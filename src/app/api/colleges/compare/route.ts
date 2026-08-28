// app/api/colleges/compare/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.client";
import { z } from "zod";
import { compareQuerySchema } from "@/lib/zod/college.validation";



export async function GET(req: NextRequest) {
 try {
   const { searchParams } = new URL(req.url);
  const parsed = compareQuerySchema.safeParse({
    ids: searchParams.get("ids"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { ids } = parsed.data;

  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
    include: {
      courses: { select: { name: true, fees: true, duration: true } },
      placements: {
        orderBy: { year: "desc" },
        take: 1, // most recent year only, for comparison
      },
    },
  });

  // Check if any requested id wasn't found
  if (colleges.length !== ids.length) {
    const foundIds = colleges.map((c) => c.id);
    const missing = ids.filter((id) => !foundIds.includes(id));
    return NextResponse.json(
      { error: `College(s) not found: ${missing.join(", ")}` },
      { status: 404 }
    );
  }

  // Reorder results to match the order the user requested (Prisma doesn't preserve `in` order)
  const ordered = ids.map((id) => colleges.find((c) => c.id === id)!);

  // Shape the response for easy side-by-side rendering
  const comparison = ordered.map((college) => ({
    id: college.id,
    name: college.name,
    slug: college.slug,
    location: college.location,
    fees: college.fees,
    rating: college.rating,
    courseCount: college.courses.length,
    topCourses: college.courses.slice(0, 3).map((c) => c.name),
    latestPlacement: college.placements[0]
      ? {
          year: college.placements[0].year,
          avgPackage: college.placements[0].avgPackage,
          highestPackage: college.placements[0].highestPackage,
          placementRate: college.placements[0].placementRate,
        }
      : null,
  }));

  return NextResponse.json({ data: comparison }, {status: 200});
 } catch (error) {
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
 }
}