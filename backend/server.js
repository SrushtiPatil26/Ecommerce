const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { jsPDF } = require("jspdf");
const html2canvas = require("html2canvas");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mane.dhananjay.p@gmail.com',
        pass: 'ejtf ucap gxvy pvbq'
    }
});

app.post('/contact', (req, res) => {
    const sql = "INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.message,
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/api/bills', (req, res) => {
    const sql = 'SELECT * FROM bill'; // Assuming your table name is 'bill'
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching bills:', err);
            res.status(500).json({ error: 'Failed to fetch bills' });
            return;
        }
        res.json(result);
    });
});

app.get('/api/customers', (req, res) => {
    const sql = 'SELECT * FROM register'; 
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching customers:', err);
            res.status(500).json({ error: 'Failed to fetch customer' });
            return;
        }
        res.json(result);
    });
});

app.get('/api/contacts', (req, res) => {
    const sql = 'SELECT * FROM contact'; 
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            res.status(500).json({ error: 'Failed to fetch contacts' });
            return;
        }
        res.json(result);
    });
});

app.post('/bill', async (req, res) => {
    const sql = "INSERT INTO bill (name, address, apartment, pincode, town, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.address,
        req.body.apartment,
        req.body.pincode,
        req.body.town,
        req.body.phone,
        req.body.email,
    ];

    db.query(sql, values, async (err, data) => {
        if (err) {
            console.error('Error inserting into bill table:', err);
            return res.status(500).json({ error: 'Failed to submit form' });
        }

        try {
            // Generate PDF attachment
            const pdfBuffer = await generatePDF(req.body);
            
            // Send email with PDF attachment
            const mailOptions = {
                from: 'mane.dhananjay.p@gmail.com', // Enter your Gmail email address
                to: req.body.email,
                subject: 'Your Bill Summary',
                text: 'Please find attached your bill summary.',
                attachments: [{
                    filename: 'bill_summary.pdf',
                    content: pdfBuffer // Pass the Buffer as the content of the attachment
                }]
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            return res.status(200).json({ message: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to submit form' });
        }
    });
});


const generatePDF = async (formData) => {
    const billDetails = `
        Billing Details
        Name: ${formData.name}
        Address: ${formData.address}
        Apartment: ${formData.apartment}
        Pincode: ${formData.pincode}
        Town: ${formData.town}
        Phone: ${formData.phone}
        Email: ${formData.email}
    `;

    const pdf = new jsPDF();
    // Render bill details on PDF
    pdf.text(billDetails, 10, 10);

    // Convert PDF to ArrayBuffer
    const pdfBuffer = pdf.output('arraybuffer');

    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(pdfBuffer);

    return buffer;
};






app.post('/register', (req, res) => {
    const sql = "INSERT INTO register (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM register WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ error: 'Failed to fetch user' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'User not found or invalid credentials' });
            return;
        }

        res.status(200).json({ message: 'Login successful' });
    });
});



app.listen(8081, () => {
    console.log("Listening on port number 8081");
});
