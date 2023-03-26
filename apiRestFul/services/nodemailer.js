const {createTransport} = require('nodemailer')

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'backendponczko@gmail.com',
        pass: 'dgchncmvwkwrnxle'
    },
     tls : { rejectUnauthorized: false }
})

const emailNuevoUsuario=async(email, name,adress,age,phone)=>{
    const mailOptions ={
        from:"servidor node",
        to:'backendponczko@gmail.com',
        subject:"nuevo registro",
        html:`
        <h1 style="color:blue;">Nuevo usuario registrado</h1>
        <h3>nombre: ${name} </h3>
        <h3>email: ${email} </h3>
        <h3>dirección: ${adress} </h3>
        <h3>edad: ${age} </h3>
        <h3>telefono: ${phone} </h3>
        `
    }

    try {
        const info= await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

module.exports ={emailNuevoUsuario}