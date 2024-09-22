import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'saikrishnaunique01@gmail.com', // Your email
        pass: 'qval oxru bxqq vpne',  // Your password or App-specific password if using 2FA
    },
});

// Function to send OTP
const sendOtpEmail = async (email, otp) => {
    try {
        // Email options
        const mailOptions = {
            from: 'saikrishnaunique01@gmail.com', // Sender address
            to: email,                    // Receiver's email
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`, // Plaintext body
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};



export default sendOtpEmail;
