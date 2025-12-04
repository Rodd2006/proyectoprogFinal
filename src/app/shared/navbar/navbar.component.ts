import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../../servicios/carrito.service';
import { Producto } from '../../modelos/producto.models';
import { CommonModule,} from '@angular/common';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';
import { AuthService } from '../../../servicios/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: any = null;

  cantidadProductos:number=0;
  cantidadFavoritos:number=0
  constructor(private carritoService:CarritoService, private favoritoService:FavoritoService,private authService:AuthService ){}
  ngOnInit(): void {
    //escucha los cambios en el carrito para actualizar la cantidad total de produtos 
    this.carritoService.carrito$.subscribe((productos:{producto:Producto,cantidad:number}[])=>{
    this.cantidadProductos = productos.reduce((total, item) => total + item.cantidad,0)//suma la cantidad de productos
    this.favoritoService.favorito$.subscribe((productos:{producto:Producto,cantidad:number}[])=>{
    this.cantidadFavoritos=productos.reduce((total,item)=> total + item.cantidad,0)
    })
    })

    
     // Cargar usuario al iniciar la página
    this.usuario = this.authService.getUsuario();

    // Escuchar cambios de login/logout
    this.authService.loginSubject.subscribe(() => {
      this.usuario = this.authService.getUsuario();
    });
  }

  cerrarSesion() {
    this.authService.logout();
  }
  
 onCarrito(){
  console.log('Carrito clicked');
 }
}
