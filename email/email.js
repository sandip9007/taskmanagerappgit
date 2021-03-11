const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")


const msg = {
  to: 'sandipghoshal1987@gmail.com', // Change to your recipient
  from: 'sandipghoshal87@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

const sendEmail = (email)=>{
    sgMail.send({
        to: email, // Change to your recipient
        from: 'sandipghoshal87@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: `Thank you for signing up`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    })
}

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })


  module.exports = sendEmail