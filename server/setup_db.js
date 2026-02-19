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
                        "ALTER TABLE applications ADD COLUMN skills TEXT",
                        "ALTER TABLE applications ADD COLUMN resume_path VARCHAR(255)",
                        "ALTER TABLE applications ADD COLUMN portfolio VARCHAR(255)"
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

                        // Create job_settings table
                        const createJobSettingsTable = `
                            CREATE TABLE IF NOT EXISTS job_settings (
                                role_id VARCHAR(50) PRIMARY KEY,
                                is_hiring BOOLEAN DEFAULT TRUE,
                                label VARCHAR(100)
                            )
                        `;

                        connection.query(createJobSettingsTable, (err) => {
                            if (err) {
                                console.error('Error creating job_settings table:', err.message);
                                connection.end();
                            } else {
                                console.log('Table "job_settings" created or already exists.');

                                // Insert default values if they don't exist
                                const defaultJobs = [
                                    { role_id: 'fulltime', label: 'Full-time' },
                                    { role_id: 'internship', label: 'Internship' },
                                    { role_id: 'freelance', label: 'Freelance' }
                                ];

                                let completed = 0;
                                defaultJobs.forEach(job => {
                                    const insertQuery = `
                                        INSERT IGNORE INTO job_settings (role_id, is_hiring, label)
                                        VALUES (?, TRUE, ?)
                                    `;
                                    connection.query(insertQuery, [job.role_id, job.label], (err) => {
                                        if (err) console.error(`Error inserting default job ${job.role_id}:`, err.message);

                                        completed++;
                                        if (completed === defaultJobs.length) {
                                            console.log('Database setup completed successfully.');
                                            connection.end();
                                        }
                                    });
                                });
                            }
                        });
                    });
                });
            });
        });
    });
});
