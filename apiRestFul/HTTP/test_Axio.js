const axios = require('axios')
axios.defaults.baseURL='http://localhost:8080'


async function getUsers()  {

    try {
        const res = await axios('/axios/users')
        console.log(res)
    }
    catch(e){
        console.log(e)
    }
} 
getUsers()