import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // you can also use "hotmail", "yahoo" etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // your email to receive messages
      subject: `Portfolio Contact Form: ${name}`,
      text: `
        You got a new message from your portfolio contact form 👇

        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
