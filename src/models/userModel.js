import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/dbConfig/dbConfig";

const User = sequelizeInstance.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  fullName:{
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobilenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  address1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  landmark: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userpic: {
    type: DataTypes.STRING,
  },
  isverified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isdeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isactive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  forgetpasswordtoken: {
    type: DataTypes.STRING,
    unique: true,
  },
  forgetpasswordtokenexpiry: {
    type: DataTypes.DATE,
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
  modelName: "User",
  tableName: "users",
});

export default User;
