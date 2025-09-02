import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    personal: { name: String, email: String, phone: String, location: String },
    workExperience: [{ line: String, company: String, role: String, startDate: String, endDate: String, description: String }],
    education: [{ line: String }],
    skills: [String],
    projects: [{ line: String }],
    certifications: [{ line: String }],
    keywords: [String]
}, { _id: false });

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    resume: ResumeSchema
}, { timestamps: true });

export default mongoose.models?.user || mongoose.model("user", UserSchema);
