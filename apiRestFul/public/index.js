
const socket = io()

let users = []
let localUserName={}
let messages = []
let products = []

const loginSession = document.getElementById('loginSession')
const ingresoProductosDiv = document.getElementById('ingresoProductos')
const productSection = document.getElementById('products')

const chatDisplay = document.getElementById('chat__display')
const textMsgForm = document.getElementById('textMsg__form')
const emailForm = document.getElementById('email__form')
const deleteFormDiv = document.getElementById('borrarProduct_div')



const document_Description = document.getElementById("title")
const document_Price = document.getElementById("price")
const document_Category = document.getElementById("category")
const document_Thumbnail = document.getElementById("thumbnail")


// const comprar_id = document.getElementById(documentID)

//banner de session de usuario
const renderSessionUser = async (userName)=>{
  console.log("username;" ,userName.admin)
  localUserName=userName
  
  let response = await fetch('./views/sessionUser.hbs')
  const template = await response.text()
  const templateCompiled= Handlebars.compile(template)
  const html = templateCompiled({userName:userName.nombreUsuario})
  loginSession.innerHTML = html
  
// console.log({userName})
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
      
         listarProducts()
      // formValues.title!==""?socket.emit('new product', formValues):""
    })

    let responsePagina = await fetch('./views/deleteProducts.hbs')
    const templateDelete = await responsePagina.text()
    const templateCompiledDelete= Handlebars.compile(templateDelete)
    const hbsDelete = templateCompiledDelete()
    deleteFormDiv.innerHTML = hbsDelete
    
    const deleteForm = document.getElementById('borrarProduct__form')      
    
    //delete
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const deleteFormData = new FormData(deleteForm)
        const deleteIdValues = Object.fromEntries(deleteFormData)
        console.log(deleteIdValues.id)
        deleteForm.reset()
         productBorrar(deleteIdValues.id)
        //  cleanProducts()
         listarProducts()

        // socket.emit('new delete', deleteIdValues)
      })

      btn_modificar.addEventListener('click',(e)=>{
        
        e.preventDefault()
        const dataProduct = new FormData(createProductForm)
        const dates = Object.fromEntries(dataProduct)
        createProductForm.reset()
        console.log("los nuevos datos: ",dates)
        btn_agregar.style.display="block"
        btn_modificar.style.display="none"
      //  dates.title!=""?socket.emit('modificar producto',(dates)):""
      })

        // Carga los productos en el form para modificar
        const documentModificarID = document.querySelectorAll(".modificar_Id")
        documentModificarID.forEach((item)=>{
          console.log(item.id.split("_").pop())
          const Modificar_Id = item.id.split("_").pop()
          item.addEventListener("click",()=>{
            console.log(`el boton de modificar ${Modificar_Id} fue clickeado`)
            const productToModificate = productById(Modificar_Id)
            console.log("productToModificate: ",productToModificate)
            modifyProducts(productToModificate)
          //  socket.emit('new modificar producto', Modificar_Id)
          })
        })


        

  }//final de admin
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
      const button_Id = item.id.split("_").pop()
      item.addEventListener("click",()=>{
        console.log(`el boton ${button_Id} fue clickeado`)
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
        //  cleanProducts()
         listarProducts()
        //  socket.emit('new delete', {id:Borrar_Id})

       })
     })
  

     // filtrar productos por categoria
      const document_Category_Filter = document.getElementById('categoryId')
      document_Category_Filter.value=category||"Sin filtro"

      document_Category_Filter.addEventListener("change",()=>{
        const category = document_Category_Filter.value
        console.log("click categoryId",category)
        // socket.emit('category', category)
        productsByCategory(category)
      })
      // document_Category_Filter.value=category||"Todos"
  }
  const modifyProducts = async (productById)=>{
    createProductForm.scrollIntoView(0,0)
    btn_modificar.style.display="block"
    btn_agregar.style.display="none"
    console.log("productById.thumbnail: ", productById.thumbnail)
    document_Description.value = productById.title
    document_Price.value = productById.price
    document_Category.value = productById.category
    document_Thumbnail.value = productById.thumbnail
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

  const renderMsg = (msgData) => {
    const {id,nombre,apellido,edad,alias,avatar,text} = msgData
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
    // localUserName!=""?"":localUserName=userName
    console.log("llegan userName:",userName)  
    console.log("llegan localUserName:",localUserName)  
    

    renderSessionUser(userName)
  })
  // socket.on('all products', (allProduct)  => { 
  //   products = allProduct
  //   cleanProducts()
  //   renderProducts(allProduct)
  //   // renderLoginUser(userName)
  // })

const listarProducts=async ()=>{
  fetch('/productos/productos')
  .then(data=>{
    return data.json()})
    .then(products=>{
      renderProducts(products.products)
      renderSessionUser(products.user)
    })
  }
  listarProducts()

const newProduct = async(product)=>{
  await fetch('/productos/productos', {
    method: "POST",
    body: JSON.stringify(product),
    headers: {"Content-type": "application/json; charset=UTF-8"}})
    .then(
      await fetch('/productos/productos').then(
        async data=>{
          return  await data.json()}).then(
            async products=>{
              await renderProducts(products.products)
      })
  )
}

const productsByCategory = async (category)=>{
  if(category=="Sin filtro")
    category="Sin filtro"
  await fetch(`/productos/category/${category}`)
    .then(data=>{
      return data.json()})
        .then(products=>{
      // cleanProducts()
        renderProducts(products,category)
    } )
}
const productBorrar = async(id)=>{
    fetch(`/productos/eliminar/${id}`, {
      method: "DELETE",
    }
    ).then(
    fetch('/productos/productos')
      .then(async data=>{
        return await data.json()})
          .then( async products=>{
          await renderProducts(products.products)
      } )
      )
}

const productById = (id)=>{
  fetch(`/productos/productos/${id}`)
    .then(data=>{
      return data.json()})
      .then(products=>{
        modifyProducts(products)
      } )
}
  
  socket.on('products by category',(byCategory)=>{
    console.log("allproduct ",byCategory)
    cleanProducts()
    renderProducts(byCategory)
  })
  
  socket.on('modify products', (productById)  => {    
    products = productById
    console.log("productById",productById)
    modifyProducts(productById)
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
    // const allMsgDesnormalized = normalizr.denormalize(allMsg.result,mensajes, allMsg.entities)
    cleanChat()
    //  for (msgData of allMsgDesnormalized.authorData){
    for (msgData of allMsg){
      renderMsg(msgData)
     }
     chatDisplay.scrollTo(0, chatDisplay.scrollHeight)
    })


    