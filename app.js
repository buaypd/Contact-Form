// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
// Define the port number where our server will listen 
const PORT = 3004;

const contacts = [];

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    
    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

app.get('/confirmation', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req, res) => {
    res.send(contacts);
});

app.post('/submit', (req, res) => {
    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        comment: req.body.comment,
        mailingList: req.body.mailingList ? true : false,
        emailFormat: req.body.emailFormat,
        timestamp: new Date()
    };

    
    contacts.push(contact);

    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});