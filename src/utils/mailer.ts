import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  type: "Verify" | "Reset";
  token?: string;
  username?: string;
}

export const sendEmail = async ({ email, type, token, username }: EmailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "493c799c1b0785", // Replace with your Mailtrap user
        pass: "80bd51b9bfbcca", // Replace with your Mailtrap password
      },
    });

    const baseURL = process.env.DOMAIN || "http://localhost:3000"; 
    const link = token ? `${baseURL}/reset-password?token=${token}` : null;

    const mailOptions = {
      from: "aktsln21@gmail.com",
      to: email,
      subject: type === "Verify" ? "Registration Successful" : "Reset Your Password",
      text: type === "Verify"
        ? "You have successfully registered. Please wait for admin verification to log in."
        : `You requested to reset your password. Use this link: ${link}`,
      html: `
        <div>
          <h3>${type === "Verify" ? "Welcome to Our Platform" : "Password Reset Request"}</h3>
          <p>Hi ${username || "User"},</p>
          <p>${type === "Verify"
            ? "You have successfully registered. Please wait for admin verification to log in."
            : `You requested to reset your password. Click the link below to reset your password: <a href="${link}">Reset Password</a>`
          }</p>
          ${type === "Reset" ? "<p>This link is valid for 30 minutes.</p>" : ""}
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email could not be sent");
  }
};
