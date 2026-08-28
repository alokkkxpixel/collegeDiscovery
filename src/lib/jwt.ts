

import { PayloadToken } from "@/types/jwt.type"
import jwt ,{SignOptions} from "jsonwebtoken"
import { cookies } from "next/headers";


export async function signAccessToken(payload :PayloadToken):Promise<string>{
   const cookieStore = await cookies()
    const options: SignOptions = {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY as SignOptions['expiresIn'],
    }

   const  token =  await jwt.sign(payload , process.env.JWT_SECRET as string  , options);

 cookieStore.set('auth_token', token, {
    httpOnly: true, // Prevents client-side JS from reading the cookie
    secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
    sameSite: 'lax', // Protects against CSRF attacks
    path: '/', // Accessible across the entire site
    maxAge: 60 * 60 * 24 * 7, // Expires in 1 week (in seconds)
  })

  return token
}

export function verifyAccessToken(token:string):Promise<PayloadToken> {
  
    try {
         return new Promise ((resolve, reject) => {
            jwt.verify(token , process.env.JWT_SECRET as string , (err , payload) => {
                if (err) {
                    reject(err);
                }
                resolve(payload as PayloadToken);
            })
         });
    } catch (error) {
        throw new Error("Inavlid  or expired access token")
    }

}