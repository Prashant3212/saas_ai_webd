
import { HfInference } from "@huggingface/inference";

const client = new HfInference(); // Anonymous

const text = "Prashant Chauhan Web Developer... (rest of resume)";

async function testHF() {
    console.log("Testing Hugging Face (Anonymous)...");
    try {
        const stream = await client.chatCompletion({
            model: "microsoft/Phi-3-mini-4k-instruct",
            messages: [
                { role: "system", content: "You are an ATS. Analyze resume and output only JSON." },
                { role: "user", content: `Analyze: ${text.slice(0, 500)}. Return exact JSON: { "score": 10 }` }
            ],
            max_tokens: 500,
            temperature: 0.1,
            seed: 0,
        });

        let out = "";
        for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
                const content = chunk.choices[0].delta.content;
                if (content) {
                    out += content;
                }
            }
        }
        console.log("Success:", out);
    } catch (e) {
        console.error("HF Error:", e);
    }
}

testHF();
