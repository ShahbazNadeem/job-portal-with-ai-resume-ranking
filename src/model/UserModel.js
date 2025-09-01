import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String }, // profile pic from google/github/linkedin

        // Resume-related fields
        resume: {
            jobTitle: { type: String },
            workExperience: [
                {
                    company: String,
                    role: String,
                    startDate: Date,
                    endDate: Date,
                    description: String,
                },
            ],
            education: [
                {
                    institution: String,
                    degree: String,
                    fieldOfStudy: String,
                    startDate: Date,
                    endDate: Date,
                },
            ],
            skills: [String],
            certifications: [
                {
                    name: String,
                    authority: String,
                    date: Date,
                },
            ],
            projects: [
                {
                    title: String,
                    description: String,
                    technologies: [String],
                    link: String,
                },
            ],
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
