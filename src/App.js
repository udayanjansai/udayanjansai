import React, { useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import "./styles.css";

function App() {
    const [resumeData, setResumeData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        education: "",
        experience: "",
        skills: "",
        projectTitle: "",
        technologies: "",
        projectDescription: "",
        languages: "",
        frameworks: "",
        libraries: "",
        otherSkills: "",
        achievements: "", // ✅ Prevents `split` error
    });
    

    return (
        <div className="container">
            <h1 style={{ textAlign: "center", color: "#007bff" }}>AI Resume Builder</h1>
            <div className="resume-container">
                <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                <ResumePreview resumeData={resumeData} />
            </div>
        </div>
    );
}

export default App;
