"use server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    pool: true,
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: "dozenminimul12@gmail.com",
        pass: process.env.GMAIL_KEY
    },
    maxConnections: 1,
})
type EmailContent = {
    subject: string;
    body: string;
  };
export const sendEmail = async (emailContent: EmailContent) => {
    let resData;
    const mailOptions = {
      from: "dozenminimul12@gmail.com",
      to: "feedbacks.dozen@gmail.com",
      html: emailContent.body,
      subject: emailContent.subject,
    };
  
    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });
  
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("Email sent: ", info);
          resolve(info);
          return resData = info
        }
      });
    });
    return resData;
  };
