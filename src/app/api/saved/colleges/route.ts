import { NextResponse } from "next/server";

// GET /api/saved/colleges - List saved colleges
export async function GET(request: Request) {
  return NextResponse.json({
    message: "List saved colleges for the user",
    savedColleges: [],
  });
}

// POST /api/saved/colleges - Save a college
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { collegeId } = body;

    return NextResponse.json({
      message: `College with ID ${collegeId} saved successfully`,
      savedCollegeId: collegeId,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// DELETE /api/saved/colleges - Unsave a college
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { collegeId } = body;

    return NextResponse.json({
      message: `College with ID ${collegeId} unsaved successfully`,
      unsavedCollegeId: collegeId,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
