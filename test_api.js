// const fetch = require('node-fetch'); // Using native fetch in Node 18+

async function testEndpoints() {
    console.log('Testing Contact API...');
    try {
        const contactResponse = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'This is a test message.'
            })
        });
        const contactResult = await contactResponse.json();
        console.log('Contact API Result:', contactResult);
    } catch (error) {
        console.error('Contact API Error:', error.message);
    }

    console.log('\nTesting Application API...');
    try {
        const applyResponse = await fetch('http://localhost:5000/api/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Job Seeker',
                mobile: '1234567890',
                email: 'seeker@example.com',
                experience: '5 years',
                projects: 'github.com/seeker',
                role: 'Full Stack Developer'
            })
        });
        const applyResult = await applyResponse.json();
        console.log('Application API Result:', applyResult);
    } catch (error) {
        console.error('Application API Error:', error.message);
    }
}

testEndpoints();
