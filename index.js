// IMPORTS
const express = require("express");
const productoService = require("./productoService");

// Puerto escucha Endpoint
const PORT = 8080;

// Instancia express
const app = express();

// Para que express pueda interpretar mensaje JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const { Router } = express;
const routerProductos = new Router();

let helper = null;
let productos = [];
if (!helper) {
    helper = new productoService(productos);
}


// Devuelve todos los productos
routerProductos.get("/",(req,res,next)=>{

    productos = helper.getProductos;
    res.json({
        productos
    });

});

// Devuelve el producto por Id
routerProductos.get("/:id",(req,res,next)=>{
    
    try {

        const { id } = req.params;
        const producto = helper.read(id);
        res.json({
            producto
        });
        
    } catch (e) {
        res.json({
            error: e
        });
    }

});

// Da de alta un producto
routerProductos.post("/",(req,res,next)=>{

    const producto = req.body;
    const newProduct = helper.create(producto);
    productos = helper.getProductos;
    
    res.json({
        result:"Ok",
        id:newProduct.id,
        new:newProduct
    });

});

routerProductos.put("/:id",(req,res,next)=>{

    try {
        
        const { id } = req.params;
        const item = req.body;
        
        const oldProduct = helper.read(id);
        const updatedProduct = helper.update({...item,id});

        res.json({
            result:"Ok",
            id:updatedProduct.id,
            old:oldProduct,
            new:updatedProduct
        });

    } catch (e) {
        res.json({
            error: e
        });
    }

});

routerProductos.delete("/:id",(req,res,next)=>{

    try {
        
        const { id } = req.params;
        const response = helper.delete(id);
    
        res.json({
            response 
        });

    } catch (e) {
        res.json({
            error: e
        });
    }

});

app.use("/api/productos",routerProductos);
app.use(express.static('public'));

const server = app.listen(PORT, ()=>{
    console.log(`Server on http://localhost:${PORT}`);
});

server.on("error",error => console.log(error));