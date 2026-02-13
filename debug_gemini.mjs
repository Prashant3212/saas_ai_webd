
import https from 'https';
import fs from 'fs';

const key = "AIzaSyBaks8380TRreW4a7bgLEHHOJgqm11h9KM";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

console.log('Querying:', url);

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('debug_log.txt', `Status: ${res.statusCode}\nBody: ${data}`);
        console.log('Done writing debug_log.txt');
    });
}).on('error', (e) => {
    fs.writeFileSync('debug_log.txt', `Error: ${e.message}`);
    console.error('Error:', e);
});
