import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorito',
  imports: [CommonModule],
  templateUrl: './favorito.component.html',
  styleUrl: './favorito.component.css'
})
export class FavoritoComponent {
  productoEnfavorito: { producto: Producto; cantidad: number }[] = []
  agregarfavorito: { producto: Producto; cantidad:number }[] = []
  constructor(private favoritoService: FavoritoService, private carritoService:CarritoService){ }
  
  ngOnInit(): void {
   this.favoritoService.favorito$.subscribe((productos) => {
     this.agregarfavorito = productos
     this.productoEnfavorito = productos
   })
 }
   eliminarfav(productoId:number){
    this.favoritoService.eliminarFavorito(productoId)
   }
   aggFav(producto:Producto){
     this.favoritoService.agregarfavorito(producto)
   }
   agregar(producto:Producto){
     this.favoritoService.agregarfavorito(producto)
     alert('producto agregado al carrito') //muestra el mensaje 
   }
 }

