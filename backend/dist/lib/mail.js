"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = void 0;
const nodemailer_1 = require("nodemailer");
const transport = nodemailer_1.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
function makeANiceEmail(text) {
    return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>

      <p>😘, Shoptrends</p>
    </div>
  `;
}
async function sendPasswordResetEmail(resetToken, to) {
    // email the user a token
    const info = (await transport.sendMail({
        to,
        from: "noha@shoptrends.com",
        subject: "Your password reset token!",
        html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
    }));
    if (process.env.MAIL_USER.includes("ethereal.email")) {
        console.log(`💌 Message Sent!  Preview it at ${nodemailer_1.getTestMessageUrl(info)}`);
    }
}
exports.sendPasswordResetEmail = sendPasswordResetEmail;
