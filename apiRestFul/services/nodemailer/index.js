const {createTransport} = require('nodemailer')


const userName = "eunice.runte66@ethereal.email"
const userPassword=	"8CEvuPBW7kQE3MsePB"
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: userName,
        pass: userPassword
    }
});

const mailOptions ={
    from:"servidor node",
    to:userName,
    subject:"mail de prueba",
    html:'<h1 style="color:blue;">Mail de prueba </h1'
}

