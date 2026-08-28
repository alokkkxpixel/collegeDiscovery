import { prisma } from "@/lib/prisma.client";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// GET /api/colleges/[slug] - Detail page: college + courses + placements + reviews
export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
  const { slug } = await params;

  
    if (!slug){
      return NextResponse.json({error: "Please proviode a valid slug"}, {status: 400})
    }

     const college = await prisma.college.findUnique({
      where: { slug },
      include: {
        courses: true,
        placements: true,
        reviews: true,
      },
     });
   
     if(!college){
      return NextResponse.json({error: "College not found"}, {status: 404})
     }

     return NextResponse.json({data: college},{status: 200})

   } catch (error) {
     return NextResponse.json({error: "Something went wrong"}, {status: 500})
   }


 
}
