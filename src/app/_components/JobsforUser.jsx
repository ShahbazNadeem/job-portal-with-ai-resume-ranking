'use client';
import React, { useEffect, useState } from "react";

const JobsforUser = ({ recruuiterId }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleApply = (id) => {
    alert(`Update job with ID: ${id}`);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/recruiter/jobPost`);
        const data = await res.json();

        if (data.success) {
          let filteredJobs = data.jobs;

          // 🔎 Apply filter on frontend
          if (recruuiterId) {
            filteredJobs = filteredJobs.filter(
              (job) => job.postedBy === recruuiterId
            );
          }

          setJobs(filteredJobs);
        }
      } catch (error) {
        console.error("❌ Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [recruuiterId]);

  const JobSkeleton = () => (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm animate-pulse">
      {/* Job Info */}
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Buttons */}
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
                <span className="text-xs text-gray-500">Posted at {job.updatedAt}</span>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.description}</p>

                <div className="text-gray-700 text-sm flex flex-wrap gap-3 mt-2">
                  <span><span className="font-medium">📍 Location:</span> {job.location}</span>
                  <span><span className="font-medium">💰 Salary:</span> {job.salaryRange}</span>
                  <span><span className="font-medium">🕒 Type:</span> {job.jobType}</span>
                  <span><span className="font-medium">⚡ Exp:</span> {job.experienceRequired}</span>
                  <span className="text-xs text-gray-500">posted by {job.postedBy.companyName}</span>
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
                  onClick={() => handleApply(job._id)}
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
  );
};

export default JobsforUser;
