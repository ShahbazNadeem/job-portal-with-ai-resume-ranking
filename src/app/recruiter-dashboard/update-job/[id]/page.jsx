// 'use client'
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";


// export default function page({ jobId }) {
//   const router = useRouter();

//   // Form state
//   const [job, setJob] = useState({
  //     title: "",
//     company: "",
//     location: "",
//     salary: "",
//     type: "Full-Time",
//     description: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch job details to pre-fill form
//   useEffect(() => {
  //     const fetchJob = async () => {
//       try {
//         const res = await fetch(`/api/recruiter/jobPost/${jobId}`);
//         const data = await res.json();
//         if (data.success) setJob(data.job);
//       } catch (err) {
//         console.error("Error fetching job:", err);
//       }
//     };
//     fetchJob();
//   }, [jobId]);

//   // ✅ Handle form change
//   const handleChange = (e) => {
  //     setJob({ ...job, [e.target.name]: e.target.value });
  //   };

//   // ✅ Update API Call
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
  //       const res = await fetch(`/api/recruiter/jobPost/${jobId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(job),
//       });

//       const data = await res.json();
//       if (data.success) {
//         alert("✅ Job updated successfully!");
//         router.push("/recruiter/dashboard"); // redirect after success
//       } else {
  //         alert("❌ " + (data.error || "Update failed"));
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       alert("Something went wrong.");
//     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   return (
//     <section className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
//       <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
//         <CardHeader>
//           <h2 className="text-2xl font-bold text-center">
//             ✏️ Update Job Post
//           </h2>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleUpdate} className="space-y-6">
//             {/* Job Title */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Job Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={job.title}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
//               />
//             </div>

//             {/* Company */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Company</label>
//               <input
//                 type="text"
//                 name="company"
//                 value={job.company}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
//               />
//             </div>

//             {/* Location + Salary */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={job.location}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Salary</label>
//                 <input
//                   type="text"
//                   name="salary"
//                   value={job.salary}
//                   onChange={handleChange}
//                   placeholder="$50k - $80k"
//                   className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Job Type */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Job Type</label>
//               <select
//                 name="type"
//                 value={job.type}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
//               >
//                 <option>Full-Time</option>
//                 <option>Part-Time</option>
//                 <option>Internship</option>
//                 <option>Contract</option>
//                 <option>Remote</option>
//               </select>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Job Description</label>
//               <textarea
//                 name="description"
//                 value={job.description}
//                 onChange={handleChange}
//                 rows="5"
//                 className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between items-center gap-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-1/2"
//                 onClick={() => router.back()}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white"
//                 disabled={loading}
//               >
//                 {loading ? "Updating..." : "Update Job"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </section>
//   );
// }

import UpdateJobPage from "@/app/_components/UpdateJobPage";

export default function Page({ params }) {
  const { id } = params; // this comes from URL
  return <UpdateJobPage jobId={id} />;
}