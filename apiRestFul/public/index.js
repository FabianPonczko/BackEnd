const socket = io()


const productSection = document.getElementById('products')

const cleanProducts = () => {
    productSection.innerHTML = ""
  }
  const renderProducts = async (products) => {
    let response = await fetch('/views/layouts/tableProducts')
    console.log({response})
    const template = await response.text()
    const templateCompiled = Handlebars.compile(template)
    const html = templateCompiled({ products })
    productSection.innerHTML = html
  }
  socket.on('all products', allProduct => {
    console.log(`llegando los productos ${allProduct}`)
    products = allProduct
    cleanProducts()
    renderProducts(allProduct)
  })