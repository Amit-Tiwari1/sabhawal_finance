import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const logoutResponse = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    logoutResponse.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return logoutResponse;
  } catch (error) {
    console.error("ERROR:: during logout", (error as Error).message);
    return NextResponse.json(
      {
        error: (error as Error).message || "Internal server error during logout",
      },
      { status: 500 }
    );
  }
}
