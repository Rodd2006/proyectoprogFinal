import { Component } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [CommonModule,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
nuevoUsuario = {
    nombre: '',
    email: '',
    password: ''
  };
  error:string='';
  constructor(private authService: AuthService, private router: Router) {}

  //se dispara al enviar el formulario
  registrar():void{
    //valida que los campos del formulario esten llenos
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }



      //llama al backedn a traves del service Auth
    this.authService.register(this.nuevoUsuario).subscribe({
    //si el registro esta bien
    next:()=>{
      //alert que notifica que puede iniciar sesion
      alert('Registro exitoso. Ahora puede iniciar sesión.');

      //redirige a la pantalla de login
      this.router.navigate(['/iniciosesion']);
    
    },
    //si ocurre un error con el backend o red :
    
    error:(err)=>{
      console.error('Error en el registro', err);
    
      // Mensaje para mostrar en la interfaz.
        this.error = 'Error al registrar el usuario.';
    }
  
  })
}
}

  
  


