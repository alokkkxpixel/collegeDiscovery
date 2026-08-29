import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.client";

// GET /api/saved/colleges - List saved colleges
export async function GET(request: Request) {
 try {
   const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const savedColleges = await prisma.savedCollege.findMany({
    where: { userId },
    include: {
      college: true,
    },
    
  });
  
 if(!savedColleges || savedColleges.length === 0 ){
  return NextResponse.json({error: "No saved colleges found for this user"}, {status: 404});
 }

  return NextResponse.json({
    message: "List saved colleges for the user",
    savedColleges: savedColleges,
  }, { status: 200 });
 } catch (error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
 }
}

// POST /api/saved/colleges - Save a college
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { collegeId } = body;
    
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const isUserAlreadySavedCollege = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: userId,
          collegeId: collegeId,
        }
      }
    });
    
    if (isUserAlreadySavedCollege) {
      return NextResponse.json({ error: "You have already saved this college" }, { status: 400 });
    }

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId,
        collegeId,
      },
    });
    return NextResponse.json({
      message: `College with ID ${savedCollege.collegeId} saved successfully`,
      savedCollege: savedCollege,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save college" }, { status: 400 });
  }
}

// DELETE /api/saved/colleges - Unsave a college
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const collegeId = searchParams.get("collegeId");
    
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id && !collegeId) {
      return NextResponse.json({ error: "Either id or collegeId must be provided" }, { status: 400 });
    }

    const deletedSavedCollege = await prisma.savedCollege.delete({
      where: id
        ? {
            id,
            userId,
          }
        : {
            userId_collegeId: {
              userId,
              collegeId: collegeId!,
            },
          },
    });

    return NextResponse.json({
      message: `College with ID ${deletedSavedCollege.collegeId} deleted successfully`,
      deletedSavedCollege: deletedSavedCollege,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Saved college not found or error occurred" }, { status: 400 });
  }
}
