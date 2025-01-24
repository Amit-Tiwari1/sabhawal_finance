import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const allUserList = await User.findAll({
      where: {
        isdeleted: false,
        
      },
    });

    const sanitizedUserList = allUserList.map(user => {
      const userData = user.toJSON(); 
      delete userData.password;
      delete userData.forgetpasswordtoken;
      delete userData.forgetpasswordtokenexpiry;
      delete userData.isverified;
      return userData;
    });

    if (!sanitizedUserList || sanitizedUserList.length === 0) {
      return NextResponse.json({
        message: "No record found",
        success: false
      }, { status: 400 });
    }

    return NextResponse.json({
      message: "Successful",
      success: true,
      result: sanitizedUserList
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      message: "An error occurred",
      success: false,
      error: error.message || "Unknown error"
    }, { status: 500 });
  }
}
