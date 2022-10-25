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
    let response = await fetch('/views/tableProducts.hbs')
    // console.log({response})
    const template = await response.text()
    const templateCompiled = Handlebars.compile(template)
    const html = templateCompiled({ products })
    productSection.innerHTML = html
  }

  createProductForm.addEventListener('submit', (e) => {
    // console.log('enviando')
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
    const foundData = messages.find( element => element.socketId === socketId )
    if(foundData === undefined)
      return 'Desconectado'
    if(!foundData.name)
      return foundData.socketId
    else return foundData.name
  }

  const renderMsg = ({msg, socketId, createdAt}) => {
    console.log({msg})
    const classMsg = (msg.email === socketId) ? "chat__msg-own": "chat__msg"
    const chatOwnerContent = (socketId === socket.id) ? "Yo" : getNameBySocketId(socketId)
    const chatMsg = document.createElement("div")
    const chatOwner = document.createElement("p")
    const chatDate = document.createElement("p")
    chatMsg.classList.add(classMsg)
    chatOwner.classList.add('chat__owner')
    chatDate.classList.add('chat__date')
    chatOwner.innerHTML = chatOwnerContent
    chatDate.innerHTML = createdAt
    chatMsg.appendChild(chatOwner)
    chatMsg.innerHTML = chatMsg.innerHTML + msg.textMsg
    chatMsg.appendChild(chatDate)
    chatDisplay.appendChild(chatMsg)
    // console.log('llegaron los mensajes')
  }

  textMsgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(textMsgForm)
    const formValues = Object.fromEntries(formData)
    // console.log(formValues)
    // socket.emit('new msg', formValues.textMsg)
    socket.emit('new msg', formValues)
  })
  
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // const formData = new FormData(aliasForm)
    // const formValues = Object.fromEntries(formData)
    // socket.emit('change alias', String(formValues.alias))
  })
  socket.on('all products', allProduct => {
    // console.log(`llegando los productos ${allProduct}`)
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
