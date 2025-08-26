import dbConnect from "@/lib/db";
import { adminSchema } from "@/models/adminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { adminEmail, password } = body;

    if (!adminEmail || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const admin = await adminSchema.findOne({ adminEmail });

    if (!admin) {
      return Response.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    // ✅ If password was hashed on signup
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ Missing JWT_SECRET in .env.local");
      return Response.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: admin._id, adminEmail: admin.adminEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return Response.json(
      {
        success: true,
        message: "Login successful",
        admin: {
          id: admin._id,
          adminEmail: admin.adminEmail,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Admin Login API error:", error.message);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
