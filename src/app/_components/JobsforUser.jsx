"use client";
import React, { useEffect, useState } from "react";
import { useJobs } from "@/context/JobsContext";

const JobsforUser = ({ recruuiterId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // ✅ Track clicked job
  const { jobs, loading } = useJobs();

  // ✅ Prevent background scroll when canvas is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const JobSkeleton = () => (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm animate-pulse">
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 flex gap-2">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    </li>
  );

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <ul className="space-y-4">
          {[1, 2, 3].map((n) => (
            <JobSkeleton key={n} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        {jobs.length > 0 ? (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300"
              >
                {/* Job Info */}
                <div className="flex-1 space-y-1">
                  <span className="text-xs text-gray-500">
                    Posted at {job.updatedAt}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{job.description}</p>

                  <div className="text-gray-700 text-sm flex flex-wrap gap-3 mt-2">
                    <span>
                      <span className="font-medium">📍 Location:</span>{" "}
                      {job.location}
                    </span>
                    <span>
                      <span className="font-medium">💰 Salary:</span>{" "}
                      {job.salaryRange}
                    </span>
                    <span>
                      <span className="font-medium">🕒 Type:</span>{" "}
                      {job.jobType}
                    </span>
                    <span>
                      <span className="font-medium">⚡ Exp:</span>{" "}
                      {job.experienceRequired}
                    </span>
                    <span className="text-xs text-gray-500">
                      posted by {job.postedBy.companyName}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-lg ${job.closeJob
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                        }`}
                    >
                      {job.closeJob ? "Closed" : "Open"}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 sm:mt-0 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedJob(job); // Set job in state to send in off canvas
                      setIsOpen(true);
                    }}
                    className="button1 text-sm"
                  >
                    Apply
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No jobs posted yet.</p>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity duration-300"
          onClick={() => {
            setIsOpen(false);
            setSelectedJob(null);
          }}
        ></div>
      )}

      {/* Off-Canvas Drawer */}
      <div
        className={`bg-[#F8F8F8] fixed top-0 right-0 z-50 h-screen p-6 overflow-y-auto w-[35%] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {selectedJob && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <span className="text-4xl font-semibold text-gray-900">{selectedJob.title}</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedJob(null);
                }}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto space-y-6">
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-500">Status :</p>
                <p className={`font-semibold ${selectedJob.closeJob ? "text-red-600" : "text-green-600"}`}>
                  {selectedJob.closeJob ? "Closed" : "Open"}
                </p>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white shadow-sm border">
                  <p className="text-sm text-gray-500">📍 Location</p>
                  <p className="font-medium text-gray-900">{selectedJob.location}</p>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-sm border">
                  <p className="text-sm text-gray-500">💰 Salary</p>
                  <p className="font-medium text-gray-900">{selectedJob.salaryRange}</p>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-sm border">
                  <p className="text-sm text-gray-500">🕒 Type</p>
                  <p className="font-medium text-gray-900">{selectedJob.jobType}</p>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-sm border">
                  <p className="text-sm text-gray-500">⚡ Experience</p>
                  <p className="font-medium text-gray-900">{selectedJob.experienceRequired}</p>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-sm border sm:col-span-2">
                  <p className="text-sm text-gray-500">🏢 Company</p>
                  <p className="font-medium text-gray-900">{selectedJob.postedBy.companyName}</p>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-sm border sm:col-span-2">
                  <p className="text-sm text-gray-500">Job Description</p>
                  <p className="font-medium text-gray-900">{selectedJob.description}</p>
                </div>
              </div>
            </div>

            {/* Footer with Apply button */}
            <div className="mt-6 border-t pt-4 flex gap-5">
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition"
                onClick={() => alert("Application submitted! 🚀")}
              >
                Ease Apply
              </button>
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition"
                onClick={() => alert("Application submitted! 🚀")}
              >
                Apply Manually
              </button>
            </div>
          </div>

        )}
      </div>
    </>
  );
};

export default JobsforUser;
