
const socket = io()

let users = []
let localUserName={}
let messages = []
let products = []
let idProductModify=""

const loginSession = document.getElementById('loginSession')
const ingresoProductosDiv = document.getElementById('ingresoProductos')
const productSection = document.getElementById('products')
const chatCard = document.getElementById('chat')
chatCard.style.display="none"
const chatDisplay = document.getElementById('chat__display')
chatDisplay.style.display="none"
const textMsgForm = document.getElementById('textMsg__form')
const btn_UserEmail = document.getElementById('btnUserEmail')
const btn_LoadChat = document.getElementById('loadChat')
btn_UserEmail.style.display="none"
const emailForm = document.getElementById('email__form')
const deleteFormDiv = document.getElementById('borrarProduct_div')
const document_Description = document.getElementById("title")
const document_Price = document.getElementById("price")
const document_Category = document.getElementById("category")
const document_Thumbnail = document.getElementById("thumbnail") 

//banner de session de usuario
const renderSessionUser = async (userName)=>{
  localUserName=userName
  let response = await fetch('./views/sessionUser.hbs')
  const template = await response.text()
  const templateCompiled= Handlebars.compile(template)
  const html = templateCompiled({userName:userName.nombreUsuario})
  loginSession.innerHTML = html
  
  localUserName.admin? btn_UserEmail.style.display="block":btn_UserEmail.style.display="none"
  
  if(userName.admin){ 
    let paginaIngresoProducts = await fetch('./views/ingresoProducts.hbs')
    const templateIngresoProducts = await paginaIngresoProducts.text()
    const templateCompiledIngresoProducts= Handlebars.compile(templateIngresoProducts)
    const hbsIngresoProducts = templateCompiledIngresoProducts()
    ingresoProductosDiv.innerHTML = hbsIngresoProducts
    
    const btn_agregar = document.getElementById("btnAgregar")
    const btn_modificar = document.getElementById('btnModificar')
    btn_modificar.style.display="none"
    
    const createProductForm = document.getElementById('createProduct__form')
    
    //nuevo producto 
    createProductForm.addEventListener('submit', (e) => {
      console.log("boton agregar")
      e.preventDefault()
      const formData = new FormData(createProductForm)
      const formValues = Object.fromEntries(formData)
      createProductForm.reset()
      newProduct(formValues)
      
    })

    let responsePagina = await fetch('./views/deleteProducts.hbs')
    const templateDelete = await responsePagina.text()
    const templateCompiledDelete= Handlebars.compile(templateDelete)
    const hbsDelete = templateCompiledDelete()
    deleteFormDiv.innerHTML = hbsDelete
    
    const deleteForm = document.getElementById('borrarProduct__form')      
    
    //delete producto
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const deleteFormData = new FormData(deleteForm)
        const deleteIdValues = Object.fromEntries(deleteFormData)
        console.log(deleteIdValues.id)
        deleteForm.reset()
         productBorrar(deleteIdValues.id)
  
      })

      //modificar producto
      btn_modificar.addEventListener('click',(e)=>{
        e.preventDefault()
        const dataProduct = new FormData(createProductForm)
        const dates = Object.fromEntries(dataProduct)
        createProductForm.reset()
        console.log("los nuevos datos: ",dates)
        btn_agregar.style.display="block"
        btn_agregar.disabled=false
        btn_modificar.style.display="none"
        modifyProduct(idProductModify,dates)
        idProductModify=""
        
      })

      
    }//final de admin
    chatCard.style.display="flex"
  }

  // Carga los productos en el form para modificar
    const modifyProducts = (productById)=>{
      const createProductForm = document.getElementById('createProduct__form')
      const document_Description = document.getElementById("title")
      const document_Price = document.getElementById("price")
      const document_Category = document.getElementById("category")
      const document_Thumbnail = document.getElementById("thumbnail") 
      console.log("llegan: ",productById)
      createProductForm.scrollIntoView(0,0)
      const btn_modificar = document.getElementById('btnModificar')
      btn_modificar.style.display="block"
      const btn_agregar = document.getElementById("btnAgregar")
      btn_agregar.style.display="none"
      btn_agregar.disabled = true
      idProductModify=productById.id
      document_Description.value = productById.title
      document_Price.value = productById.price
      document_Category.value = productById.category
      document_Thumbnail.value = productById.thumbnail

    }

