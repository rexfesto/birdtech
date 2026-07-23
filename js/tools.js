// ===== TOOL UTILITIES =====

function scrollToTool(toolId) {
    const element = document.getElementById(toolId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== QR CODE GENERATOR =====
function generateQR() {
    const input = document.getElementById('qrInput').value;
    const result = document.getElementById('qrResult');
    
    if (!input) {
        result.innerHTML = '<p style="color: var(--error);">Please enter text or URL</p>';
        return;
    }
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(input)}`;
    result.innerHTML = `<img src="${qrUrl}" alt="QR Code" style="max-width: 300px;">`;
}

// ===== PASSWORD GENERATOR =====
function generatePassword() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    if (document.getElementById('pwdUppercase').checked) chars += uppercase;
    if (document.getElementById('pwdLowercase').checked) chars += lowercase;
    if (document.getElementById('pwdNumbers').checked) chars += numbers;
    if (document.getElementById('pwdSymbols').checked) chars += symbols;
    
    const length = parseInt(document.getElementById('pwdLength').value) || 16;
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const result = document.getElementById('passwordResult');
    result.innerHTML = `<p style="word-break: break-all; font-size: 1.1rem; color: var(--accent); font-weight: bold;">${password}</p><button onclick="navigator.clipboard.writeText('${password}')" class="btn btn-secondary">Copy to Clipboard</button>`;
}

// ===== AGE CALCULATOR =====
function calculateAge() {
    const dob = document.getElementById('dobInput').value;
    const result = document.getElementById('ageResult');
    
    if (!dob) {
        result.innerHTML = '<p style="color: var(--error);">Please select a date</p>';
        return;
    }
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    result.innerHTML = `<p style="font-size: 1.2rem;"><strong>Age:</strong> ${age} years old</p><p style="color: var(--text-muted);">Next birthday in ${daysUntilBirthday} days</p>`;
}

// ===== UNIT CONVERTER =====
function convertUnits() {
    const value = parseFloat(document.getElementById('unitValue').value);
    const fromUnit = document.getElementById('unitFrom').value;
    const toUnit = document.getElementById('unitTo').value;
    const result = document.getElementById('conversionResult');
    
    if (isNaN(value)) {
        result.innerHTML = '<p style="color: var(--error);">Please enter a valid number</p>';
        return;
    }
    
    const conversions = {
        'm': 1,
        'km': 0.001,
        'mi': 0.000621371,
        'ft': 3.28084
    };
    
    const meters = value / conversions[fromUnit];
    const converted = meters * conversions[toUnit];
    
    result.innerHTML = `<p>${value} ${fromUnit} = <strong style="color: var(--accent); font-size: 1.2rem;">${converted.toFixed(2)} ${toUnit}</strong></p>`;
}

// ===== CURRENCY CONVERTER =====
function convertCurrency() {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const from = document.getElementById('currencyFrom').value;
    const to = document.getElementById('currencyTo').value;
    const result = document.getElementById('currencyResult');
    
    if (isNaN(amount)) {
        result.innerHTML = '<p style="color: var(--error);">Please enter a valid amount</p>';
        return;
    }
    
    // Demo rates (update with real API in production)
    const rates = {
        'NGN': 1,
        'USD': 0.0013,
        'EUR': 0.0012,
        'GBP': 0.0010
    };
    
    const inUSD = amount * rates[from];
    const converted = inUSD / rates[to];
    
    const symbols = { 'NGN': '₦', 'USD': '$', 'EUR': '€', 'GBP': '£' };
    result.innerHTML = `<p>${symbols[from]} ${amount.toLocaleString()} = <strong style="color: var(--accent); font-size: 1.2rem;">${symbols[to]} ${converted.toLocaleString('en-US', {maximumFractionDigits: 2})}</strong></p><p style="color: var(--text-muted); font-size: 0.85rem;">Note: Demo rates. Use real API for accurate rates.</p>`;
}

// ===== COLOR PALETTE GENERATOR =====
function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    }
    
    const result = document.getElementById('paletteResult');
    result.innerHTML = colors.map(color => `<div class="color-box" style="background-color: ${color};" title="${color}" onclick="navigator.clipboard.writeText('${color}')"></div>`).join('');
}

// ===== TEXT STATISTICS =====
function analyzeText() {
    const text = document.getElementById('textInput').value;
    const result = document.getElementById('statsResult');
    
    if (!text) {
        result.innerHTML = '<p style="color: var(--error);">Please enter some text</p>';
        return;
    }
    
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).length - 1;
    const paragraphs = text.split(/\n\n+/).length;
    const readingTime = Math.ceil(words / 200); // Average 200 words per minute
    
    result.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; width: 100%; text-align: center;">
            <div><strong>${words}</strong><p style="color: var(--text-muted); font-size: 0.9rem;">Words</p></div>
            <div><strong>${chars}</strong><p style="color: var(--text-muted); font-size: 0.9rem;">Characters</p></div>
            <div><strong>${charsNoSpaces}</strong><p style="color: var(--text-muted); font-size: 0.9rem;">Chars (no spaces)</p></div>
            <div><strong>${sentences}</strong><p style="color: var(--text-muted); font-size: 0.9rem;">Sentences</p></div>
            <div><strong>${paragraphs}</strong><p style="color: var(--text-muted); font-size: 0.9rem;">Paragraphs</p></div>
            <div><strong>${readingTime}</strong><p style="color: var(--text-muted); font-size: 0.9rem;">Min read</p></div>
        </div>
    `;
}

console.log('Tools functionality loaded');
