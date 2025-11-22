import nodemailer from "nodemailer";
import { email, emailPassword } from "../config/envLoader";

const sendEmail = (userEmail: string, url: string, userName: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: emailPassword,
    },
  });

  const emailBody = `
  <div style="
  font-family: Arial, sans-serif; 
  background-color: #f7f7f7; 
  padding: 20px 5px 20px 5px;
  height: 100%;
">
  <div style="
    max-width: 600px; 
    margin: auto; 
    background: #ffffff; 
    padding: 25px; 
    border-radius: 8px; 
    border: 1px solid #e0e0e0;
  ">
    <h2 style="color: #333333;">Hi ${userName},</h2>

    <p style="font-size: 15px; color: #555555; line-height: 1.6;">
      Welcome to <strong>MyEvisa.app</strong>! We're excited to help you with your travel plans.
    </p>

    <p style="font-size: 15px; color: #555555; line-height: 1.6;">
      To complete your registration and secure your account, please click the button below to verify your email address.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${url}" style="
        display: inline-block;
        padding: 12px 24px;
        font-size: 14px;
        color: #ffffff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 5px;
      ">
        Verify Your Email Address
      </a>
    </div>

    <p style="font-size: 15px; color: #555555; line-height: 1.6; margin-top: 25px;">
      This verification link is valid for 24 hours.
    </p>

    <p style="font-size: 15px; color: #555555; line-height: 1.6;">
      If you did not create this account, please disregard this email.
    </p>

    <p style="font-size: 15px; color: #555555; line-height: 1.6; margin-top: 30px;">
      Thank you,<br>
      <strong>The MyEvisa.app Team</strong>
    </p>
  </div>
</div>
`;

  const emailOption = {
    from: email,
    to: userEmail,
    subject: "[MyEvisa.app] Action Required: Please Verify Your Email Address",
    html: emailBody,
  };

  transporter.sendMail(emailOption, (error, info) => {
    if (error) throw new Error("Cannot send email");

    console.log(info.response);
  });
};

export default sendEmail;
