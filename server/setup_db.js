require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err.message);
        console.log('Ensure MySQL is running and credentials in .env are correct.');
        process.exit(1);
    }
    console.log('Connected to MySQL server.');

    const dbName = process.env.DB_NAME || 'shyamvertex_db';

    connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
        if (err) {
            console.error('Error creating database:', err.message);
            process.exit(1);
        }
        console.log(`Database '${dbName}' created or already exists.`);

        connection.changeUser({ database: dbName }, (err) => {
            if (err) {
                console.error('Error switching to database:', err.message);
                process.exit(1);
            }

            const createApplicationsTable = `
                CREATE TABLE IF NOT EXISTS applications (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    mobile VARCHAR(20) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    experience VARCHAR(50),
                    projects TEXT,
                    role VARCHAR(100),
                    skills TEXT,
                    resume_path VARCHAR(255),
                    portfolio VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            connection.query(createApplicationsTable, (err) => {
                if (err) {
                    console.error('Error creating applications table:', err.message);
                } else {
                    console.log('Table "applications" created or already exists.');

                    // Add columns if they don't exist (for existing tables)
                    const alterQueries = [
                        "ALTER TABLE applications ADD COLUMN IF NOT EXISTS skills TEXT",
                        "ALTER TABLE applications ADD COLUMN IF NOT EXISTS resume_path VARCHAR(255)",
                        "ALTER TABLE applications ADD COLUMN IF NOT EXISTS portfolio VARCHAR(255)"
                    ];

                    alterQueries.forEach(query => {
                        connection.query(query, (err) => {
                            if (err && err.code !== 'ER_DUP_FIELDNAME') {
                                console.error('Error altering table:', err.message);
                            }
                        });
                    });
                }

                const createContactTable = `
                    CREATE TABLE IF NOT EXISTS contact_messages(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    subject VARCHAR(255),
                    message TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                `;

                connection.query(createContactTable, (err) => {
                    if (err) {
                        console.error('Error creating contact_messages table:', err.message);
                    } else {
                        console.log('Table "contact_messages" created or already exists.');
                    }

                    // Add a sample service table if needed
                    const createServicesTable = `
                        CREATE TABLE IF NOT EXISTS services(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                `;

                    connection.query(createServicesTable, (err) => {
                        if (err) {
                            console.error('Error creating services table:', err.message);
                        } else {
                            console.log('Table "services" created or already exists.');
                        }

                        console.log('Database setup complete!');
                        connection.end();
                    });
                });
            });
        });
    });
});
