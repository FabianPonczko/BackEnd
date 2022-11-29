
const socket = io()

let users = []
let messages = []
let products = []

const productSection = document.getElementById('products')
const createProductForm = document.getElementById('createProduct__form')
const chatDisplay = document.getElementById('chat__display')
const textMsgForm = document.getElementById('textMsg__form')
const emailForm = document.getElementById('email__form')

const cleanProducts = () => {
    productSection.innerHTML = ""
  }
  const renderProducts = async (products) => {
    let response = await fetch('./views/tableProducts.hbs')
    const template = await response.text()
    const templateCompiled = Handlebars.compile(template)
    const html = templateCompiled({ products })
    productSection.innerHTML = html
  }

  createProductForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(createProductForm)
    const formValues = Object.fromEntries(formData)
    createProductForm.reset()
    socket.emit('new product', formValues)
  })
  const cleanChat = () => {
    chatDisplay.innerHTML = ""
  }

  const getNameBySocketId = (socketId) => {
    console.log("socketid",socketId)
    // const foundData = messages.find( element => element.socketId === socketId )
    const foundData = messages.find( element => element.id === socketId )
    console.log("foundData",foundData)
    if(foundData === undefined)
      return 'Desconectado'
    
    if(foundData.id)
      return foundData.id
    // else return foundData.name
  }

  const renderMsg = (msgData) => {
    const {id,nombre,apellido,edad,alias,avatar,text} = msgData
    // const mensaje = JSON.parse(msgData)
    // const {text} = msgData
    console.log()
    const authorData = {
    author:{
      id,
      nombre,
      apellido,
      edad,
      alias,
      avatar,
    },
    text
  }

    console.log(authorData)
    // const classMsg = (msgData.email === socketId) ? "chat__msg-own": "chat__msg"
    const classMsg =  "chat__msg"
    // const chatOwnerContent = (socketId === socket.id) ? "Yo" : getNameBySocketId(socketId)
    // const chatOwnerContent =  getNameBySocketId(msgData.id)
    const chatMsg = document.createElement("div")
    const chatOwner = document.createElement("p")
    const ChatText = document.createElement("p")
    const chatEmail = document.createElement("p")
    const chatNombre = document.createElement("p")
    const chatApellido = document.createElement("p")
    const chatEdad = document.createElement("p")
    const chatAlias = document.createElement("p")
    const chatAvatar = document.createElement("p")
    const chatDate = document.createElement("p")

    chatMsg.classList.add(classMsg)
    ChatText.classList.add(classMsg)
    chatOwner.classList.add('chat__owner')
    chatDate.classList.add('chat__date')
    // chatOwner.innerHTML = chatOwnerContent
    // chatDate.innerHTML = createdAt
    chatMsg.appendChild(chatOwner)
    chatMsg.appendChild(chatEmail)
    chatMsg.appendChild(chatNombre)
    chatMsg.appendChild(chatApellido)
    chatMsg.appendChild(chatEdad)
    chatMsg.appendChild(chatAlias)
    chatMsg.appendChild(chatAvatar)

    chatEmail.innerHTML = id
    chatNombre.innerHTML=nombre
    chatApellido.innerHTML=apellido
    chatEdad.innerHTML=edad
    chatAlias.innerHTML=alias
    chatAvatar.innerHTML=avatar
    // ChatText.innerHTML = JSON.stringify(authorData,null,2) 
    chatDisplay.appendChild(chatMsg)
    // chatMsg.appendChild(chatDate)
  }

  textMsgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(textMsgForm)
    const formValues = Object.fromEntries(formData)
    socket.emit('new msg', formValues)
  })
  
  socket.on('all products', allProduct => {
    products = allProduct
    cleanProducts()
    renderProducts(allProduct)
  })
 
  socket.on('all messages', allMsg => {
    messages = allMsg
    cleanChat()
     for (msgData of allMsg){
      renderMsg(msgData)
     }
     chatDisplay.scrollTo(0, chatDisplay.scrollHeight)
    })
