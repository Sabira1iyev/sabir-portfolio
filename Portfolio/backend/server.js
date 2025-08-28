const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../'));  
// Email transporter oluştur
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS   
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, surname, email, message } = req.body;

        // Email template
        const mailOptions = {
            from: `"${name} ${surname}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // senin email adresin
            subject: `Portfolio'dan Yeni Mesaj - ${name} ${surname}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #092241;">Yeni İletişim Mesajı</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Gönderen:</strong> ${name} ${surname}</p>
                        <p><strong>Email:</strong> ${email}</p>
                    </div>

                    <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #092241; margin: 20px 0;">
                        <h3 style="color: #092241; margin-top: 0;">Mesaj:</h3>
                        <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
                    <p style="color: #6c757d; font-size: 12px; text-align: center;">
                        Bu mesaj portfolyo sitenizden gönderildi.
                    </p>
                </div>
            `
        };

        // Email gönder
        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            success: true, 
            message: 'Your message has been sent successfully!' 
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while sending the message.' 
        });
    }
});

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../index.html');
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
    console.log(`http://localhost:${PORT}`);
});
