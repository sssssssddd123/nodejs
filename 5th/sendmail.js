const nodemailer = require('nodemailer');

// 메일
const transporter = nodemailer.createTransport({
  host: 'smtp.daum.net',
  port: 465,
  secure: true,
  auth: {
    user: 'gda521@daum.net',
    pass: 'bubeujxhxwcsuwxo',
  },
});

function mailSendFunc(mail, filaName) {
  const data = {
    from: 'gda521@daum.net',
    to: mail,
    subject: 'subject',
    html: `Sample Content`,
    attachments: [
      {
        filename: filaName,
        path: `./files/${filaName}`,
      },
    ],
  };
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(info);
      res.status(200).send('성공');
    }
  });
}

module.exports = { mailSendFunc };
