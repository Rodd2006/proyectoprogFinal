import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Producto } from '../modelos/producto.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //URL base del modulo de productos en la API
  private apiURL = 'http://localhost/api_proyecto/public/products'
  constructor(private http: HttpClient) { }

  //construye las cabeceras de http necesarias para os solicitudes protegidas
  //si existe un token en localStorage. lo incluye como cabecera Authorization 
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Authorization':token ?`Bearer${token}`:''
    })
    return headers
  }
  //obtiene la lista completa de productos desde la api
  //es una ruta publica y no requiere un token
  getProducts():Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL)
    .pipe(catchError(this.handleError));
  }
  //obtiene un producto espcifico segun su identificador
  getProductById(id:number):Observable<Producto>{
    return this.http.get <Producto>(`${this.apiURL}/${id}`)
    .pipe(catchError(this.handleError));
  }



  //Envia un nuevo producto al servidor usando FormData 
  //Esto permite incluir archivos de imagen en la solicitud
 addProduct(formData: FormData): Observable<any> {
    return this.http.post(
      this.apiURL,
      formData,
      {
        // Content-Type debe quedar vacío para que el navegador
        // genere el multipart/form-data automáticamente.
        headers: this.getAuthHeaders(false)
      }
    );
  }

  //actualiza un producto segun su id
  //esta operaion esta protegida y requiere un token valido
  updateProduct(id:number,formdata:FormData):Observable<any>{
    return this.http.put(`${this.apiURL}/${id}`,formdata,{
      headers: this.getHeaders()
    }).pipe(catchError(this.handleError));
  }

//elimina un producto segun su id esta operacion esta protegida y requiere token


  deleteProduct(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiURL}/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

//manejo centralizado a errores para todas las solicitudes 
//devuelve un mensaje legible en caso de fallo 
private handleError(error:any){
  console.error('Error en ProductService:',error);
  let msg='Ocurrio un error al procesar la solicitud.';
  if(error.error?.message){
    msg = error.error.message;
  }
  return throwError(() => new Error(msg))
}


// ============================================================
  // HEADERS DE AUTENTICACIÓN
  // Si json=true → se agrega Content-Type: application/json
  // Si json=false → se omite para enviar FormData
  // ============================================================
  private getAuthHeaders(json: boolean = true): HttpHeaders {
    const token = (typeof localStorage !== 'undefined')
      ? localStorage.getItem('token') || ''
      : '';

    // Siempre enviamos el token.
    const headers: any = { Authorization: `Bearer ${token}` };

    // Solo agregamos JSON cuando NO se envía FormData.
    if (json) {
      headers['Content-Type'] = 'application/json';
    }

    return new HttpHeaders(headers);
  }
}
