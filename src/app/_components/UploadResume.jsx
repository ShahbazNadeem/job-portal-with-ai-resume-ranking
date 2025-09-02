// 'use client'
// import React, { useState } from "react";

// export default function UploadResume() {
//   const [file, setFile] = useState(null);
//   const [parsedResume, setParsedResume] = useState(null);

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("resume", file);

//     const res = await fetch("/api/resume/save", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (data.success) {
//       console.log("Parsed Resume:", data.user.resume);
//       setParsedResume(data.user.resume);
//     } else {
//       console.error(data.error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept=".pdf,.doc,.docx"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <button onClick={handleUpload}>Upload Resume</button>

//       {parsedResume && (
//         <div>
//           <h2>Parsed Resume Preview</h2>
//           <pre>{JSON.stringify(parsedResume, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const { user } = useUser(); // get logged-in user

  const handleUpload = async () => {
    if (!file) return;
    if (!user?.email) return alert("User not logged in!");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("email", user.email); // send email from context

    const res = await fetch("/api/resume/save", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Parsed Resume:", data);
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload Resume</button>
    </div>
  );
}
