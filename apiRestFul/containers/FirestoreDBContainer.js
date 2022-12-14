// import mongoose from "mongoose"
// import {FireBaseDBservice} from '../services/FireBaseService/index.js'
 import firebase from 'firebase-admin'

 const db=firebase.firestore()

class FireBaseDbContainer{
    constructor({collections}) {
        // FireBaseDBservice.init().then(db=>{
        //     this.model= db.collection(collections)
        // })
        this.model= db.collection(collections)
    }

    async getAll() {
       const response = await this.model.get()
       return response.docs.map(doc =>{ return {...doc.data(), id:doc.id}} )
    }
    
    async save(element){
        const response=this.model.doc().create(element)
        // nos brinda un documento temporal con un id autogenerado
       
        return response
    }

    async getById(id) {
        const response = await this.model.doc(id).get()
        return {...response.data(),id:response.id}
    }
    async updateById(id,newData) {
        const elemento =  this.model.doc(id)
        const response = await elemento.update(newData)
        return response
    }
    async DeleteById(id) {
        const response = this.model.doc(id).delete()
        return response
    }
    
}

export {FireBaseDbContainer}