const cleanProducts = () => {
    productSection.innerHTML = ""
  }
  const renderProducts = async (products,category) => {
    let response = await fetch('./views/tableProducts.hbs')
    const template = await response.text()
    const templateCompiled = Handlebars.compile(template)
    const html = templateCompiled( {products} )
    productSection.innerHTML = html
    
    const isVisibleTh = document.getElementsByClassName('isVisible')
    const btnBorrar_Tabla = document.getElementsByClassName('borrar_Id')
    const btnModificar_Tabla = document.getElementsByClassName('modificar_Id')

    if(!localUserName.admin){
      for (let index = 0; index < isVisibleTh.length; index++) {
        isVisibleTh[index].style.display="none"
        btnBorrar_Tabla[index].style.display="none"
        btnModificar_Tabla[index].style.display="none"
      }
    }
    
  // boton comprar producto
    const documentID = document.querySelectorAll(".comprar_Id")
    documentID.forEach((item)=>{
      // console.log(item.id.split("_").pop())
      const product_id = item.id.split("_").pop()
      item.addEventListener("click",()=>{
        console.log(`el boton ${product_id} fue clickeado`)
        comprarProduct(product_id)
      })
    })
  
  // boton borrar producto
     const documentBorrarID = document.querySelectorAll(".borrar_Id")
     documentBorrarID.forEach((item)=>{
      //  console.log(item.id.split("_").pop())
       const Borrar_Id = item.id.split("_").pop()
       item.addEventListener("click",()=>{
         console.log(`el boton ${Borrar_Id} fue clickeado`)
         productBorrar(Borrar_Id)

       })
     })
     
    //boton modificar productos
     const documentModificarID = document.querySelectorAll(".modificar_Id")
     documentModificarID.forEach((item)=>{
       // console.log(item.id.split("_").pop())
       const Modificar_Id = item.id.split("_").pop()
       item.addEventListener("click",()=>{
         productById(Modificar_Id)
       })
     })

     // filtrar productos por categoria
      const document_Category_Filter = document.getElementById('categoryId')
      document_Category_Filter.value=category||"Sin filtro"

      document_Category_Filter.addEventListener("change",()=>{
        const category = document_Category_Filter.value
        console.log("click categoryId",category)
        productsByCategory(category)
      })
  }

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
  
  const renderMsg =  async (msgData) => {
    if((msgData.isAdmin=="true" && msgData.to == localUserName.email)||
    (msgData.isAdmin=="false"&&msgData.to=="System"&& msgData.userEmail==localUserName.email)) {
    }
    
    const {messages,userEmail,createAt,isAdmin} = msgData
    const classMsg =  (localUserName.email == msgData.userEmail ) ? "chat__msg":"chat__msg__own"
    const chatMsg = document.createElement("div")
    const chatOwner = document.createElement("p")
    const ChatText = document.createElement("p")
    const chatcreateAt = document.createElement("p")
    const chatEmail = document.createElement("p")
    const chatMessages = document.createElement("p")
    const chatDate = document.createElement("p")
    chatMsg.classList.add(classMsg)
    ChatText.classList.add(classMsg)
    chatOwner.classList.add('chat__owner')
    chatDate.classList.add('chat__date')
    chatMsg.appendChild(chatOwner)
    chatMsg.appendChild(chatEmail)
    chatMsg.appendChild(chatMessages)
    chatMsg.appendChild(chatcreateAt)
    chatEmail.innerHTML = await isAdmin=="true"? `System: to ${msgData.to}`:`User: ${userEmail}`
    chatMessages.innerHTML=`<span style="color:blue">Msg: </span> <br/> ${messages}`
    chatcreateAt.innerHTML=createAt
    chatcreateAt.style.color="grey"
    chatcreateAt.style.margin="10px"
    chatDisplay.appendChild(chatMsg)
    chatDisplay.scrollTo(0, chatDisplay.scrollHeight)
  }
  
  //enviar mensaje
  textMsgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(textMsgForm)
    const formValues = Object.fromEntries(formData)
    textMsgForm.reset()
    const msgTo = !localUserName.admin ? "System" : formValues.toUserEmail
    console.log("msgTo, ", msgTo)
    const chat = ({...formValues,userEmail:localUserName.email,isAdmin:localUserName.admin, to: msgTo})
    chatDisplay.style.display="flex"
    socket.emit('new msg', chat)
  })
  
  //cargar mensajes
  btn_LoadChat.addEventListener("click",()=>{
    chatDisplay.style.display="flex"
    socket.emit("all msg")
  })

  const messageSave =async (chat)=>{
    await fetch('/mensajes',{
      method:"POST",
      body: JSON.stringify(chat),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(data=>{
      return data.json()})
        .then(menssages=>{
    })
  }

  socket.on('user', userName  => {    
    if(userName==null){
      location.href="/loginEmail"
    }
    renderSessionUser(userName)
  })

const listProducts= ()=>{
  fetch('/productos/productos')
    .then(data=>{
      return data.json()})
        .then(products=>{
          renderProducts(products.products)
          renderSessionUser(products.user)
    })
  }
  listProducts()
  
  const comprarProduct=(product_id)=>{
    fetch('/carrito', {
      method: "POST",
      body: JSON.stringify({products:product_id}),
      headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(data=>{
          return data.json()})
            .then(cart=>{
              // renderProducts(cart)
          })
  }

const newProduct = (product)=>{
  fetch('/productos/productos', {
    method: "POST",
    body: JSON.stringify(product),
    headers: {"Content-type": "application/json; charset=UTF-8"}})
      .then(data=>{
        return data.json()})
          .then(products=>{
            renderProducts(products.products)
        })
}

const modifyProduct = (id,product)=>{
  fetch(`/productos/productos/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {"Content-type": "application/json; charset=UTF-8"}})
      .then(data=>{
        return data.json()})
          .then(products=>{
            renderProducts(products.products)
        }
         
      )
}

const productsByCategory = (category)=>{
  fetch(`/productos/category/${category}`)
    .then(data=>{
      return data.json()})
        .then(products=>{
          renderProducts(products,category)
      })
}
const productBorrar = (id)=>{
  fetch(`/productos/eliminar/${id}`, {
    method: "DELETE",})
      .then(data=>{
        return data.json()})
          .then(products=>{
            renderProducts(products.products)
        })
}

const productById = (id)=>{
  fetch(`/productos/productos/${id}`)
    .then(data=>{
      return data.json()
    })
      .then(products=>{
        modifyProducts(products)
      })
}
  
  socket.on('products by category',(byCategory)=>{
    cleanProducts()
    renderProducts(byCategory)
  })
  
  socket.on('modify products', (productById)  => {    
    products = productById
    modifyProducts(productById)
  })

  socket.on('all messages', allMsg => {
    cleanChat()
    if (localUserName.admin){
     chatDisplay.style.display="flex"
      for (msgData of allMsg){
          renderMsg(msgData)
        }
    }else{
      console.log("mensajes : " ,allMsg.length)
      for (msgData of allMsg){
        if (msgData.userEmail==localUserName.email|| msgData.to==localUserName.email){
          renderMsg(msgData)
        }else{
        }  
      }
      if (allMsg[allMsg.length-1].to ==localUserName.email){
        chatDisplay.style.display="flex"
      }
    }
    })


    