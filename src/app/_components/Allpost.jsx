'use client'
import React, { useState } from "react";

const Allpost = ({ initialJobs = [] }) => {
    //   const [jobs, setJobs] = useState(initialJobs);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this job?")) {
            setJobs(jobs.filter((job) => job.id !== id));
        }
    };

    const handleUpdate = (id) => {
        alert(`Update job with ID: ${id}`);
    };

    const jobs = [
        {
            id: 1,
            title: "Frontend Developer",
            description: "We are looking for a skilled React developer to join our team.",
            location: "Remote",
            salaryRange: "$60,000 - $80,000",
            jobType: "Full-time",
            requiredSkills: ["React", "JavaScript", "Tailwind"],
            experienceRequired: "2+ years",
            postedBy: "Recruiter123",
            closeJob: false,
        },
        {
            id: 2,
            title: "Backend Developer",
            description: "Looking for a Node.js developer with API experience.",
            location: "New York",
            salaryRange: "$70,000 - $100,000",
            jobType: "Full-time",
            requiredSkills: ["Node.js", "Express", "MongoDB"],
            experienceRequired: "3+ years",
            postedBy: "Recruiter456",
            closeJob: true,
        },
        {
            id: 3,
            title: "Backend Developer",
            description: "Looking for a Node.js developer with API experience.",
            location: "New York",
            salaryRange: "$70,000 - $100,000",
            jobType: "Full-time",
            requiredSkills: ["Node.js", "Express", "MongoDB"],
            experienceRequired: "3+ years",
            postedBy: "Recruiter456",
            closeJob: false,
        },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Job Listings</h2>

            {jobs.length > 0 ? (
                <ul className="space-y-4">
                    {jobs.map((job) => (
                        <li
                            key={job.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300"
                        >
                            {/* Job Info */}
                            <div className="flex-1 space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                <p className="text-gray-600 text-sm">{job.description}</p>

                                <div className="text-gray-700 text-sm flex flex-wrap gap-3 mt-2">
                                    <span><span className="font-medium">📍 Location:</span> {job.location}</span>
                                    <span><span className="font-medium">💰 Salary:</span> {job.salaryRange}</span>
                                    <span><span className="font-medium">🕒 Type:</span> {job.jobType}</span>
                                    <span><span className="font-medium">⚡ Exp:</span> {job.experienceRequired}</span>
                                    <span className="text-xs text-gray-500">👤 {job.postedBy}</span>
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded-lg ${job.closeJob ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {job.closeJob ? "Closed" : "Open"}
                                    </span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-4 sm:mt-0 flex gap-2">
                                <button
                                    onClick={() => handleUpdate(job.id)}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 hover:shadow-md transition"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(job.id)}
                                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600 hover:shadow-md transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No jobs posted yet.</p>
            )}
        </div>
    );
};

export default Allpost;
