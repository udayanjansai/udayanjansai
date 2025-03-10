import React from "react";
import { jsPDF } from "jspdf";
import "./ResumePreview.css";

function ResumePreview({ resumeData }) {
    const downloadPDF = () => {
        const doc = new jsPDF();
        let y = 20; // Initial Y position
    
        // Title - Centered Name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text(resumeData.name, 105, y, { align: "center" });
        y += 12;
    
        // Contact Info - Well-Formatted with '|'
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
    
        let contactText = `Phone: ${resumeData.phone} | Email: `;
        let textWidth = doc.getTextWidth(contactText);
    
        // Email as clickable link
        doc.text(contactText, 10, y);
        doc.setTextColor(0, 0, 255);
        doc.textWithLink(resumeData.email, 10 + textWidth, y, { url: `mailto:${resumeData.email}` });
    
        textWidth += doc.getTextWidth(resumeData.email) + 5;
        doc.setTextColor(0, 0, 0);
        doc.text(" | LinkedIn: ", 10 + textWidth, y);
    
        textWidth += doc.getTextWidth(" | LinkedIn: ");
        doc.setTextColor(0, 0, 255);
        doc.textWithLink("LinkedIn", 10 + textWidth, y, { url: resumeData.linkedin });
    
        textWidth += doc.getTextWidth("LinkedIn") + 5;
        doc.setTextColor(0, 0, 0);
        doc.text(" | GitHub: ", 10 + textWidth, y);
    
        textWidth += doc.getTextWidth(" | GitHub: ");
        doc.setTextColor(0, 0, 255);
        doc.textWithLink("GitHub", 10 + textWidth, y, { url: resumeData.github });
    
        doc.setTextColor(0, 0, 0);
        y += 10;
    
        // Section Divider
        doc.setDrawColor(150);
        doc.line(10, y, 200, y);
        y += 10;
    
        // Section: Education
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Education", 10, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const educationText = doc.splitTextToSize(resumeData.education, 180);
        doc.text(educationText, 10, y);
        y += educationText.length * 6 + 5;
    
        // Line separator
        doc.line(10, y, 200, y);
        y += 10;
    
        // Section: Projects (Dynamic)
        if (resumeData.projects && resumeData.projects.length > 0) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Projects", 10, y);
            y += 7;
    
            resumeData.projects.forEach((project, index) => {
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.text(`${index + 1}. ${project.title} | ${project.technologies}`, 10, y);
                y += 7;
    
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                const projectDesc = doc.splitTextToSize(project.description, 180);
                doc.text(projectDesc, 10, y);
                y += projectDesc.length * 6 + 8;
            });
    
            doc.line(10, y, 200, y);
            y += 10;
        }
    
        // Section: Technical Skills
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Technical Skills", 10, y);
y += 7;

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

// Wrap and display each skill set properly
const skills = [
    { title: "Languages", value: resumeData.languages },
    { title: "Frameworks", value: resumeData.frameworks },
    { title: "Libraries", value: resumeData.libraries },
    { title: "Other", value: resumeData.otherSkills },
];

skills.forEach(skill => {
    if (skill.value) {
        const skillText = doc.splitTextToSize(`• ${skill.title}: ${skill.value}`, 180);
        doc.text(skillText, 10, y);
        y += skillText.length * 6; // Move down dynamically based on text height
    }
});

y += 5; // Add extra spacing before next section

    
        // Line separator
        doc.line(10, y, 200, y);
        y += 10;
    
        // Section: Achievements
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Achievements", 10, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
    
        const achievementsArray = resumeData?.achievements?.split(";") || [];
        achievementsArray.forEach((achievement, index) => {
            doc.text(`• ${achievement.trim()}`, 10, y);
            y += 6;
        });
    
        // Save the PDF
        doc.save("resume.pdf");
    };
    
    
    return (
        <div className="resume-preview">
            <h2 className="resume-title">{resumeData.name}</h2>
            <p className="contact-info">
                {resumeData.phone} | <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a> | 
                <a href={resumeData.linkedin}> LinkedIn</a> | 
                <a href={resumeData.github}> Github</a>
            </p>

            <div className="section">
                <h3>Education</h3>
                <p>{resumeData.education}</p>
            </div>

            <div className="section">
                <h3>Projects</h3>
                <p><strong>{resumeData.projectTitle}</strong> | {resumeData.technologies}</p>
                <p>{resumeData.projectDescription}</p>
            </div>

            <div className="section">
                <h3>Technical Skills</h3>
                <p><strong>Languages:</strong> {resumeData.languages}</p>
                <p><strong>Frameworks:</strong> {resumeData.frameworks}</p>
                <p><strong>Libraries:</strong> {resumeData.libraries}</p>
                <p><strong>Other:</strong> {resumeData.otherSkills}</p>
            </div>

            <div className="section">
                <h3>Achievements</h3>
                <ul>
                    {resumeData?.achievements?.split(";").map((achievement, index) => (
                        <li key={index}>{achievement.trim()}</li>
                    ))}
                </ul>
            </div>

            <button onClick={downloadPDF} className="download-button">
                Download PDF
            </button>
        </div>
    );
}

export default ResumePreview;
