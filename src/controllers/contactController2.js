import fetch from "node-fetch";

export const sendMail2 = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>", // free verified sender from Resend
        to: process.env.EMAIL_USER,                // your email to receive messages
        subject: `Portfolio Contact Form: ${name}`,
        html: `
          <h3>New Portfolio Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true, message: "Email sent successfully!", data });
    } else {
      res.status(500).json({ success: false, message: data.message || "Failed to send email" });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
