import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../app/modelos/producto.models';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<{ producto: Producto; cantidad: number }[]>([])
  carrito$ = this.carritoSubject.asObservable();

  agregarAlCarrito(producto:Producto){
    const productos = this.carritoSubject.getValue();
    const encontrado = productos.find( p => p.producto.id == producto.id)
    
    if(encontrado){
      encontrado.cantidad++;
    }else{
      this.carritoSubject.next([...productos,{producto,cantidad:1}])
    }
  }
  eliminarDelCarrito(productoId:number){
    const productos = this.carritoSubject.getValue().filter(p => p.producto.id != productoId)
    this.carritoSubject.next(productos)
  }
  vaciarCarrito(){
    this.carritoSubject.next([])
  }
  //Metodo para actualizar la cantidad de un producto en carrito
  actualizarCantidad(productoId:number,nuevaCantidad:number){
//recorremos el carrito y actualizamos la cantidad del producto con el id dado
const productos= this.carritoSubject.getValue().map(item => {
  if(item.producto.id===productoId){
 //retorna una copia del producto con la nueva cantidad 
 return{...item,cantidad:nuevaCantidad}

 }
 return item;
  })
  //emitimos el nuevo estado del carrito 
  this.carritoSubject.next(productos)
}
//metodo para obtener los productos del carrito con un arreglo
obtenerProductos():{producto:Producto;cantidad:number}[]{
  return this.carritoSubject.getValue();
}
//metodo para calcuolar el total a pagar (precio*cantidad de cada producto)
obtenerTotal():number{
  const productos = this.carritoSubject.getValue();
  //Usamos reduce para sumar los subtotales de cada productos
  return productos.reduce((total,item)=> total + item.producto.preciodesc * item.cantidad,0)
}
  

  constructor() { }
}
