import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getUserInfoData(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log("token getting user inof", token);

    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SCRET_KEY!);
    

    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message || "Failed to authenticate user.");
  }
}
