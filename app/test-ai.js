
const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) and Resume Coach. 
Your goal is to analyze resumes based on general industry standards (readability, impact, quantification, structure) without a specific job description.
Return your response in pure JSON format without markdown blocks.`;

const prompt = `
    Analyze the following resume text for ATS compatibility and general effectiveness.
    
    RESUME CONTENT:
    Sample Resume Content Here

    Evaluate based on:
    1. Structure & Formatting (Clear sections, contact info, length, readability).
    2. Content & Impact (Action verbs, quantified results, clarity).
    3. Skills & Keywords (Hard/Soft skills balance, relevance).

    Provide a strict JSON response with the following structure:
    {
      "overallScore": <number 0-100>,
      "structureScore": <number 0-100>,
      "contentScore": <number 0-100>,
      "skillsScore": <number 0-100>,
      "summary": <string brief overview>,
      "strengths": [<string array of what is done well>],
      "weaknesses": [<string array of areas needing improvement>],
      "actionableFeedback": [<string array of specific steps to improve score>]
    }
  `;

async function testAI() {
    try {
        console.log("Testing Pollinations.ai...");
        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: prompt }
                ],
                model: 'openai',
                jsonMode: true
            })
        });

        if (!response.ok) {
            console.error(`Status: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response:", text);
        } else {
            const text = await response.text();
            console.log("Success:", text.slice(0, 200) + "...");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

testAI();
