const https = require('https');

const prompt = 'a futuristic city';
const encodedPrompt = encodeURIComponent(prompt);
const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&model=flux&nologo=true`;

console.log(`Testing URL: ${url}`);

https.get(url, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    if (res.statusCode === 200) {
        console.log('Success: Image data received.');
    } else {
        console.error('Error: Failed to fetch image.');
    }
}).on('error', (e) => {
    console.error('Network Error:', e);
});
