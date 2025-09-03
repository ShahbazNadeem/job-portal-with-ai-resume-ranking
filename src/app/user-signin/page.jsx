'use client';
import React, { useEffect, useState } from "react";
import Layout from "../_components/layout/Layout";
import { useSession, signOut } from "next-auth/react";
import { useUser } from "@/context/UserContext";
import UserSigninSwitcher from "../_components/user/UserSigninSwitcher";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const { logout } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from API
  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setUserData(data.user);
          setLoading(false);
        });
    }
  }, [session]);

  if (!session) {
    return (
      <Layout>
         <section>
          <div className="bg-[url('/images/recruiter/background.jpg')] bg-cover bg-center min-h-screen">
            <div className="container">
              <div className="flex items-center justify-center h-screen">
                <div className="pt-10 xl:pt-10 2xl:pt-0">
                  <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
                    <UserSigninSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-medium text-gray-600">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 h-screen flex flex-col md:flex-row gap-6">
        {/* Sidebar - Profile Info */}
        <div className="md:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
          <img
            src={userData?.image || "/images/default-avatar.png"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border object-cover"
          />
          <span className="text-2xl font-bold text-gray-800">{userData?.name}</span>
          <p className="text-gray-600">{userData?.email}</p>
          <button
            onClick={() => {
              signOut();
              logout();
            }}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 w-full"
          >
            Sign Out
          </button>
        </div>

        {/* Main Content - Resume Details */}
        <div className="md:w-2/3 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume</h3>

          {/* Resume Sections */}
          <div className="space-y-4">
            {/* Personal Info */}
            {userData?.resume?.personal && (
              <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2">Personal Info</h4>
                <p>Name: {userData.resume.personal.name}</p>
                <p>Email: {userData.resume.personal.email}</p>
                <p>Phone: {userData.resume.personal.phone}</p>
                <p>Location: {userData.resume.personal.location}</p>
              </div>
            )}

            {/* Skills */}
            {userData?.resume?.skills?.length > 0 && (
              <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                <ul className="list-disc ml-6 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {userData.resume.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Projects */}
            {userData?.resume?.projects?.length > 0 && (
              <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2">Projects</h4>
                <ul className="list-disc ml-6 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {userData.resume.projects.map((proj, idx) => (
                    <li key={idx}>{proj.line}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Work Experience */}
            {userData?.resume?.workExperience?.length > 0 && (
              <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2">Work Experience</h4>
                <div className="space-y-2">
                  {userData.resume.workExperience.map((exp, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-md shadow-sm">
                      <p className="font-semibold">{exp.role} {exp.role && '@'} {exp.line}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {userData?.resume?.education?.length > 0 && (
              <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2">Education</h4>
                <ul className="list-disc ml-6 text-gray-600">
                  {userData.resume.education.map((edu, idx) => (
                    <li key={idx}>{edu.line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
