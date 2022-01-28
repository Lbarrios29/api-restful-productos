// Clase de Servicio que crea,lee,actualiza y elimina un producto
class productoService {

    constructor(productos){
        
        this.productos = productos;

    }
    
    get getProductos(){
        return this.productos;
    }

    // Agrega un nuevo producto al array de Productos
    create(producto) {

        if (this.productos.length > 0) {
            // Busca el maximo Id para agregarle 1
            let id = Math.max.apply(Math, this.productos.map(obj => obj.id));
            producto.id = id + 1;                    
        }
        else{
            // No tiene contenido por eso inicializa en 1
            producto.id= 1;
        }
        
        this.productos.push(producto);
        return producto;
    
    }

    // Encuentra un producto por su Id
    read(id) {
        
        const productOne = this.productos.find( prod => prod.id == id);
        if (!productOne) { 
            throw (`Producto ${id} no encontrado`);
        }
        return productOne;

    }

    // Actualiza un producto por su id
    update(producto) {
        
        const index = this.productos.findIndex( prod => prod.id == producto.id );
        
        if (index < 0) {  
            throw (`Producto ${producto.id} no encontrado`); 
        }

        this.productos[index] = producto;
        return this.productos[index];
        
    }

    // Elimina un producto por su id
    delete(id) {
    
        const index = this.productos.findIndex( producto => producto.id == id );

        if (index < 0) {
            throw (`Producto ${producto.id} no encontrado`);     
        }
        
        this.productos.splice(index, 1)
        return { succesful: `Producto con Id: ${id} eliminado satisfactoriamente` };
        
    }

} // class productoService

module.exports = productoService ; 