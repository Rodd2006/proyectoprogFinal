import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { ProductoComponent } from './paginas/producto/producto.component';
import { OfertaComponent } from './paginas/oferta/oferta.component';
import { QuienessomosComponent } from './paginas/quienessomos/quienessomos.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { FavoritoComponent } from './paginas/favorito/favorito.component';
import { CalzadoComponent } from './paginas/calzado/calzado.component';
import { CompraComponent } from './paginas/compra/compra.component';
import { IniciosesionComponent } from './paginas/iniciosesion/iniciosesion.component';
import { RegistroComponent } from './paginas/registro/registro.component';

export const routes: Routes = [
    {path:'',redirectTo:'/inicio',pathMatch:"full"},
    {path:'inicio',component:InicioComponent},
    {path:'contacto',component:ContactoComponent},
    {path:'producto',component:ProductoComponent},
    {path:'oferta',component:OfertaComponent},
    {path:'quienessomos',component:QuienessomosComponent},
    {path:'carrito',component:CarritoComponent},
    {path:'favorito',component:FavoritoComponent},
    {path:'calzado',component:CalzadoComponent},
    {path:'compra',component:CompraComponent},
    {path:'iniciosesion',component:IniciosesionComponent},
    {path:'registro',component:RegistroComponent}
];
