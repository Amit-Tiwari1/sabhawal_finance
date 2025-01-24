import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/dbConfig/dbConfig";
import Role from "@/models/userRoleModel";
import Menu from "@/models/menuModel";

const RoleMenuPermission = sequelizeInstance.define(
  "RoleMenuPermission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "roleId",
      },
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Menu,
        key: "MenuId",
      },
    },
    canCreate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    canRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    canUpdate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    canDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: "role_menu_permissions",
    timestamps: true,
  }
);

RoleMenuPermission.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

RoleMenuPermission.belongsTo(Menu, {
  foreignKey: "menuId",
  as: "menu",
});


export default RoleMenuPermission;
