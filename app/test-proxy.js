
const prompt = "Analyze resume. Return JSON only.";
const resumeText = "Experienced Software Engineer with 5 years in React and Node.js.";

async function testProxy() {
    const truncatedResume = resumeText;

    const aiPrompt = `
    Resume: ${truncatedResume}
    
    Output JSON:
    {
      "overallScore": <0-100>,
      "summary": "<short summary>"
    }
  `;

    try {
        const targetUrl = `https://text.pollinations.ai/${encodeURIComponent(aiPrompt)}?model=openai&json=true`;
        // Using corsproxy.io as in the main code
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

        console.log("Testing Proxy URL:", proxyUrl);

        const response = await fetch(proxyUrl);

        if (!response.ok) {
            console.error(`Status: ${response.status} ${response.statusText}`);
        } else {
            const text = await response.text();
            console.log("Success:", text.slice(0, 200));
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

testProxy();
