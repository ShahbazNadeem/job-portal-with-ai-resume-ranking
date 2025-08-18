import React from 'react'
import Layout from '../_components/layout/Layout'
import UserSigninSwitcher from '../_components/user/UserSigninSwitcher'

const page = () => {
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