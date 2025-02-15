// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// interface DecodedToken {
//   userId: string;
//   email: string;
//   role?: string;
//   iat?: number;
//   exp?: number;
// }

// export function getUserInfoData(request: NextRequest): DecodedToken | null {
//   try {
//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.error("Authentication token is missing.");
//       return null;
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SCRET_KEY!) as DecodedToken;
//     return decodedToken;
//   } catch (error) {
//     console.error("Failed to authenticate user:", error);
//     return null;
//   }
// }
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  email: string;
  name?: string;
  isverified?: boolean;
  iat?: number;
  exp?: number;
}

export function getUserInfoData(request: NextRequest): DecodedToken | null {
  try {
    // 1️⃣ Try to get token from cookies
    let token = request.cookies.get("token")?.value;

    // 2️⃣ If not found in cookies, check Authorization header
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
      }
    }

    // 3️⃣ If still no token, return null
    if (!token) {
      console.error("❌ Authentication token is missing.");
      return null;
    }

    console.log("✅ Token received:", token);

    // 4️⃣ Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SCRET_KEY!) as DecodedToken;
    return decodedToken;
  } catch (error) {
    console.error("❌ Failed to authenticate user:", error);
    return null;
  }
}
