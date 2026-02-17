require('dotenv').config();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

// 1. Test Database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shyamvertex_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database Connection Failed:', err.message);
        process.exit(1);
    }
    console.log('✅ Database Connected');

    const query = 'INSERT INTO applications (name, mobile, email, experience, projects, role, skills, portfolio, resume_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = ['Test User', '1234567890', 'test@example.com', '0', 'Test Project', 'Tester', 'Testing', 'http://example.com', null];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('❌ Database Insert Failed:', err.message);
        } else {
            console.log('✅ Database Insert Success (ID:', result.insertId + ')');
        }
        db.end();
    });
});

// 2. Test Email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to self to test
    subject: 'Verification Test - Shyam Vertex',
    text: 'This is a test email to verify configuration.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('❌ Email Send Failed:', error.message);
        if (error.response) console.error('Response:', error.response);
    } else {
        console.log('✅ Email Send Success:', info.response);
    }
});
