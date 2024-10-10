import { khnormal } from 'https://cdn.jsdelivr.net/npm/khmer-normalizer@1.0.2/build/src/index.min.js';
    
document.getElementById('normalize-btn').addEventListener('click', () => {
    const inputText = document.getElementById('inputkh').value;
    const cleanText = khnormal(inputText);
    document.getElementById('outputkh').textContent = cleanText; 
});