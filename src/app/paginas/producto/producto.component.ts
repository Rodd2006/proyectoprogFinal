import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../../servicios/carrito.service';
import { RouterLink } from '@angular/router';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-producto',
  imports: [CommonModule,RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
/* producto = [
    {
      id:1, 
      nombre: 'Campera',
      descripcion:'...',
      precio: 100, 
      imagen :'https://m.media-amazon.com/images/I/71QwufyIeVL._AC_UL1500_.jpg' 
    },
    {
      id:2,
      nombre:'',
      descripcion:'...',
      precio: 100, 
      imagen :'https://m.media-amazon.com/images/I/71QwufyIeVL._AC_UL1500_.jpg' 
    },
    {
      id:3,
      nombre:'',
      descripcion:'...',
      precio: 100, 
      imagen :'https://m.media-amazon.com/images/I/71QwufyIeVL._AC_UL1500_.jpg' 
    },
    {
      id:2,
      nombre:'',
      descripcion:'...',
      precio: 100, 
      imagen :'' 
    }
  ] */


    Productos:Producto[]=[
      {
        id:1, 
        nombre: 'Campera',
        descripcion:'Campera  adidas de River talle 41',
        precio: 40000, 
        preciodesc:0,
        imagen :'https://i.ebayimg.com/images/g/7~sAAOSwKk1nIDB-/s-l1600.webp', 
        disponibilidad:true,
        cantidad:1
      },
      {
        id:2, 
        nombre: 'Campera',
        descripcion:'...',
        precio: 35000, 
        preciodesc:0,
        imagen :'https://m.media-amazon.com/images/I/71QwufyIeVL._AC_UL1500_.jpg', 
        disponibilidad:true,
        cantidad:1
      }, {
        id:3, 
        nombre: 'Campera',
        descripcion:'Campera Mujer Izzy Azul talle 40',
        precio: 100, 
        preciodesc:0,
        imagen :'https://cdnlaol.laanonimaonline.com/web/images/productos/b/0000059000/59030.jpg?_gl=1*5m7uv5*_gcl_au*MTkyNDY4MDMyOS4xNzQ4MDAzODIx', 
        disponibilidad:true,
        cantidad:1
      }
      
      
    ]
    query: string = '';
  resultados: Producto[] = [...this.Productos];

  buscarProducto() {
    this.resultados = this.Productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.query.toLowerCase())
    );
  }
 constructor(private carritoService:CarritoService, private favoritoService:FavoritoService){}
 //metodo para agregar al carrito
 agregar(producto:Producto){
  this.carritoService.agregarAlCarrito(producto)
  alert('producto agregado al carrito ')//muestra el mensaje
 }
 fav(producto:Producto){
  this.favoritoService.agregarfavorito(producto)
  alert('Agregado a favoritos')
}
  elim(productoId:number){
    
    this.favoritoService.eliminarFavorito(productoId)
    }
  
  }
  
  


