import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../../servicios/carrito.service';


@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  productoEnCarrito: { producto: Producto; cantidad: number; }[] = []
  total:{precio:number;}[]=[]
  constructor(private carritoService: CarritoService) { }

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
  realizarCompra() {
    alert('Compra realizada exitosamente')
    this.vaciarCarrito();
  }
  
}


