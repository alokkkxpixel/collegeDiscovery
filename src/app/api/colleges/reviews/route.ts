import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.client";
import { createReviewSchema } from "@/lib/zod/college.validation";

// GET /api/colleges/reviews - List reviews
// Can filter by collegeId (optional)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get("collegeId");

    const where: any = {};
    if (collegeId) {
      where.collegeId = collegeId;
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        college: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Reviews fetched successfully",
        data: reviews,
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

// POST /api/colleges/reviews - Add a review
export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Missing authentication credentials" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = createReviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { collegeId, rating, comment } = parsed.data;

    // Check if the college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    // Check if the user has already reviewed this college
    const existingReview = await prisma.review.findFirst({
      where: {
        collegeId,
        userId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this college" },
        { status: 400 }
      );
    }

    // Perform database operations in a transaction
    const newReview = await prisma.$transaction(async (tx) => {
      // 1. Create the review
      const review = await tx.review.create({
        data: {
          collegeId,
          userId,
          rating,
          comment,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      // 2. Aggregate the new average rating
      const aggregate = await tx.review.aggregate({
        where: { collegeId },
        _avg: {
          rating: true,
        },
      });

      const avgRating = aggregate._avg.rating || 0;

      // 3. Update the college with the new average rating
      await tx.college.update({
        where: { id: collegeId },
        data: {
          rating: parseFloat(avgRating.toFixed(2)),
        },
      });

      return review;
    });

    return NextResponse.json(
      {
        message: "Review submitted successfully",
        data: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
