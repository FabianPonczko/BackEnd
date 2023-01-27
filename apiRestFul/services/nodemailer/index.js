const {createTransport} = require('nodemailer')


const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'fabianponczko@gmail.com',
        pass: 'nckrdvwwpdkhqnph'
    },
     tls : { rejectUnauthorized: false }
})


const envioMail=async(email, name,adress,age,phone,photo)=>{
    const mailOptions ={
        from:"servidor node",
        to:'fabianponczko@gmail.com',
        subject:"mail de prueba",
        html:`
        <h1 style="color:blue;">Nuevo usuario registrado</h1>
        <h3>nombre: ${name} </h3>
        <h3>email: ${email} </h3>
        <h3>dirección: ${adress} </h3>
        <h3>edad: ${age} </h3>
        <h3>telefono: ${phone} </h3>
        <h3>foto: ${photo} </h3>

        `
    }

    try {
        const info= await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

module.exports ={envioMail}