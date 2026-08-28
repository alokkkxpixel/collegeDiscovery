import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma.client";
import { registerSchema } from "@/lib/zod/user.validation";

// POST /api/auth/signup - Create mock user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    const { email, password, name } = parsed.data;
  
    const isUserExist = await prisma.user.findUnique({where:{email}})

    if(isUserExist){
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }

    const hashPass = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPass,
        name,
      },
    });
   
    return NextResponse.json({
      message: "User signup successfull!! please login now...",
      user: {
        name : user.name,
        email : user.email,
        id : user.id,
      },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
