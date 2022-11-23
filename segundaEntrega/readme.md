

***

## Cambiar SELECTED_DATABASE para usar DB: "mongo" ó DB:"firebase"

***

## Ruta para seleccionar base de datos "./srv/Dao/index.js" :13

### Rutas para productos: '/api/products'

* para crear productos pasar por body: (post"/")
   ```python
    {
    "IS_ADMIN":true, 
    "title":"producto2 para mongo",
    "description":"descripcion del producto 2",
    "code":"3315",
    "thumbnail":"una dirección",
    "price":250,
    "stock":3
    }
    ```
* para modificar productos pasar por params el id (put "/:id") y por body el prodducto modificado:
    ```python
    {
    "IS_ADMIN":true,
    "title":"producto2 para mongo MODIFICADO",
    "description":"descripcion del producto 2",
    "code":"3315",
    "thumbnail":"una dirección",
    "price":250,
    "stock":3
    }
    ```
* para listar productos (get"/")

* para buscar producto pasar por params (get"/:id")

* para borrar producto pasar id por params (delete"/:id") y por body:
    ```python
    {
    "IS_ADMIN":true
    }
    ```


### Rutas para carts: '/api/carts'

* para crear carts realizar (post"/") y pasar por body:
    ```python
    {
    "IS_ADMIN":true
    }
    ```
* para listar carts (get"/")

* para buscar cart pasar por params (get"/:id")

* para borrar cart pasar el id por params (delete"/:id") y por body:
    ```python
    {
    "IS_ADMIN":true
    }
    ```

* para agregar productos al carts pasar el id del cart donde agregar y por body el productsID del producto a agregar (post"/:id/productos"): 
    ```python
    {
    "IS_ADMIN:true,
    "productsID":"6379c5d02371832faf537f37"
    }
    ```

* para borrar un producto de un cart pasar id de cart y id de producto a borrar (delete"/:id_car/productos/:id_prod") y por body :
    ```python
    {
    "IS_ADMIN":true
    }
    ```