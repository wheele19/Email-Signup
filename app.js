const fs = require('fs');
var dotenv = require("dotenv")
dotenv.config()

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const emailPassword = process.env.EMAIL_PASSWORD;
const path = require('path');
dotenv.config()


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.post('/subscribe', (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log(req.body);
  const email = req.body.email;
  console.log(email);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'email@gmail.com',
      pass: emailPassword,
    },
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


  const mailOptions = {
    from: 'no-reply@email.com',
    to: 'email@gmail.com',
    subject: 'New subscriber for ...',
    text: `A new subscriber with the email address: ${email} has signed up for ...`,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('There was a problem, please try again.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Thank you for subscribing!');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
