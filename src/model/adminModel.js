import mongoose from "mongoose"

const adminModel = new mongoose.Schema({
    adminEmail: String,
    password: String,
})

export const adminSchema = mongoose.models?.admins || mongoose.model("admins", adminModel)