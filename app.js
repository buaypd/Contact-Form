// Import the express module
import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import { validateForm } from './validation.js';

dotenv.config();


// Create an instance of an Express application
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
// Define the port number where our server will listen 
const PORT = 3020;

//const contacts = [];

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client

app.get('/', (req, res) => {
    res.render("contact");
});

app.get('/confirmation', (req, res) => {
    res.render("confirmation");
});
app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

app.get('/resume', (req, res) => {
    res.render('resume');
});

app.get('/admin', async (req, res) => {
    let sql = "SELECT * FROM contacts ORDER BY submitted_at DESC";
    const contacts = await pool.query(sql);
    console.log(contacts);

    res.render('admin', {contacts: contacts[0] });
});

app.get('/db-test', async(req, res) => {
    try {
        const contacts = await pool.query('SELECT * FROM contacts');
        res.send(contacts[0]);
    } catch(err) {
        console.error('Database error: ', err);
        res.status(500).send('Database error');
    }
});

app.post('/submit', async (req, res) => {
    
    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        meet: req.body.meet,
        other: req.body.other,
        comment: req.body.comment,
        mailingList: req.body.mailingList ? true : false,
        emailFormat: req.body.emailFormat
    };
    
     const valid = validateForm(contact);
    if (!valid.isValid) {
        return res.render('contact', {
            errors: valid.errors,
            formData: contact
        });
    }

    const params = [
        contact.fname,
        contact.lname,
        contact.email,
        contact.jobTitle || null,
        contact.company || null,
        contact.linkedin || null,
        contact.meet || null,
        contact.other || null,
        contact.comment || null,
        contact.mailingList,
        contact.emailFormat || null
    ];

    try {
        const sql = `INSERT INTO contacts (fname, lname, email, job_title, company, 
                     linkedin_url, meet, other, comment, mailing_list, email_format)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const result = await pool.execute(sql, params);
        console.log("Contact inserted with ID: ", result[0].insertId);
        
        res.render("confirmation", { contact });
        
    } catch(err) {
        console.error('Database error: ', err);
        res.status(500).send('Error saving contact');
    }
});
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});