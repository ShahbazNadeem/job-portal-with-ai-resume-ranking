"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppliedJobsContext = createContext();

export const AppliedJobsProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/applied-jobs");
      const data = await res.json();

      if (data.success) {
        setAppliedJobs(data.jobs);
      }
    } catch (error) {
      console.error("❌ Error fetching applied jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <AppliedJobsContext.Provider value={{ appliedJobs, loading, fetchAppliedJobs }}>
      {children}
    </AppliedJobsContext.Provider>
  );
};

// custom hook
export const useAppliedJobs = () => useContext(AppliedJobsContext);
