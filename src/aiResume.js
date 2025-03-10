import axios from "axios";

const HUGGINGFACE_API_KEY = "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"; // Replace with your API Key

async function generateAIResume(resumeData) {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn", // ✅ Using Hugging Face's text summarization model
            {
                inputs: `Generate a short professional resume summary for:\n
                         Name: ${resumeData.name}\n
                         Education: ${resumeData.education}\n
                         Experience: ${resumeData.experience}\n
                         Skills: ${resumeData.skills}`
            },
            {
                headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` },
            }
        );

        return response.data[0].summary_text || "Error: Could not generate summary.";
    } catch (error) {
        console.error("Hugging Face API Error:", error);
        return "Error: AI generation failed. Try again later.";
    }
}

export default generateAIResume;
