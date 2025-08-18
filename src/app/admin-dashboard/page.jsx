"use client";

import { useState } from "react";
import Layout from "../_components/layout/Layout";
import { useAdmin } from "@/context/AdminContext";
import AdminLogin from "../_components/admin/AdminLogin";
import Lottie from "lottie-react";
import adminLogin from '../../../public/images/lottieFiles/adminLogin.json'

export default function Page() {

  const { admin } = useAdmin()

  const [form, setForm] = useState({
    UserName: "",
    UserAge: "",
    Useremail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // try {
    //   const res = await fetch("/api/users", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });

    //   const data = await res.json();
    //   if (res.ok) {
    //     setMessage("✅ User added successfully!");
    //     setForm({ UserName: "", UserAge: "", Useremail: "" });
    //   } else {
    //     setMessage(`❌ ${data.message}`);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setMessage("❌ Failed to add user");
    // }
  };

  if (!admin) {
    return (
      <div className="container">
        <div className="min-h-screen flex justify-center items-center">
          <div className="basis-[50%] flex justify-center items-center"><Lottie animationData={adminLogin} /></div>
          <div className="basis-[50%] flex justify-center items-center"><AdminLogin /></div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      {/* <section className="min-h-screen">

        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Add New User</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="UserName"
              placeholder="Name"
              value={form.UserName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="number"
              name="UserAge"
              placeholder="Age"
              value={form.UserAge}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="email"
              name="Useremail"
              placeholder="Email"
              value={form.Useremail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add User
            </button>
          </form>

          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </section> */}
    </Layout>
  );
}
