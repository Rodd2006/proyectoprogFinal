import { CommonModule } from '@angular/common';
import { Component, getNgModuleById } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../../servicios/carrito.service';
import { RouterLink } from '@angular/router';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';

import { subscribe } from 'diagnostics_channel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, RouterLink,FormsModule],
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


  Productos: Producto[] = [
    {
      id: 1,
      nombre: 'Remera Adidas',
      descripcion: 'Remera Essentials trifolio ',
      precio: 40000,
      preciodesc: 40000,
      imagen: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/0d3ead2d0be7414781d164a84a37f1cd_9366/Remera_Essentials_Trifolio_Marron_JX2824_01_laydown.jpg',
      imagen2: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/b5406aa553f744abbc5da32cdb637ab3_9366/Remera_Essentials_Trifolio_Gris_JY6267_23_hover_model.jpg ",
      disponibilidad: true,
      cantidad: 1,
      categoria: "Remera",
      marca: "Adidas"
    },
    {
      id: 2,
      nombre: 'Campera',
      descripcion: 'Campera puma rompeviento PackLite',
      precio: 35000,
      preciodesc: 35000,
      imagen: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/629907/47/fnd/ARG/fmt/png',
      imagen2: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/629907/47/bv/fnd/ARG/fmt/png",
      disponibilidad: true,
      cantidad: 1,
      categoria: "Campera",
      marca: "Puma"
    }, {
      id: 3,
      nombre: 'Remera Puma',
      descripcion: 'Remera Palais Artisan ',
      precio: 50000,
      preciodesc: 50000,
      imagen: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/629394/30/fnd/ARG/fmt/png',
      imagen2: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/629394/30/bv/fnd/ARG/fmt/png",
      disponibilidad: true,
      cantidad: 1,
      categoria: "Remera",
      marca: "Puma"
    }, {
      id: 4,
      nombre: 'Camisa Puma',
      descripcion: 'Camisa Palais Artisan Hombre',
      precio: 90000,
      preciodesc: 90000,
      imagen: 'https://images.puma.net/images/629392/87/fnd/ARG/w/600/h/600/fmt/png/bg/%23FAFAFA',
      imagen2: "https://images.puma.net/images/629392/87/bv/fnd/ARG/w/600/h/600/fmt/png/bg/%23FAFAFA",
      disponibilidad: true,
      cantidad: 1,
      categoria: "Camisa",
      marca: "Puma"
    }, {
      id: 5,
      nombre: 'Remera Puma',
      descripcion: 'Remera Oversize Lace Em Up Hombre',
      precio: 80000,
      preciodesc: 80000,
      imagen: 'https://images.puma.net/images/630287/01/fnd/ARG/w/600/h/600/fmt/png/bg/%23FAFAFA',
      imagen2: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/630287/01/bv/fnd/ARG/fmt/png?sw=480&q=60",
      disponibilidad: true,
      cantidad: 1,
      categoria: "Remera",
      marca: "Puma"
    }, {
      id: 6,
      nombre: 'Campera  Fenty x Puma',
      descripcion: 'Campera con capucha Fenty x Puma x Smurfs',
      precio: 150000,
      preciodesc: 150000,
      imagen: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/633647/01/fnd/ARG/fmt/png?sw=480&q=60',
      imagen2: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/633647/01/bv/fnd/ARG/fmt/png?sw=480&q=60',
      disponibilidad: true,
      cantidad: 1,
      categoria: "Campera",
      marca: "Puma"
    }, {
      id: 7,
      nombre: 'Buzo Puma',
      descripcion: 'Buzo Oversixe wardrobe essentials Mujer',
      precio: 150000,
      preciodesc: 150000,
      imagen: 'https://images.puma.net/images/629817/46/fnd/ARG/w/600/h/600/fmt/png/bg/%23FAFAFA',
      imagen2: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/629817/46/bv/fnd/ARG/fmt/png',
      disponibilidad: true,
      cantidad: 1,
      categoria: "Buzo",
      marca: "Puma"
    },
    {
      id: 8,
      nombre: 'Buzo OCN',
      descripcion: 'Buzo Ocn Hombre Canguro Original ',
      precio: 50000,
      preciodesc: 50000,
      imagen: 'https://cdn.billowshop.com/54ca2b61-40dc-f8c6/img/Producto/041f2986-08a4-699f-eb25-eed46f5ecc0c/WhatsApp-Image-2025-05-22-at-08-32-20-682f1062b286a.webp',
      imagen2: 'https://cdn.billowshop.com/54ca2b61-40dc-f8c6/img/Producto/041f2986-08a4-699f-eb25-eed46f5ecc0c/WhatsApp-Image-2025-05-22-at-08-32-20-682f1062b286a.webp',
      disponibilidad: true,
      cantidad: 1,
      categoria: "Buzo",
      marca: "OCN"
    }, {
      id: 9,
      nombre: 'Campera Puma',
      descripcion: 'Campera acolchada para hombre',
      precio: 50000,
      preciodesc: 50000,
      imagen: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/627123/27/fnd/ARG/fmt/png?sw=480&q=60',
      imagen2: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/627123/27/bv/fnd/ARG/fmt/png',
      disponibilidad: true,
      cantidad: 1,
      categoria: "Campera",
      marca: "Puma"
    }, {
      id: 10,
      nombre: 'Campera Puma',
      descripcion: 'Campera acolchada para hombre',
      precio: 75000,
      preciodesc: 75000,
      imagen: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/630736/02/fnd/ARG/fmt/png',
      imagen2: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/630736/02/bv/fnd/ARG/fmt/png',
      disponibilidad: true,
      cantidad: 1,
      categoria: "Campera",
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

  searchTerm: string = ''
  selectedCategory: string = ''
  selectedBrand: string = ''
  minprecio: number | null = null
  maxprecio: number | null = null

  get categories(): string[] {
    return [...new Set(this.Productos.map(p => p.categoria))];
  }
  get marca(): string[] {
    return [...new Set(this.Productos.map(p => p.marca))];
  }
  OnSearch(event: Event): void {
    event.preventDefault();
  }

  resetFilters(): void { 
    this.searchTerm = ''
    this.selectedCategory = ''
    this.selectedBrand = ''
    this.minprecio = null
    this.maxprecio = null
  }

  get filteredProducts():Producto[]{
    return this.Productos.filter(p=>
      (this.searchTerm==='' || p.nombre.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())) && 
      (this.selectedCategory===''|| p.categoria===this.selectedCategory) && 
      (this.selectedBrand=== '' || p.marca ===this.selectedBrand) &&
      (this.minprecio=== null || p.precio>=this.minprecio) &&
      (this.maxprecio===null || p.precio<= this.maxprecio)
    )
  }

}




