require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('src'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAtuh2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

oAtuh2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const accessToken = oAtuh2Client.getAccessToken();

app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL_TO,
    subject: `Static Resp Web - From ${req.body.nome}: ${req.body.assunto}`,
    text:
      'De: ' +
      req.body.nome +
      '\nE-mail: ' +
      req.body.email +
      '\nAssunto: ' +
      req.body.assunto +
      '\nMensagem: ' +
      req.body.mensagem,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.send('success');
    }
    transporter.close();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
GMAIL SERVICE SEM OAUTH
*/

// require('dotenv').config();
// const nodemailer = require('nodemailer');
// const express = require('express');
// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use(express.static('src'));
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/src/index.html');
// });

// app.post('/', (req, res) => {
//   // console.log(req.body);

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
// tls: {
//   rejectUnauthorized: false,
// },
//   });

//   const mailOptions = {
//     from: req.body.email,
//     to: process.env.EMAIL_TO,
//     subject: `Static Resp Web - From ${req.body.nome}: ${req.body.assunto}`,
//     text:
//       'De: ' +
//       req.body.nome +
//       '\nE-mail: ' +
//       req.body.email +
//       '\nAssunto: ' +
//       req.body.assunto +
//       '\nMensagem: ' +
//       req.body.mensagem,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.send('error');
//     } else {
//       console.log('E-mail enviado: ' + info.response);
//       res.send('success');
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
