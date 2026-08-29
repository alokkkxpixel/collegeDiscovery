import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.client";
import { recommendationQuerySchema } from "@/lib/zod/college.validation";
import { Exam } from "@/generated/prisma/enums";



export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = recommendationQuerySchema.safeParse({
      exam: searchParams.get("exam"),
      rank: searchParams.get("rank"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { rank } = parsed.data;
    const exam = parsed.data.exam as Exam;

    // Query colleges that have at least one course with cutoffRank >= rank for the selected exam
    const colleges = await prisma.college.findMany({
      where: {
        courses: {
          some: {
            exam: exam,
            cutoffRank: {
              gte: rank,
            },
          },
        },
      },
      include: {
        courses: {
          where: {
            exam: exam,
            cutoffRank: {
              gte: rank,
            },
          },
          orderBy: {
            cutoffRank: "asc", // Show course options from lowest/hardest cutoff to highest/easiest
          },
        },
        placements: {
          orderBy: {
            year: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        rating: "desc", // Rank higher rated colleges first
      },
    });

    const recommendedColleges = colleges.map((college) => ({
      id: college.id,
      name: college.name,
      slug: college.slug,
      location: college.location,
      city: college.city,
      state: college.state,
      fees: college.fees,
      rating: college.rating,
      matchingCourses: college.courses.map((course) => ({
        id: course.id,
        name: course.name,
        exam: course.exam,
        cutoffRank: course.cutoffRank,
        fees: course.fees,
        seats: course.seats,
      })),
      latestPlacement: college.placements[0]
        ? {
            year: college.placements[0].year,
            avgPackage: college.placements[0].avgPackage,
            highestPackage: college.placements[0].highestPackage,
            placementRate: college.placements[0].placementRate,
          }
        : null,
    }));

    return NextResponse.json(
      {
        message: "Recommended colleges fetched successfully",
        data: recommendedColleges,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
