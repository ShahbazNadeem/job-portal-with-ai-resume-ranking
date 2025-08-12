import { db } from "@/config/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const { UserName, UserAge, Useremail } = body;
        const UserID = Math.floor(1000 + Math.random() * 9000);

        if (!UserName || !UserAge || !Useremail) {
            return Response.json({ message: "All fields are required" }, { status: 400 });
        }

        const [result] = await db.execute(
            "INSERT INTO `demo`.`user` (`UserID`, `UserName`, `UserAge`, `Useremail`) VALUES (?, ?, ?, ?)",
            [UserID, UserName, UserAge, Useremail]
        );

        return Response.json(
            { message: "User added successfully", insertId: result.insertId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Database insert failed" }, { status: 500 });
    }
}