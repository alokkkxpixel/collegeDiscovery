import { NextResponse } from "next/server";

// GET /api/saved/comparisons - Retrieve saved comparisons
export async function GET(request: Request) {
  return NextResponse.json({
    message: "List saved comparisons for the user",
    savedComparisons: [],
  });
}

// POST /api/saved/comparisons - Save a comparison
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { comparisonName, collegeIds } = body;

    return NextResponse.json({
      message: `Comparison '${comparisonName}' saved successfully`,
      savedComparison: {
        comparisonName,
        collegeIds,
      },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
