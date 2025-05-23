export interface Producto{
    id:number;
    nombre:string;
    descripcion:string;
    precio:number;
    preciodesc:number
    imagen:string;
    disponibilidad:boolean;
    cantidad?:number;   
   }