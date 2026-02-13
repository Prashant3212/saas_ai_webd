
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBaks8380TRreW4a7bgLEHHOJgqm11h9KM";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("Attempting to list models with key:", apiKey.substring(0, 10) + "...");
        // We can't easily list models via the SDK in older versions, but let's try a direct fetch if SDK doesn't expose it easily or just try a simple generation.

        // Actually, let's try to generate with 'gemini-pro' and 'gemini-1.5-flash' to see which one fails specifically.

        const modelsToTry = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];

        for (const modelName of modelsToTry) {
            console.log(`\nTesting model: ${modelName}`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello, are you working?");
                const response = await result.response;
                console.log(`SUCCESS: ${modelName} responded: ${response.text()}`);
                return; // Exit if one works
            } catch (e) {
                console.log(`FAILED: ${modelName} - ${e.message}`);
            }
        }

        console.log("\nAll models failed.");

    } catch (error) {
        console.error("Fatal Error:", error);
    }
}

listModels();
