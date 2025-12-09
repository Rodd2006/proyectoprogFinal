import { Component } from '@angular/core';
import { Producto  } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calzado',
  imports: [CommonModule,RouterLink],
  templateUrl: './calzado.component.html',
  styleUrl: './calzado.component.css'
})
export class CalzadoComponent {
 Productos:Producto[]=[
      {
        id:1, 
        nombre: 'Zapatilla adidas',
        descripcion:'Zapatillas puig indoor verde Hombre',
        precio: 40000, 
        preciodesc:40000,
        imagen :'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/8b69a237a9884cdba45567cff54af1f5_9366/Zapatillas_Puig_Indoor_Verde_JH8163_01_00_standard.jpg', 
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Adidas"
      },
      {
        id:2, 
        nombre: 'Zapatillas Puma',
        descripcion:'Zapatillas Suede XL Hombre',
        precio: 35000, 
        preciodesc:35000,
        imagen :'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/images/395205/02/sv03/fnd/ARG/fmt/png', 
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Puma"
      }, {
        id:3, 
        nombre: 'Adidas samba',
        descripcion:'adidas Samba OG blanco Hombre',
        precio: 100, 
        preciodesc:100,
        imagen :'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/f2f4ca87827747c5bae5c954f58a5a17_9366/Zapatillas_Samba_OG_Blanco_JI2678_01_00_standard.jpg', 
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Adidas"
      },
      {
        id:4,
        nombre:'Nike Air Force 1',
        descripcion:'Zapatillas nike Hombre',
        precio:600000,
        preciodesc:600000,
        imagen:'https://nikearprod.vtexassets.com/arquivos/ids/1400759-1200-1200?width=1200&height=1200&aspect=true',
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Nike"
      },
      {
        id:5,
        nombre:"Topper Split",
        descripcion:"Zapatillas topper Hombre",
        precio:45000,
        preciodesc:45000,
        imagen:'https://topperarg.vtexassets.com/arquivos/ids/391168-1200-1200?width=1200&height=1200&aspect=true',
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Topper"
      },
      {
        id:6,
        nombre:"Puma Suede Xl",
        descripcion:"Zapatillas puma Mujer",
        precio:75000,
        preciodesc:75000,
        imagen:'https://images.puma.net/images/403531/01/sv03/fnd/ARG/w/600/h/600/fmt/png/bg/%23FAFAFA',
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Puma"
      },{
        id:7 ,
        nombre:"Adidas Campus ",
        descripcion:"Zapatillas Campus 00s Beta",
        precio:75000,
        preciodesc:75000,
        imagen:'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/111cd92649c84b41b445959d42e1f109_9366/Zapatillas_Campus_00s_Beta_Gris_JR2462_01_00_standard.jpg',
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Adidas"
      },
      
      {
        id:8,
        nombre:"Adidas Ultraboost ",
        descripcion:"Zapatillas Ultraboost 5",
        precio:95000,
        preciodesc:95000,
        imagen:'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/43a39db74ca54e0bb553ec2647180cfe_9366/Zapatillas_Ultraboost_5_Negro_JH9634_01_standard.jpg',
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Adidas"
      },
      {
        id:9,
        nombre:"Adidas Forum mid ",
        descripcion:"Zapatillas adidas Forum Mid",
        precio:80000,
        preciodesc:80000,
        imagen:'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/402c6a99419944589f435b2b826faf3f_9366/Zapatillas_Forum_Mid_Blanco_IG3754_01_standard.jpg',
        imagen2:"...",
        disponibilidad:true,
        cantidad:1 ,
      categoria: "Zapatillas",
      marca: "Adidas"
      },
       {
        id:10,
        nombre:"Pumas SpeedCat ",
        descripcion:"Zapatillas Puma SpeedCat de cuero ",
        precio:125000,
        preciodesc:125000,
        imagen:'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/401534/01/sv03/fnd/ARG/fmt/png?sw=480&q=60',
        imagen2:"...",
        disponibilidad:true,
        cantidad:1
        ,
      categoria: "Zapatillas",
      marca: "Puma"
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
  
  




