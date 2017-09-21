import { gmail } from "../config/config";
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

const mailOptions = {
    from: "Tasker - Raspbery Pi @ Amazon",
    to: "jarvisprestidge@gmail.com",
    subject: "Tasker Status Alert",
    text:
    `
    Hello master,

    ** Unable to fetch document from dropbox storage. **

    You may have changed the file name from tasklist.csv or changed the folder structure.

    This was an automated message... Beep Boop.

    Sincerely,
    Tasker
    `
}

/**
 * Send alert email
 * 
 * @param {string} [subject] 
 * @param {string} [text] 
 */
export const sendEmailAlert = (subject?: string, text?: string): void => {
    if (subject) {
        mailOptions.subject = subject;
    }
    if (text) {
        mailOptions.text = text;
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log("Message sent: " + info.messageId);
    });
}