import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../servicios/auth.service';
import { Route } from '@angular/router';
import { response } from 'express';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';


@Component({
  selector: 'app-iniciosesion',
  imports: [CommonModule,FormsModule,NgIf],
  standalone:true,
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})
export class IniciosesionComponent {  
  //Datos capturados desde el formulario de login
  usuario={email:'',
          password:''
        };

  //variables para mostrar mensajes de error y estados de carga
  error: string|null=null;
  cargando=false;

  constructor(
    private authService:AuthService,
    //redirecciona luego de iniciar sesion
    private router:Router
  ){}
mensaje = ''; 
  //Envia las credenciales al backend e inicia la sesion sison validas
  iniciarSesion(){
    this.error=null;
    this.cargando=true,
    this.authService.login(this.usuario).subscribe({
      //Se ejecuta cuandoel servidor devuelve una respuesta exitosa
      next:(response:any)=>{

  // el backend debe devolver:id,nombre,mail,rol y token
  if(response?.token){
    
    alert(`Bienvenido ${response.nombre}!`);  

    //guarda token y rol en localstorage
    this.authService.guardarSesion(response.token, response.rol);

    // guarda tambien los datos completos del usuario
    localStorage.setItem('usuario', JSON.stringify(response));

    // Muestra el mensaje por 1 segundo y luego redirige
    setTimeout(() => {
      this.router.navigate([
        response.rol === 'admin' ? '/admin' : '/inicio',
      ]);
    }, 1000);

  } else if(response?.mensaje){
    this.error = response.mensaje;
  } else {
    this.error = 'Respuesta inesperada del servidor';
  }

  this.cargando = false;
},

      //se ejecuta cuando ocurre un error en la comunicacion con el backend
      error:(err:any)=>{
        console.error('Error al iniciar sesion',{
          status:err.status,
          statusText:err.statusText,
          error:err.error,
          url:err.url
        });
        //Se muestra un mensaje devueltopor el backend si existe
        this.error=err.error?.mensaje||'credenciales incorrectas o error con el servidor. ';
        this.cargando=false;
      }
    });
  }

}
