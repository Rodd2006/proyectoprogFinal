import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../../app/modelos/producto.models';


@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  private favoritoSubject =new BehaviorSubject<{ producto: Producto;cantidad : number}[]>([])
  favorito$ = this.favoritoSubject.asObservable();
  agregarfavorito(producto:Producto){
    const productos = this.favoritoSubject.getValue();
    const encontrado = productos.find( p => p.producto.id == producto.id)
     
    if(encontrado){
      encontrado.cantidad++;
    }else{
      this.favoritoSubject.next([...productos,{producto,cantidad:1}])
    }

  }
  eliminarFavorito(productoId:number){
    const productos = this.favoritoSubject.getValue().filter(p => p.producto.id != productoId)
    this.favoritoSubject.next(productos)

  }
  
  constructor() { }
}

