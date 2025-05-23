import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../../servicios/carrito.service';
import { Producto } from '../../modelos/producto.models';
import { CommonModule,} from '@angular/common';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cantidadProductos:number=0;
  cantidadFavoritos:number=0
  constructor(private carritoService:CarritoService, private favoritoService:FavoritoService){}
  ngOnInit(): void {
    //escucha los cambios en el carrito para actualizar la cantidad total de produtos 
    this.carritoService.carrito$.subscribe((productos:{producto:Producto,cantidad:number}[])=>{
    this.cantidadProductos = productos.reduce((total, item) => total + item.cantidad,0)//suma la cantidad de productos
    this.favoritoService.favorito$.subscribe((productos:{producto:Producto,cantidad:number}[])=>{
    this.cantidadFavoritos=productos.reduce((total,item)=> total + item.cantidad,0)
    })
    })
  }
 onCarrito(){
  console.log('Carrito clicked');
 }
}
