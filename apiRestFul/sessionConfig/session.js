const session = require('express-session')
const MongoStore = require('connect-mongo')

const MongoUri = 'mongodb+srv://FabianPonczko:Dv6911us.m@cluster0.yhlgayf.mongodb.net/test'
const mongoOptions={useNewUrlParser:true,useUnifiedTopology:true}

const sesiones={
    mongo:session({
        store:MongoStore.create({
            mongoUrl:`${MongoUri}?dbName=segundaEntrega`,
            mongoOptions,
            ttl:3600,
            collectionName:'sessions'
        }),
        secret:'secret',
        resave: false,
        saveUninitialized: false
    })
}
module.exports = sesiones