

const verifyRole = (req,res,next)=>{

    const {IS_ADMIN} = req.body
    if(!IS_ADMIN) return res.send({error:"Usuario no autorizado"})

    next()
}

export {verifyRole}