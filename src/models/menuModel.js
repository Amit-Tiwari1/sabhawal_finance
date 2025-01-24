import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/dbConfig/dbConfig";

const Menu = sequelizeInstance.define(
  "Menu",
  {
    MenuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MenuName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MenuParentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    MenuUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: "menus",
    modelName: "Menu",
    timestamps: true,
  }
);

Menu.hasMany(Menu, {
  foreignKey: "MenuParentId",
  as: "Submenus",
});

Menu.belongsTo(Menu, {
  foreignKey: "MenuParentId",
  as: "ParentMenu",
});


export default Menu;
