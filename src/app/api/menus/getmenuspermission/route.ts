import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import RoleMenuPermission from "@/models/RoleMenuPermissionModel";
import Menu from "@/models/menuModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserInfoData } from "@/utils/getUserInfo"; 
dbConnect();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const decodedToken = getUserInfoData(request);
    console.log("decodedToken",decodedToken);
    

    const checkUser = await User.findOne({ where: { id: decodedToken.id } }) as User | null;

    if (!checkUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const rolePermissions = await RoleMenuPermission.findAll({
      where: { roleId: checkUser.role },
      attributes: ["menuId", "canCreate", "canRead", "canUpdate", "canDelete"],
    });

    const permissionsMap = rolePermissions.reduce((acc, perm) => {
      acc[perm.menuId] = {
        canCreate: perm.canCreate,
        canRead: perm.canRead,
        canUpdate: perm.canUpdate,
        canDelete: perm.canDelete,
      };
      return acc;
    }, {} as Record<number, any>);

    const menuIds = rolePermissions.map((perm) => perm.menuId);

    const allMenus = await Menu.findAll({
      where: { MenuId: menuIds },
      attributes: ["MenuId", "MenuName", "MenuUrl", "icon", "MenuParentId"],
    });

    const menuMap = new Map<number, any>();
    const rootMenus: any[] = [];

    allMenus.forEach((menu) => {
      const menuData = {
        MenuId: menu.MenuId,
        MenuName: menu.MenuName,
        MenuUrl: menu.MenuUrl,
        icon: menu.icon,
        MenuParentId: menu.MenuParentId,
        permissions: permissionsMap[menu.MenuId] || {
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
        },
        Submenus: [],
      };

      menuMap.set(menu.MenuId, menuData);

      if (menu.MenuParentId) {
        const parentMenu = menuMap.get(menu.MenuParentId);
        if (parentMenu) {
          parentMenu.Submenus.push(menuData);
        }
      } else {
        rootMenus.push(menuData);
      }
    });

    return NextResponse.json({
      message: "User menus fetched successfully",
      success: true,
      userMenus: rootMenus,
    });
  } catch (error) {
    console.error("ERROR during fetching user menus:", (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error during fetching user menus" },
      { status: 500 }
    );
  }
}
