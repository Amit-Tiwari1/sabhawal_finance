import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelizeInstance = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.USER_NAME!,
  process.env.PASSWORD!,
  {
    host: process.env.HOST_NAME!,
    dialect: "mysql",
    dialectModule: mysql2,
    benchmark: true,
  }
);

async function dbConnect(): Promise<void> {
  try {
    await sequelizeInstance.authenticate();
    console.log("Database is connected successfully");
  } catch (error) {
    console.error("Error while connecting to the database:", error);
  }
}

// (async () => {
//   try {
//     await sequelizeInstance.sync({ force: true });
//     console.log("User table created or exists already");
//   } catch (error) {
//     console.error("Error syncing the database:", error);
//   }
// })();
export { sequelizeInstance, dbConnect };
