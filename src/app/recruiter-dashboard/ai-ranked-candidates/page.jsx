"use client";

import { useEffect, useState } from "react";
import RecruiterDashboard from "../page";

async function fetchCandidates() {
    const res = await fetch("/api/user");
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to fetch candidates");
    // Map DB users into { id, name, resume }
    return data.candidates.map(u => ({
        id: u._id,
        name: u.name || u.email,
        resume: u.resume || {},
    }));
}

async function fetchRankedCandidates(job, candidateList) {
    const res = await fetch("/api/rank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job, candidates: candidateList }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Ranking failed");
    return data.ranked;
}

export default function RankedCandidatesPage() {
    const [loading, setLoading] = useState(true);
    const [ranked, setRanked] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const candidates = await fetchCandidates();

                const job = {
                    title: "Frontend Engineer",
                    description: "React, Next.js, Typescript experience required",
                    requiredSkills: ["react", "next.js", "typescript"],
                    minExperience: 2,
                    requiredDegree: "bachelor",
                };

                const rankedList = await fetchRankedCandidates(job, candidates);
                setRanked(rankedList);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // if (loading) return <p className="p-4">Loading ranked candidates...</p>;
    
    // if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
    return (
        <RecruiterDashboard>
            <div className="p-6">
                <span className="text-2xl font-bold mb-4">AI Ranked Candidates</span>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Rank</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Score</th>
                            <th className="border p-2">Skills</th>
                            <th className="border p-2">Experience (yrs)</th>
                            <th className="border p-2">Education Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranked.map((c, i) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td className="border p-2 text-center">{i + 1}</td>
                                <td className="border p-2">{c.name}</td>
                                <td className="border p-2">{(c.score * 100).toFixed(1)}%</td>
                                <td className="border p-2">{(c.resume.skills || []).join(", ")}</td>
                                <td className="border p-2 text-center">{c.breakdown.candidateYears}</td>
                                <td className="border p-2 text-center">{(c.breakdown.educationScore * 100).toFixed(0)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </RecruiterDashboard>
    );
}
