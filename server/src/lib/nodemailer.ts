import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_SMTP_USER,
    pass: process.env.NODEMAILER_SMTP_GOOGLE_APP_PASSWORD,
    // clientId: process.env.GOOGLE_CLIENT_ID,
    // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // refreshToken: process.env.GOOGLE_REFRESH_TOKEN, // TODO: Not Working
  },
});

export async function nodemailerSendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html: string;
}) {
  // Wrap in an async IIFE so we can use await.
  return await transporter.sendMail({
    from: process.env.NODEMAILER_SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}

// {
//   info: {
//     accepted: [ 'segovi3518@httpsu.com' ],
//     rejected: [],
//     ehlo: [
//       'SIZE 35882577',
//       '8BITMIME',
//       'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
//       'ENHANCEDSTATUSCODES',
//       'PIPELINING',
//       'CHUNKING',
//       'SMTPUTF8'
//     ],
//     envelopeTime: 714,
//     messageTime: 650,
//     messageSize: 467,
//     response: '250 2.0.0 OK  1764696511 41be03b00d2f7-be508b06606sm15454285a12.18 - gsmtp',
//     envelope: { from: 'dustobalok000@gmail.com', to: [Array] },
//     messageId: '<7ee12439-e43d-7170-aa4e-b0a52ea22556@gmail.com>'
//   }
// }
