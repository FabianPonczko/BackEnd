
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
const renderSessionUser = async (userName,userCartQuantity)=>{
  localUserName=userName
  console.log(localUserName)
  let response = await fetch('./views/sessionUser.hbs')
  const template = await response.text()
  const templateCompiled= Handlebars.compile(template)
  const html = templateCompiled({userName:userName.nombreUsuario,userCartQuantity:userCartQuantity})
  loginSession.innerHTML = html
  
  const cartBoton = document.getElementById('botonCart')
  cartBoton.addEventListener("click",()=>{
    productCartList(localUserName.id)
    setInterval(() => {
      cartBoton.style.display="none"
    }, 500);
  })

  //boton email to 
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
        deleteForm.reset()
         productBorrar(deleteIdValues.id)
  
    })

    //modificar producto
    btn_modificar.addEventListener('click',(e)=>{
      e.preventDefault()
      const dataProduct = new FormData(createProductForm)
      const dates = Object.fromEntries(dataProduct)
      createProductForm.reset()
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
      const product_id = item.id.split("_").pop()
      item.addEventListener("click",()=>{
        comprarProduct(product_id)
      })
  })
  
  // boton borrar producto    
  const documentBorrarID = document.querySelectorAll(".borrar_Id")
    documentBorrarID.forEach((item)=>{
      const Borrar_Id = item.id.split("_").pop()
      item.addEventListener("click",()=>{
        productBorrar(Borrar_Id)
      })
    })  
     
  //boton modificar productos
  const documentModificarID = document.querySelectorAll(".modificar_Id")
    documentModificarID.forEach((item)=>{
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
      productsByCategory(category)
    })
  }

  const renderCart = async (products)=>{
    let response = await fetch('./views/tableCart.hbs')
    const template = await response.text()
    const templateCompiled= Handlebars.compile(template)
    const html = templateCompiled({products})
    productSection.innerHTML = html

    const backToProduct = document.getElementById('backToProduct')
    backToProduct.addEventListener('click',()=>{
      listProducts()
    })

    const toOrder = document.getElementById('toOrder')
      toOrder.addEventListener('click',()=>{
        orderList(localUserName.id)
      })

  // boton borrar product in cart
  const documentBorrarCartID = document.querySelectorAll(".borrarCart_Id")
  console.log("cart",documentBorrarCartID)
  documentBorrarCartID.forEach((item)=>{
    const Borrar_Id = item.id.split("_").pop()
    item.addEventListener("click",()=>{
      productCartBorrar(Borrar_Id)
      productCartList(localUserName.id)
    })
  })
  }  

  const renderOrder = async (products)=>{
    console.log(products)
    let response = await fetch('./views/orderCart.hbs')
    const template = await response.text()
    const templateCompiled= Handlebars.compile(template)
    const html = templateCompiled({products})
    productSection.innerHTML = html
    const btnOrderBack = document.getElementById('orderBack')
    btnOrderBack.addEventListener('click',()=>{
      listProducts()
    })
    const btnOrderSend = document.getElementById('orderSend')
    btnOrderSend.addEventListener('click',()=>{
      sendEmailProducts(localUserName)
    })

  }
    
  const cleanChat = () => {
    chatDisplay.innerHTML = ""
  }

  const getNameBySocketId = (socketId) => {
    const foundData = messages.find( element => element.id === socketId )
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
  }

  
    const toOrder = document.getElementById('toOrder')
  
  const orderList = (id)=>{
    fetch(`/user/${id}`)
    .then(data=>{
      return data.json()})
      .then(products=>{
        console.log(products)
         renderOrder(products)
      })
  }

  const sendEmailProducts = (localUserName)=>{
    const date = new Date()
    Swal.fire({
      title: 'Procesando orden de compra',
      html:`Eviar a <b> ${localUserName.email} </b> la orden generada`+
      `` ,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/order/${localUserName.id}`)
        .then(
          Swal.fire('Orden enviada con Exito!', '', 'success'),
          setTimeout(() => {
            fetch(`/user/carts/${localUserName.id}`,{
              method:"DELETE"})
          }, 500),
          listProducts(),
          listProducts()
        )

      } else if (result.isDenied) {
        Swal.fire('Orden cancelada', '', 'info')

      }
    })

  }
  
  const listProducts= async ()=>{
    await fetch('/productos/productos')
      .then(data=>{
        return data.json()})
          .then(data=>{
            // console.log(data)
            renderProducts(data.products)
            renderSessionUser(data.user,data.userCartQuantity)
      })
    }

  listProducts()
  
  const comprarProduct=  (product_id)=>{
     fetch('/carrito', {
      method: "POST",
      body: JSON.stringify({products:product_id,user:localUserName.id}),
      headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(data=>{
          return data.json()})
            .then(cart=>{
            })
            Swal.fire({
              icon: 'success',
              title: 'Producto agregado al carrito',
              showConfirmButton: false,
              timer: 1000
            })
          listProducts()
          listProducts()
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
            })
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
              Swal.fire({
                icon: 'warning',
                title: 'Producto eliminado',
                showConfirmButton: false,
                timer: 1000
              })
              renderProducts(products.products)
              renderSessionUser(data.user,data.userCartQuantity)
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

  const productCartList = (id) => {
    fetch(`/user/${id}`)
      .then(data=>{
        return data.json()})
        .then(products=>{
          renderCart(products.products.carts)
        })
  }

  const productCartBorrar = (id)=>{
    fetch(`/carrito/${id}`, {
      method: "DELETE",})
        .then(products=>{
          Swal.fire({
            icon: 'warning',
            title: 'Producto eliminado del carrito',
            showConfirmButton: false,
            timer: 1500
          })
        })
  }

  

  socket.on('all messages', allMsg => {
    cleanChat()
    if (localUserName.admin){
     chatDisplay.style.display="flex"
      for (msgData of allMsg){
          renderMsg(msgData)
        }
    }else{
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


    