
const {fork} = require('child_process')

let countNum

const random = (req,res)=>{
    countNum = req.query.cant || 100000000
    const child = fork('./util/calculoAleatorio.js',[countNum])
    child.on('message', msg => {
        res.send({resultado:msg})
    });

}
module.exports = {random}