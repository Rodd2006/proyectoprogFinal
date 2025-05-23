import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../../servicios/carrito.service';
import { RouterLink } from '@angular/router';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';

@Component({
  selector: 'app-oferta',
  imports: [CommonModule,RouterLink],
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})
export class OfertaComponent {

  Productos:Producto[]=[
        {
          id:1, 
          nombre: 'Campera',
          descripcion:'Campera  adidas de River',
          precio: 40000, 
          preciodesc:36000,
          imagen :'https://i.ebayimg.com/images/g/7~sAAOSwKk1nIDB-/s-l1600.webp', 
          disponibilidad:true,
          cantidad:1
        },
        {
          id:2, 
          nombre: 'Campera',
          descripcion:'...',
          precio: 35000, 
          preciodesc:30000,
          imagen :'https://m.media-amazon.com/images/I/71QwufyIeVL._AC_UL1500_.jpg', 
          disponibilidad:true,
          cantidad:1
        }, {
          id:3, 
          nombre: 'Campera',
          descripcion:'...',
          precio: 25000, 
          preciodesc:22000,
          imagen :'https://i.ebayimg.com/images/g/7~sAAOSwKk1nIDB-/s-l1600.webp', 
          disponibilidad:true,
          cantidad:1
        }
      ]
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


