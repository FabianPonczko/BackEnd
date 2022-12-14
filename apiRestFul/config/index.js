// import dotenv from 'dotenv'
const dotenv =require('dotenv')

dotenv.config()
const PRODUCTS_FINENAME ="products"
const CARTS_FILENAME ="carts"

const config={
    SERVER:{
        PORT:process.env.PORT,
        SELECTED_DATABASE:process.env.Selected_DB
    },
    DATABASES:{
        FileSystem:{
            PRODUCTS_FINENAME,
            CARTS_FILENAME
        },
        mongo:{
            url: process.env.Mongo_DB_Url,
            dbName:process.env.Mongo_DB_Name
        }
    }
}
module.export ={config}