import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { RouterLink } from '@angular/router';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';

@Component({
  selector: 'app-oferta',
  imports: [CommonModule, RouterLink],
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})
export class OfertaComponent {

  Productos: Producto[] = [
    {
      id: 4,
      nombre: 'Campera',
      descripcion: 'Campera  adidas de River',
      precio: 40000,
      preciodesc: 36000,
      imagen: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/4ca1ce8b119f4a5e99400a377c603289_9366/Campera_de_Lluvia_River_Plate_Tiro_25_Rojo_JP1900_01_laydown.jpg',
      imagen2: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/6c748e431e444d60aa94790cd8b49332_9366/Campera_de_Lluvia_River_Plate_Tiro_25_Rojo_JP1900_23_hover_model.jpg",
      disponibilidad: true,
      cantidad: 1,
      categoria: "Campera",
      marca: "Puma"
    },
    {
      id: 2,
      nombre: 'Campera',
      descripcion: 'Campera Vintage Angels',
      precio: 35000,
      preciodesc: 30000,
      imagen: 'https://m.media-amazon.com/images/I/71QwufyIeVL._AC_UL1500_.jpg',
      imagen2: 'https://img.fantaskycdn.com/c789ba98584c76da740f521983801a6a_1080x.jpg',
      disponibilidad: true,
      cantidad: 1,
      categoria: "Campera",
      marca: "Puma"
    }, {
      id: 3,
      nombre: 'Buzo',
      descripcion: 'Buzo con capucha MMQ para hombre',
      precio: 150000,
      preciodesc: 120000,
      imagen: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/632299/01/fnd/ARG/fmt/png',
      imagen2: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/632299/01/bv/fnd/ARG/fmt/png",
      disponibilidad: true,
      cantidad: 1,
      categoria: "Buzo",
      marca: "Puma"
    },
    {
      id: 5,
      nombre: 'Campera Unisex',
      descripcion: 'Campera Nine To Five unisex',
      precio: 210000,
      preciodesc: 120000,
      imagen: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/632503/01/fnd/ARG/fmt/png?sw=480&q=60',
      imagen2:'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/632503/01/bv/fnd/ARG/fmt/png',
      disponibilidad: true,
      cantidad: 1,
      categoria: "Campera",
      marca: "Puma"
    },{
      id:6,
      nombre:'Remera Graphic',
      descripcion:'Remera Adidas Graphic',
      precio:60000,
      preciodesc:40000,
      imagen:'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/b2eaddcf9d3642b2a0b41ab8267c3eb2_9366/Remera_Graphic_Blanco_JX3094_01_laydown.jpg',
      imagen2:'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/b55df40ae9d64e299cd23722f80a8700_9366/Remera_Graphic_Blanco_JX3094_42_detail.jpg',
      disponibilidad:true,
      cantidad:1,
      categoria:'Remera',
      marca:"Adidas",
    },
    {
      id:7,
      nombre:'Remera Viejas Locas',
      descripcion:'Remera Viejas Locas de Algodon',
      precio:60000,
      preciodesc:40000,
      imagen:'https://http2.mlstatic.com/D_Q_NP_2X_846744-MLA50449708032_062022-E.webp',
      imagen2:'https://http2.mlstatic.com/D_Q_NP_2X_735387-MLA50449587683_062022-E.webp',
      disponibilidad:true,
      cantidad:1,
      categoria:'Remera',
      marca:"ENGENDRO",
    },
    {
      id:8,
      nombre:'Remera Miranda!',
      descripcion:'Remera Miranda! de Algodon',
      precio:60000,
      preciodesc:40000,
      imagen:'https://http2.mlstatic.com/D_NQ_NP_753119-MLA88934690552_082025-O.webp',
      imagen2:'https://http2.mlstatic.com/D_NQ_NP_924598-MLA88930162492_082025-O.webp',
      disponibilidad:true,
      cantidad:1,
      categoria:'Remera',
      marca:"BRONX ROPA",
    },
    {
      id:9,
      nombre:'Remera Babasonicos',
      descripcion:'Remera babasonico de Algodon',
      precio:60000,
      preciodesc:40000,
      imagen:'https://http2.mlstatic.com/D_NQ_NP_951197-MLA88927338752_082025-O.webp',
      imagen2:'https://http2.mlstatic.com/D_NQ_NP_924598-MLA88930162492_082025-O.webp',
      disponibilidad:true,
      cantidad:1,
      categoria:'Remera',
      marca:"BRONX ROPA",
    },
    {
      id:10,
      nombre:'Buzo ViejaScul',
      descripcion:'Maxi Buzo Extended 3D Washed',
      precio:70000,
      preciodesc:70000,
      imagen:'https://acdn-us.mitiendanube.com/stores/003/024/577/products/extended-3d-8346fecaaabbcbc6c317594455270378-1024-1024.webp',
      imagen2:'https://http2.mlstatic.com/D_NQ_NP_924598-MLA88930162492_082025-O.webp',
      disponibilidad:true,
      cantidad:1,
      categoria:'Buzo',
      marca:"ViejaScul",
    },
    {
      id:11,
      nombre:'Remera ViejaScul',
      descripcion:'Remera Boxy World Wide B',
      precio:40000,
      preciodesc:40000,
      imagen:'https://acdn-us.mitiendanube.com/stores/003/024/577/products/world-wide-vsrbf-2229-tienda-nube-19ff644861b2ac7b7517594418002298-1024-1024.webp',
      imagen2:'https://http2.mlstatic.com/D_NQ_NP_924598-MLA88930162492_082025-O.webp',
      disponibilidad:true,
      cantidad:1,
      categoria:'Buzo',
      marca:"ViejaScul",
    }
  ]
  constructor(private carritoService: CarritoService, private favoritoService: FavoritoService) { }
  //metodo para agregar al carrito
  agregar(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto)
    alert('producto agregado al carrito ')//muestra el mensaje
  }
  fav(producto: Producto) {
    this.favoritoService.agregarfavorito(producto)
    alert('Agregado a favoritos')
  }
  elim(productoId: number) {

    this.favoritoService.eliminarFavorito(productoId)
  }

}


