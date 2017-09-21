import { gmail } from "../config/config";
import * as fs from "fs";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: gmail.USER,
        clientId: gmail.CLIENT_ID,
        clientSecret: gmail.CLIENT_SECRET,
        refreshToken: gmail.REFRESH_TOKEN,
        accessToken: gmail.ACCESS_TOKEN,
        expires: 3600
    }
});

const mailOptions: nodemailer.SendMailOptions = {
    from: "Tasker - Raspbery Pi @ Amazon",
    to: "jarvisprestidge@gmail.com",
    subject: "Tasker Status Alert"
}

/**
 * Send alert email
 * 
 * @param {string} [subject] 
 * @param {string} [text] 
 */
export const sendEmailAlert = (template: string, subject?: string): void => {
    // Read html template
    mailOptions.html = fs.readFileSync(`./templates/${template}.html`, "utf8");
    // Conditionally edit subject
    if (subject) mailOptions.subject = subject;
    // Send and log mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log("Message sent: " + info.messageId);
    });
}