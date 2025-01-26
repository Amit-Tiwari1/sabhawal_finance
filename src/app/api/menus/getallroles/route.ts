import Role from "@/models/userRoleModel";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Fetch all roles with an order by roleId ascending
    const allRoles = await Role.findAll({
      order: [["roleId", "ASC"]],
    });

    if (!allRoles || allRoles.length === 0) {
      return NextResponse.json(
        {
          message: "No roles found.",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Roles fetched successfully",
      success: true,
      result: allRoles,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while fetching roles.",
        success: false,
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
