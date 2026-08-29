import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.client";
import { compareQuerySchema } from "@/lib/zod/college.validation";

// GET /api/saved/comparisons - Retrieve saved comparisons
export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const savedComparisons = await prisma.savedComparison.findMany({
      where: {
        userId,
      }
    });

    return NextResponse.json({
      message: "List saved comparisons for the user",
      savedComparisons,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch saved comparisons" }, { status: 500 });
  }
}


// POST /api/saved/comparisons - Save a comparison
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = compareQuerySchema.safeParse({
      ids: searchParams.get("ids"),
    });
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   
     if (!parsed.success) {
       return NextResponse.json(
         { error: parsed.error.issues[0].message },
         { status: 400 }
       );
     }
   
     const { ids } = parsed.data;

     const existingComparisons = await prisma.savedComparison.findMany({
      where: {
        userId,
        collegeIds: {
          equals: ids,
        },
      },
    });

    if (existingComparisons.length > 0) {
      return NextResponse.json(
        { error: "This exact comparison already exists for this user." },
        { status: 400 }
      );
    }

    // Create the new saved comparison
    const newSavedComparison = await prisma.savedComparison.create({
      data: {
        userId,
        collegeIds: ids,
      },
    });

    return NextResponse.json({
      message: `Comparison  saved successfully`,
      savedComparison: newSavedComparison
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
