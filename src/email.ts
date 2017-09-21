import config from "../config/config";
import * as nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: "jarvisprestidge@gmail.com",
        accessToken: config.ACCESS_TOKEN
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

smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    }
    console.log("Message sent: " + info.messageId);
});
