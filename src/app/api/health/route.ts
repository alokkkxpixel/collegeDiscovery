import { NextResponse } from "next/server";

export async function GET() {
    
try {
     return NextResponse.json({message:"Server is Healthy"}, { status: 200 }); 
} catch (error) {
   return NextResponse.json({
    message: error,
   }, {status: 500})   
}
}