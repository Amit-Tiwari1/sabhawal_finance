import Menu from "@/models/menuModel";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const allMenus = await Menu.findAll({
        where: { MenuParentId: null },
        include: [
          {
            model: Menu,
            as: "Submenus",
          },
        ],
        order: [
          ["MenuId", "ASC"],
          [{ model: Menu, as: "Submenus" }, "MenuId", "ASC"],
        ],
      });

    if (!allMenus) {
      return NextResponse.json(
        {
          message: "You do not have any menus permissions",
          success: false,
        },
        { status: 400 }
      );
    }
    return NextResponse.json({
        message: "Successful",
        success: true,
        result: allMenus
      }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred",
        success: false,
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
