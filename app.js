// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
// Define the port number where our server will listen 
const PORT = 3020;

const contacts = [];

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    res.render("contact");
});

app.get('/confirmation', (req, res) => {
    res.render("confirmation");
});

app.get('/admin', (req, res) => {
    res.render("admin", { contacts });
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

    res.render("confirmation", {contact});
});
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});