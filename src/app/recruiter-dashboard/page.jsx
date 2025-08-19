"use client";
import React from "react";
import { useRecruiter } from "@/context/RecruiterContext";
import RecruiterSigninSwitcher from "../_components/recruiter/RecruiterSigninSwitcher";
import DashboardHeader from "../_components/dashboardlayout/DashboardHeader";

const RecruiterDashboard = ({ children }) => {
    const { recruiter } = useRecruiter();

    if (recruiter) {
        return <>
            <section>
                <div className="bg-[url('/images/login/userLogin.jpg')] bg-cover bg-center min-h-screen">
                    <div className="container">
                        <div className="flex items-center justify-center h-screen">
                            <div className="pt-10 xl:pt-10 2xl:pt-0">
                                <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
                                    <RecruiterSigninSwitcher />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>;
    }

    return (
        <div className="container">
            <DashboardHeader />
            {children}
        </div>
    );
};

export default RecruiterDashboard;
