const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: process.env.EMAILPROV,
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD
    }
});

const emailRoutes = (app) => {

    //WRITE
    app.post('/api/email', (req, res) => {
        const data = req.body;
        const mailOptions = {
            from: process.env.EMAILUSER,
            to: [data.emailFormControl, process.env.EMAILUSER],
            subject: 'Hildebrando Portfolio Message',
            html: `<p><br>Thank you for the message, I will get back to you ASAP.
            <br><br><b>Message from ${data.nameFormControl}
            </b><br>${data.messageFormControl}</p>`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('ERROR', err)
                res.json({ error: err});
            } else {
                console.log('INFO', info);
                res.json({ sucess: info });
            }
        });

    });

};

module.exports = emailRoutes;