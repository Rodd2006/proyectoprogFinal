import { CommonModule } from '@angular/common';
import { Component, getNgModuleById } from '@angular/core';
import { Producto } from '../../modelos/producto.models';

import { RouterLink } from '@angular/router';


import { subscribe } from 'diagnostics_channel';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../servicios/product.service';
import { CarritoService } from '../../servicios/carrito.service';
import { FavoritoService } from '../../../servicios/servicios/favorito.service';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  

  Productos: Producto[] = [
    
  ]
  cargando = true
  error = '';
  query: string = '';
  resultados: Producto[] = [...this.Productos];

  buscarProducto() {
    this.resultados = this.Productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.query.toLowerCase())
    );
  }
  constructor(private carritoService: CarritoService, private favoritoService: FavoritoService, private productService: ProductService) { }
  //metodo para agregar al carrito
  agregar(producto: Producto): void {
    this.carritoService.agregarAlCarrito(producto).subscribe({
      next: () => {
        console.log('Producto agregado')
        alert("Producto agregado al carrito")
      },
      error: err => { console.error(err); alert("Debes iniciar Sesión para poder agregar productos al carrito") }
    });
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

  get filteredProducts(): Producto[] {
    return this.Productos.filter(p =>
      (this.searchTerm === '' || p.nombre.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())) &&
      (this.selectedCategory === '' || p.categoria === this.selectedCategory) &&
      (this.selectedBrand === '' || p.marca === this.selectedBrand) &&
      (this.minprecio === null || p.precio >= this.minprecio) &&
      (this.maxprecio === null || p.precio <= this.maxprecio)
    )
  }
  ngOnInit() : void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.getProducts().subscribe({

      // Si la petición es exitosa:
      next: (res: any) => {
        console.log
        this.Productos = res;    // Se asigna la lista recibida.
        this.cargando = false;   // Finaliza el estado de carga.
      },

      // Si ocurre un error:
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudieron cargar los productos.'; // Mensaje visible al usuario.
        this.cargando = false;
      }
    });
  }


}




