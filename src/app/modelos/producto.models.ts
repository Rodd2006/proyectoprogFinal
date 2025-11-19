export interface Producto{
    id:number;
    nombre:string;
    descripcion:string;
    precio:number;
    preciodesc:number
    imagen:string;
    imagen2:string;
    disponibilidad:boolean;
    cantidad?:number;   
    categoria:string;
    marca:string;

   }