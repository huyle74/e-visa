import nodemailer from 'nodemailer';
import { email, emailPassword } from '../config/envLoader';

const sendEmail = (userEmail: string, url: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: emailPassword,
    },
  });

  const emailOption = {
    from: email,
    to: userEmail,
    subject: 'Verify Email',
    text: url,
  };

  transporter.sendMail(emailOption, (error, info) => {
    if (error) throw new Error('Cannot send email');

    console.log(info.response);
  });
};

export default sendEmail;
