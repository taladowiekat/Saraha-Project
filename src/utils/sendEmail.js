import nodemailer from "nodemailer";


async function sendEmail(to ,subject,token) {
    
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

        // send mail with defined transport object
  const info = await transporter.sendMail({
    
    from: `"Tala Dowiekat 👻" <${process.env.EMAIL}>`,
    to: to,
    subject,
    html: `<h2>Hiiiiiiiiiiii</h2>
    <a href='http://localhost:3000/auth/confirmEmail/${token}'>click here to consfirm your email</a>
    <a href='#'>click here to resend email confirm</a>
    `, // html body
  });
}
export default sendEmail;