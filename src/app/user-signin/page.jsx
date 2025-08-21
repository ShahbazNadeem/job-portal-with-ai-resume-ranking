'use client'
import React from 'react'
import Layout from '../_components/layout/Layout'
import UserSigninSwitcher from '../_components/user/UserSigninSwitcher'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'
import { useUser } from "@/context/UserContext";

const page = () => {
  const { logout } = useUser();
  const { data: session } = useSession()

  if (session) {
    return (
      <div className='container h-screen flex flex-col justify-center items-center'>
        <span>No need to sign in </span>
        <span>Your are already Signed in as <span className='text-blue-800'>{session.user.email}</span></span>
        <span>Back to <Link href='/' className='text-blue-800 underline'>Home</Link></span>
        <button onClick={() => { signOut(); logout(); }}>Sign out</button>
      </div>
    )
  }
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
  )
}

export default page