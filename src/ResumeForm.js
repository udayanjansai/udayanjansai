import React, { useState } from "react";
import generateAIResume from "./aiResume";

function ResumeForm({ resumeData, setResumeData }) {
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    };

    const generateAI = async () => {
        setLoading(true);
        const aiSummary = await generateAIResume(resumeData);
        setResumeData({ ...resumeData, summary: aiSummary });
        setLoading(false);
    };

    return (
        <div className="resume-form p-6 border-2 border-gray-400 rounded-lg shadow-xl bg-white max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-4">Enter Your Details</h2>
            
            {/* Personal Information */}
            <input className="input-field" name="name" placeholder="Full Name" onChange={handleChange} />
            <input className="input-field" name="email" placeholder="Email" onChange={handleChange} />
            <input className="input-field" name="phone" placeholder="Phone" onChange={handleChange} />
            <input className="input-field" name="linkedin" placeholder="LinkedIn Profile URL" onChange={handleChange} />
            <input className="input-field" name="github" placeholder="GitHub Profile URL" onChange={handleChange} />

            {/* Education */}
            <textarea className="textarea-field" name="education" placeholder="Education Details" onChange={handleChange}></textarea>

            {/* Projects */}
            <input className="input-field" name="projectTitle" placeholder="Project Title" onChange={handleChange} />
            <input className="input-field" name="technologies" placeholder="Technologies Used" onChange={handleChange} />
            <textarea className="textarea-field" name="projectDescription" placeholder="Project Description" onChange={handleChange}></textarea>

            {/* Technical Skills */}
            <input className="input-field" name="languages" placeholder="Programming Languages (comma-separated)" onChange={handleChange} />
            <input className="input-field" name="frameworks" placeholder="Frameworks (comma-separated)" onChange={handleChange} />
            <input className="input-field" name="libraries" placeholder="Libraries (comma-separated)" onChange={handleChange} />
            <input className="input-field" name="otherSkills" placeholder="Other Skills (comma-separated)" onChange={handleChange} />

            {/* Achievements */}
            <textarea className="textarea-field" name="achievements" placeholder="Achievements (semicolon-separated)" onChange={handleChange}></textarea>

            {/* AI Summary */}
            <button 
                onClick={generateAI} 
                className="ai-button bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 px-4 py-2 mt-4 w-full"
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate AI Summary"}
            </button>

            <textarea className="textarea-field mt-4" name="summary" placeholder="AI Summary" value={resumeData.summary} readOnly></textarea>
        </div>
    );
}

export default ResumeForm;
