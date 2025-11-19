import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// URL base de modulo de usuario en la api
private apiUrl='http://localhost/api_proyecto/public/users'
  constructor(private http:HttpClient) { }
  //enviar los credencciales y retorna la respuesta
  login(datos:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,datos);

  }
  //envia los datos del nuevo usuario al backend para registrar una cuenta
 register(datos:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,datos);

  }
// guarda el token y el rol del usuario en el almacenamiento local
guardarSesion(token:string,rol:string){
  localStorage.setItem('token',token);
  localStorage.setItem('rol',rol);
}
//retorna el rol almacenado o null si no existe
obtenerRol(): string | null {
  return localStorage.getItem('rol')
}
//indica si el usuario actual tiene rol de administrador
esAdmin():boolean{
  return localStorage.getItem('rol')==='admin';
}
//elimina los datos de la sesion almacenados 
logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
}
}
