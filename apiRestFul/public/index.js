
const socket = io()

let users = []
let messages = []
let products = []

const loginSession = document.getElementById('loginSession')
const productSection = document.getElementById('products')
const createProductForm = document.getElementById('createProduct__form')
const chatDisplay = document.getElementById('chat__display')
const textMsgForm = document.getElementById('textMsg__form')
const emailForm = document.getElementById('email__form')
const deleteFormDiv = document.getElementById('borrarProduct_div')




// const comprar_id = document.getElementById(documentID)


//banner de session de usuario
const renderSessionUser = async (userName)=>{
  let response = await fetch('./views/sessionUser.hbs')
  const template = await response.text()
  const templateCompiled= Handlebars.compile(template)
  const html = templateCompiled({userName})
  loginSession.innerHTML = html
  

  if(userName=="fabianponczko@live.com.ar"){
    let responsePagina = await fetch('./views/deleteProducts.hbs')
    const templateDelete = await responsePagina.text()
    const templateCompiledDelete= Handlebars.compile(templateDelete)
    const hbsDelete = templateCompiledDelete()
    deleteFormDiv.innerHTML = hbsDelete
    
    const deleteForm = document.getElementById('borrarProduct__form')      
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const deleteFormData = new FormData(deleteForm)
        const deleteIdValues = Object.fromEntries(deleteFormData)
        console.log(deleteIdValues)
        deleteForm.reset()
        socket.emit('new delete', deleteIdValues)
      })
  }
}


const cleanProducts = () => {
    productSection.innerHTML = ""
  }
  const renderProducts = async (products) => {
    let response = await fetch('./views/tableProducts.hbs')
    const template = await response.text()
    const templateCompiled = Handlebars.compile(template)
    const html = templateCompiled({ products })
    productSection.innerHTML = html
    
    const documentID = document.querySelectorAll(".comprar_Id")
    documentID.forEach((item)=>{
      console.log(item.id.split("_").pop())
      const button_Id = item.id.split("_").pop()
      item.addEventListener("click",()=>{
        console.log(`el boton ${button_Id} fue clickeado`)
      })
    })
  }

  createProductForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(createProductForm)
    const formValues = Object.fromEntries(formData)
    createProductForm.reset()
    formValues.title!==""?socket.emit('new product', formValues):""
  })

 
  const cleanChat = () => {
    chatDisplay.innerHTML = ""
  }

  const getNameBySocketId = (socketId) => {
    const foundData = messages.find( element => element.id === socketId )
    console.log("foundData",foundData)
    if(foundData === undefined)
      return 'Desconectado'
    
    if(foundData.id)
      return foundData.id
  }

  const renderMsg = (msgData,text) => {
    const {id,nombre,apellido,edad,alias,avatar} = msgData
    const classMsg =  "chat__msg"
    const chatMsg = document.createElement("div")
    const chatOwner = document.createElement("p")
    const ChatText = document.createElement("p")
    const chatEmail = document.createElement("p")
    const chatNombre = document.createElement("p")
    const chatApellido = document.createElement("p")
    const chatEdad = document.createElement("p")
    const chatAlias = document.createElement("p")
    const chatAvatar = document.createElement("p")
    const chatText = document.createElement("p")
    const chatDate = document.createElement("p")

    chatMsg.classList.add(classMsg)
    ChatText.classList.add(classMsg)
    chatOwner.classList.add('chat__owner')
    chatDate.classList.add('chat__date')
    chatMsg.appendChild(chatOwner)
    chatMsg.appendChild(chatEmail)
    chatMsg.appendChild(chatNombre)
    chatMsg.appendChild(chatApellido)
    chatMsg.appendChild(chatEdad)
    chatMsg.appendChild(chatAlias)
    chatMsg.appendChild(chatAvatar)
    chatMsg.appendChild(chatText)

    chatEmail.innerHTML = id
    chatNombre.innerHTML=nombre
    chatApellido.innerHTML=apellido
    chatEdad.innerHTML=edad
    chatAlias.innerHTML=alias
    chatAvatar.innerHTML=avatar
    chatText.innerHTML=text
    chatDisplay.appendChild(chatMsg)
  }

  textMsgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(textMsgForm)
    const formValues = Object.fromEntries(formData)
    socket.emit('new msg', formValues)
  })
  
  socket.on('user', userName  => {    
    console.log("llegan",userName)  
    if(userName==null){
      // location.href="/login"
      location.href="/loginEmail"
    }  
    renderSessionUser(userName)
  })
  socket.on('all products', (allProduct)  => {    
    products = allProduct
    cleanProducts()
    renderProducts(allProduct)
  // renderLoginUser(userName)
  })
 
  //llegan los mensajes normalizados

  const author = new normalizr.schema.Entity('author',{idAttribute: 'id'})//{idAttribute: 'email'}

  const mensajes = new normalizr.schema.Entity('mensajes',{
      mensajes : author
  }) 

  socket.on('all messages', allMsg => {
    messages = allMsg
    //desnormalizo los mensajes para mostrarlos en el dom
    console.log(allMsg)
    const allMsgDesnormalized = normalizr.denormalize(allMsg.result,mensajes, allMsg.entities)
    cleanChat()
     for (msgData of allMsgDesnormalized.authorData){
      renderMsg(msgData.author,msgData.text)
     }
     chatDisplay.scrollTo(0, chatDisplay.scrollHeight)
    })
