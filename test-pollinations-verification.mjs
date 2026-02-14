
import { generateImage } from './app/src/lib/imageService.ts'; // This might be tricky due to TS imports in JS. 
// Instead, I'll just replicate the URL logic to test reachability. 

const prompt = "A futuristic city with flying cars";
const encodedPrompt = encodeURIComponent(prompt);
const seed = Math.floor(Math.random() * 1000000);
const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=1024&height=1024&nologo=true`;

console.log(`Testing URL: ${imageUrl}`);

try {
    const response = await fetch(imageUrl);
    if (response.ok) {
        console.log("SUCCESS: Pollinations.ai is reachable and returned a valid response.");
        console.log(`Status: ${response.status}`);
        const blob = await response.blob();
        console.log(`Blob size: ${blob.size} bytes`);
    } else {
        console.error(`FAILURE: Pollinations.ai returned status ${response.status}`);
    }
} catch (error) {
    console.error("FAILURE: Error fetching from Pollinations.ai", error);
}
