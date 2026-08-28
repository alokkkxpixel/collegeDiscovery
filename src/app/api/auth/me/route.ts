import { prisma } from "@/lib/prisma.client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Access headers injected by the authentication middleware
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve user details from database (excluding sensitive fields like password)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit:{
        password:true
      },
      include: {
        reviews: true,
        savedColleges: true,
        comparisons: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}