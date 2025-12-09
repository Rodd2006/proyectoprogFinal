import { Injectable } from "@angular/core";

// importa CanActivate (interfaz para proteger rutas) y Router (para redireccionar)
import { CanActivate,Router } from "@angular/router";
//importa el servicio de autenticacion que contiene una logica para verificar roles del usuario 
import { AuthService } from "../servicios/auth.service";
//declara la clase como inyectable y disponible en toda la aplicacion 
@Injectable({providedIn:'root'})
export class AdminGuard implements CanActivate{
    //inyeccion de dependencias:
    // - AuthService:para comprobar si el usuario tien rol
    // - router: para redirigir al usuario no tiene permiso
    constructor(private authService:AuthService,private router:Router){}

    //metodo obligatorio de la interfaz canActivate,que decide si se puede acceder a una ruta 
    canActivate():boolean{
        //verifica si el usuario es administrador mediante el motodo del servicio de autenticacion
        if(this.authService.esAdmin()){
            //si el usuario tiene rol de administrador se permite el acceso
            return true
        }else{
            //si no es administrador muestra mensaje de alerta
            alert('acceso denegado,solo administradores pueden acceder')
            //redirige al usuario de la pagina inicio
            this.router.navigate(['/inicio'])
            //devuelve false para desbloquear el acceso a la ruta
            return false
        }
    }
}