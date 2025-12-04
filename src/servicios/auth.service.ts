import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Inject, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject  ,Observable, tap } from 'rxjs';
import { isPlatformBrowser  } from '@angular/common';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
      // URL base de modulo de usuario en la api
    private apiUrl='http://localhost/api_proyecto/public/users';


      // Indica si el código corre en navegador (true) o en servidor (false, en SSR).
       private isBrowser: boolean;
loginSubject = new BehaviorSubject<boolean>(false);

    // Evento que notifica al resto de la aplicación que el usuario inició sesión.
    // El NavComponent lo escucha para actualizar usuario + carrito.
  
    loginEvent$ = this.loginSubject.asObservable();


  constructor(private http:HttpClient,
    // PLATFORM_ID permite saber si estamos en entorno browser o server-side.
    @Inject(PLATFORM_ID) private platformId: Object)  { 
  // Determina si estamos en navegador para permitir el uso de localStorage.
    this.isBrowser = isPlatformBrowser(this.platformId);}  
  //enviar los credencciales y retorna la respuesta


login(credentials: { email: string; password: string }): Observable<any> {

  return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    tap((response: any) => {

      if (response?.token && this.isBrowser) {

        // Guarda el token
        localStorage.setItem('token', response.token);

        // Guarda el usuario completo (ID, nombre, email, rol)
        localStorage.setItem('usuario', JSON.stringify({
          id: response.id,
          nombre: response.nombre,
          email: response.email,
          rol: response.rol
        }));

        // Notifica a la app que inició sesión
        this.loginSubject.next(true);  
      }
    })
  );
}



  //envia los datos del nuevo usuario al backend para registrar una cuenta
  register(usuario: { nombre: string; email: string; password: string; rol?: string }): Observable<any> {
    // Envía datos del nuevo usuario al backend.
    return this.http.post(`${this.apiUrl}/register`, usuario);
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


// Para obtener usuario actual desde cualquier componente
getUsuario() {
  if (typeof window !== 'undefined') {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
  return null;
}

logout() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('token');
  this.loginSubject.next(false);
}
}