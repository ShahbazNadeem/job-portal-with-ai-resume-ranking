'use client';
import React from 'react';
import RecruiterDashboard from '../page';
import { useAppliedJobs } from "@/context/AppliedJobsContext";
import { useRecruiter } from "@/context/RecruiterContext";

const AppliedJobsPage = () => {
  const { appliedJobs, loading, updateJobStatus } = useAppliedJobs();
  const { recruiter } = useRecruiter();
  // console.log(recruiter)
  // console.log('appliedJobs', appliedJobs)

  if (loading) {
    return (
      <RecruiterDashboard>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg animate-pulse">Loading applied jobs...</p>
        </div>
      </RecruiterDashboard>
    );
  }

  // Filter jobs based on recruiter id
  const recruiterJobs = appliedJobs.filter(
    (job) => job.job.postedBy === recruiter?.id
  );

  return (
    <RecruiterDashboard>
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Applied Jobs</h2>

        {recruiterJobs.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No applicants yet for your job postings.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recruiterJobs.map((job) => (
              <li
                key={job._id}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
              >
                {/* Job Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{job.job.title}</h3>
                  <p className="text-sm text-gray-600">{job.job.description}</p>
                  <p className="text-sm text-gray-500">
                    Applicant: <span className="font-medium text-gray-900">{job.user.name}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Email: <span className="font-medium text-gray-900">{job.user.email}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Applied At:{" "}
                    <span className="font-medium text-gray-900">
                      {new Date(job.appliedAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Skills / Resume Preview */}
                {job.user.resume.skills && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.user.resume.skills.slice(0, 5).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.user.resume.skills.length > 5 && (
                      <span className="text-xs text-gray-500">
                        +{job.user.resume.skills.length - 5} more
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-4 flex justify-center items-center flex-wrap gap-2">
                  <button className='button1'>View Profile</button>
                  <button
                    onClick={() => updateJobStatus(job._id, "accepted")}
                    className='bg-green-600 text-white py-2 px-3 rounded'
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateJobStatus(job._id, "declined")}
                    className='bg-red-600 text-white py-2 px-3 rounded'
                  >
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </RecruiterDashboard>
  );
};

export default AppliedJobsPage;
