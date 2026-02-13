import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Missing VITE_GEMINI_API_KEY in .env file");
}

// Initialize the NEW SDK
const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_KEY" });

export interface AnalysisResult {
    overallScore: number;
    structureScore: number;
    contentScore: number;
    skillsScore: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    actionableFeedback: string[];
}

export async function analyzeResume(resumeText: string): Promise<AnalysisResult> {
    if (!API_KEY) throw new Error("Missing API Key");
    if (!resumeText.trim()) throw new Error("Resume text is empty");

    // Clean up the text extracted from the PDF
    const cleanText = resumeText.replace(/[^\x20-\x7E\n]/g, '').replace(/\s+/g, ' ').trim();
    const truncatedResume = cleanText.slice(0, 30000); 

    const prompt = `
    Analyze the following resume text as an Applicant Tracking System.
    Evaluate it strictly based on ATS compatibility, structure, content impact, and keywords.

    You MUST return a JSON object with the exact following keys and value types:
    - "overallScore" (number between 0-100)
    - "structureScore" (number between 0-100)
    - "contentScore" (number between 0-100)
    - "skillsScore" (number between 0-100)
    - "summary" (string: a 2-3 sentence professional summary)
    - "strengths" (array of 3 strings)
    - "weaknesses" (array of 3 strings)
    - "actionableFeedback" (array of 3 strings: exact steps to improve)

    RESUME TEXT:
    """
    ${truncatedResume}
    """
    `;

    try {
        console.log("Sending to Gemini 2.5 Flash via new SDK...");
        
        // The new SDK syntax for calling the model
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                // This forces the API to strictly return a valid JSON object
                responseMimeType: "application/json", 
            }
        });

        if (!response.text) {
            throw new Error("Received empty response from AI");
        }

        console.log("Response received successfully!");

        // We can parse it directly because the MIME type guarantees perfect JSON
        const parsedData = JSON.parse(response.text) as AnalysisResult;
        return parsedData;

    } catch (error) {
        console.error("Analysis Failed:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        return {
            overallScore: 0,
            structureScore: 0,
            contentScore: 0,
            skillsScore: 0,
            summary: `Analysis Failed: ${errorMessage}`,
            strengths: [],
            weaknesses: ["Service error occurred"],
            actionableFeedback: ["Check console logs for details"]
        };
    }
}