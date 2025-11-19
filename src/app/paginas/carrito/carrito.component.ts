import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../../servicios/carrito.service';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  productoEnCarrito: { producto: Producto; cantidad: number; }[] = []
  total:{precio:number;}[]=[]
  constructor(private carritoService: CarritoService, private router:Router) { }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productoEnCarrito = productos
    }
    )
  }
  agregarCantida(index: number) {
    this.productoEnCarrito[index].cantidad++;

  }

  quitarCantidad(index: number) {
    if (this.productoEnCarrito[index].cantidad > 1) {
      this.productoEnCarrito[index].cantidad--;
    }
  }
  eliminarProducto(productoId: number) {
    this.carritoService.eliminarDelCarrito(productoId)
  }
  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }

  /*
  realizarCompra() {
    alert('Compra realizada exitosamente')
    this.vaciarCarrito();
  }
  */
 irAformularioCompra(){
  //redirigue al usuario a la ruta compra , donde se encuentra el formulario para finalizar la compra
  this.router.navigate(['/compra'])
 }
 //calcula el total de carrito de compras
 calcularTotal(): number{
//recorre el arreglo de productos de carrito y suma al resultado de precio*cantidad
return this.productoEnCarrito.reduce((total,item)=>{
  return total + item.producto.preciodesc * item.cantidad
},0) //el acumulador totla empieza en 0
 }
}


