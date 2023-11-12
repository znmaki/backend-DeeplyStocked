const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const sendEmail = ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject,
    html,
  };

  if (process.env.NODE_ENV == 'test') return;

  transporter.sendMail(options, err => {
    if (err) {
      if (err.errno === -111)
        console.log('\n[Servidor] sin conexión a internet\n');
      else console.log(err);
    } else {
      console.log(`Email sent to ${to}`);
    }
  });
};

const sendForgotPasswordEmail = ({ user, token }) => {
  const link = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
  const template = ejs.compile(
    fs.readFileSync(
      path.join(__dirname, '../../views/forgotPassword.ejs'),
      'utf8',
    ),
  );

  sendEmail({
    to: user.email,
    subject: 'Recuperar contraseña',
    html: template({ link, user }),
  });
};

const sendActivationEmail = ({ user, token }) => {
  const link = `${process.env.FRONTEND_URL}/auth/activate?token=${token}`;
  const template = ejs.compile(
    fs.readFileSync(
      path.join(__dirname, '../../views/userActivation.ejs'),
      'utf8',
    ),
  );

  sendEmail({
    to: user.email,
    subject: 'Activar cuenta',
    html: template({ link, user }),
  });
};

module.exports = {
  sendEmail,
  sendForgotPasswordEmail,
  sendActivationEmail,
};
