
const prompt = "Analyze resume. Return JSON: {\"score\": 100}";
const encodedPrompt = encodeURIComponent(prompt);
const targetUrl = `https://text.pollinations.ai/${encodedPrompt}?model=openai&json=true`;

async function testProxy(name, url) {
    console.log(`Testing ${name}...`);
    try {
        const response = await fetch(url);
        console.log(`${name} Status: ${response.status}`);
        if (response.ok) {
            const text = await response.text();
            console.log(`${name} Response: ${text.slice(0, 100)}`);
        } else {
            console.log(`${name} Status Text: ${response.statusText}`);
        }
    } catch (e) {
        console.log(`${name} Error: ${e.message}`);
    }
    console.log('---');
}

async function run() {
    // 1. AllOrigins (returns JSON with 'contents' property)
    await testProxy('AllOrigins JSON', `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);

    // 2. AllOrigins Raw
    await testProxy('AllOrigins Raw', `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);

    // 3. CorsProxy.io (Current)
    await testProxy('CorsProxy.io', `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
}

run();
