import admin from 'firebase-admin'
import serviceAccount from './FirebaseServiceAccountKey.json'  assert {type: 'json'};

//  const admin = require("firebase-admin");

//  const serviceAccount = require('./services/FireBaseService/FirebaseServiceAccountKey.json');

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount)
});
const init = async()=>{
   try{
       const db= admin.firestore();
       console.log('FIREBASE CONECTADO')
       return db
   }
   catch(e){
       console.log('ERROR AL CONECTAR A FIREBASE ',e)
   }

}

export const FireBaseDBservice = {
    init
}