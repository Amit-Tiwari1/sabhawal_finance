import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/dbConfig/dbConfig";
const Role = sequelizeInstance.define("Role", {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roleDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize: sequelizeInstance,
    tableName: "roles",
    modelName: "Role",
  });

export default Role;