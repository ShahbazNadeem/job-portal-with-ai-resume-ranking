import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "demo",
})

// try {
//     const connection = await db.getConnection()
//     console.log("Database connected successfully")
//     connection.release();

// } catch (error) {
//     console.log("database connection failed", error)
//     process.exit(1)

// }
// mysql.createConnection()