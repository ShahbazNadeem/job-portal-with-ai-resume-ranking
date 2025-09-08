'use client'
import Layout from '@/app/_components/layout/Layout'
import { useAppliedJobs } from '@/context/AppliedJobsContext'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter
    const { appliedJobs, loading } = useAppliedJobs();
    const { user } = useUser();
    console.log(user)
    console.log('appliedJobs', appliedJobs)

    if (loading) {
        return (
            <>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 text-lg animate-pulse">Loading applied jobs...</p>
                </div>
            </>
        );
    }

    // Filter jobs based on recruiter id
    const userJobs = appliedJobs.filter(
        (job) => job.job.postedBy === user?.id
    );
    return (
        <Layout>
            <section>

                <button onClick={() => router.push("/user-signin")}>back</button>
            </section>
            <div className="w-full max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Applied Jobs</h2>

                {userJobs.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">
                        No applicants yet for your job postings.
                    </p>
                ) : (
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {userJobs.map((job) => (
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
                                    <button className='button1'>view Profile</button>
                                    <button className='bg-green-600 text-white py-2 px-3 rounded'>Accept</button>
                                    <button className='bg-red-600 text-white py-2 px-3 rounded'>Decline</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    )
}

export default page