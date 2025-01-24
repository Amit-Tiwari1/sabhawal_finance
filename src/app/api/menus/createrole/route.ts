import { sequelizeInstance } from "@/dbConfig/dbConfig";
import RoleMenuPermission from "@/models/RoleMenuPermissionModel";
import Role from "@/models/userRoleModel";

import { NextRequest, NextResponse } from "next/server";

(async () => {
    try {
      await sequelizeInstance.sync({ alter: true });
      console.log("User table created or exists already");
    } catch (error) {
      console.error("Error syncing the database:", error);
    }
  })();

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
      const roleData = await request.json();
      const { roleName, roleDescription, permissions } = roleData;
  
      if (!roleName) {
        return NextResponse.json(
          { error: "Role name is not provided." },
          { status: 400 }
        );
      }
  
      // Check if the role already exists
      const existingRole = await Role.findOne({
        where: sequelizeInstance.where(
          sequelizeInstance.fn("LOWER", sequelizeInstance.col("roleName")),
          roleName.toLowerCase()
        ),
      });
  
      if (existingRole) {
        return NextResponse.json(
          { error: "Role already exists." },
          { status: 409 }
        );
      }
  
      // Create the new role
      const newRole = await Role.create({
        roleName,
        roleDescription: roleDescription || "No description provided",
      });
  
      // Create role menu permissions
      const permissionPromises = permissions.map((permission: any) =>
        RoleMenuPermission.create({
          roleId: newRole.roleId,
          menuId: permission.menuId,
          canCreate: permission.canCreate || false,
          canRead: permission.canRead || true,
          canUpdate: permission.canUpdate || false,
          canDelete: permission.canDelete || false,
        })
      );
  
      const newPermissions = await Promise.all(permissionPromises);
  
      if (!newPermissions || newPermissions.length === 0) {
        return NextResponse.json(
          { error: "Something went wrong while creating permissions." },
          { status: 409 }
        );
      }
  
      return NextResponse.json({
        message: "Role and permissions created successfully.",
        status: 200,
        result: {
          role: newRole,
          permissions: newPermissions,
        },
      });
    } catch (error: unknown) {
      console.error("Error during role creation:", (error as Error).message);
  
      return NextResponse.json(
        { error: (error as Error).message || "Internal server error." },
        { status: 500 }
      );
    }
  }
  