import { prisma } from "@/lib/prisma.client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PayloadToken } from "@/types/jwt.type";
import { signAccessToken } from "@/lib/jwt";
import { loginSchema } from "@/lib/zod/user.validation";

// POST /api/auth/login - Login and issue JWT/session cookie
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    const { email, password } = parsed.data;

    
    const user = await prisma.user.findUnique({where:{email}})

    if(!user){
        return NextResponse.json({error: "Invaild credentials"}, {status: 401})
    }

    const isPassMatch = await bcrypt.compare(password, user.password)

    if(!isPassMatch){
        return NextResponse.json({error: "Invalid credentials"}, {status: 401})
    }
  
    const payload : PayloadToken = {
        email: user.email,
        name: user.name,
        id: user.id
    }

    const token =  await signAccessToken(payload)

    if(!token){
        return NextResponse.json({error: "Token not generated"}, {status: 500})
    }
  
    

    const response = NextResponse.json({
      message: "Login successful",
      user: { email:user.email,
       name:user.name,
        id:user.id,

       },
      token: token,
    }, {status:200});


    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
