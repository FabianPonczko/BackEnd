const { MongoDbContainer } = require("./../../containers/MongoDbContainer");
const { ChatModels } = require("./../../Models/ChatModel");

let instancia = null

 module.exports =  class ChatMongo extends MongoDbContainer{
    static instancia
    constructor(){
        super({
            name:ChatModels.ChatCollection,
            schema: ChatModels.ChatSchema
        })
    }
    static getinstanciaChatsMongo = ()=>{
        if (!instancia){
            instancia = new ChatMongo()
            console.log("instancia Chat creada")
        }
        return instancia
    }
}
