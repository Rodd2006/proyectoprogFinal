import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf'
import { CarritoService } from '../../servicios/carrito.service';
import { NOMEM } from 'dns';
import { url } from 'inspector';
import { create } from 'domain';
import { CompraService } from '../../servicios/compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  productos: any[] = [];  
  //Declaracion del formulario reactivo para la compra 
  formularioCompra!: FormGroup;
  //variable para almacenar el total de la compra(subtotal+envio)
  total=0;  
  // Datos adicionales que el usuario debe completar (pueden usarse más adelante en el futuro).
  datos = { direccion: '', telefono: '' };
  //costo fijo de envio 
  envio = 5000
  //indicador para saber si la factura ya fue generada
  facturaGenerada = false
subtotal = 0;
  // Costo fijo de envío.

  //objeto que contiene la informacion de la factura generada 
  factura: any
  //controla la visibilidad del modal que muestre el pdf
  mostrarModal = false
mensaje = '';
  cargando = false;
  //fuente segura para mostrar el pdf mostrado en el iframe(estilizado)
  pdfSrc: SafeResourceUrl | undefined;

  constructor(
    private fb: FormBuilder, //FormBuild para crear el formulario activo
    private carritoService: CarritoService, // servicio para manejar el carrito y obtener productos y total 
    private sanitizer: DomSanitizer,//para sanitizar la url del pdf y que angular lo permita mostr                                                           ar
    private compraService: CompraService,
    private router: Router
  ) { }


  ngOnInit(): void {
  
    this.formularioCompra = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      metodoPago: ['', Validators.required],
      
    })

    // Se suscribe al carrito en tiempo real:
    // si se modifica el carrito en cualquier parte de la app,
    // este componente vuelve a calcular los totales.
    this.carritoService.carrito$.subscribe(items => {
      this.productos = items;
      this.calcularTotales();
    });
  }
   calcularTotales() {

    // Toma cada producto y multiplica precio_unitario * cantidad.
    this.subtotal = this.productos.reduce((acc, p) => {
      const precio = Number(p.precio_unitario) || 0;
      const cantidad = Number(p.cantidad) || 1;
      return acc + (precio * cantidad);
    }, 0);

    // Total = subtotal + costo de envío.
    this.total = Number(this.subtotal) + Number(this.envio);
  }
  //Prepara los datos para la factura con cliente,productos,total y fecha
  
  //metodo que se ejecuta al finalizar la compra (click al boton)
  //identifica validez del formulario,genera factura y muestra pdf
  finalizarCompra() {
    if (this.formularioCompra.valid) {
      this.generarPDFModal(); //genera y muestra el pdf en Modal 
    } else {
      this.formularioCompra.markAllAsTouched(); //marca todos los campos como tocados para mostrar errores
    }
      const data = {
      direccion: this.datos.direccion,
      telefono: this.datos.telefono
    };

    // Marca estado de carga para bloquear UI si fuera necesario.
    this.cargando = true;

    // Llama al backend para crear la compra, generar ticket y vaciar el carrito.
    this.compraService.finalizarCompra(data).subscribe({
      next: res => {

        // Mensaje informativo.
        this.mensaje = 'Compra realizada con éxito';

        // Vaciar carrito localmente y en backend.
        this.carritoService.vaciarCarrito().subscribe();

        // Navegar al ticket luego de 1 segundo (simula efecto visual).
        setTimeout(() => {
          this.router.navigate(['/ticket', res.id_compra]);
        }, 1000);
      },

      // Si hubo error en el proceso:
      error: err => {
        console.error(err);
        this.mensaje = 'Error al procesar compra.';
        this.cargando = false;
      }
    });



  }
  //genera el pdf con jsPDF y crea la url para mostrar en iframes dentro del modal 
  generarPDFModal(): void {
    if (!this.factura) return;
    //Si no hay factura que no haga nada
    const doc = new jsPDF(); //Crea instancia de PDF
    //agrega titulo y fecha al pdf
    doc.setFontSize(18);
    doc.text('Factura de Compra', 14, 20)
    doc.setFontSize(12)
    doc.text(`Fecha:${this.factura.fecha.toLocaleString()}` , 14, 30)
    //Informacion del cliente 
    doc.text('cliente:', 14, 40)
    const c = this.factura.cliente;
    doc.text(`Nombre :${c.nombre}`, 20, 50);
    doc.text(`Direccion :${c.direccion}`, 20, 60);
    doc.text(`Correo :${c.correo}`, 20, 70);
    doc.text(`Telefono :${c.telefono}`, 20, 80);
    doc.text(`Ciudad :${c.ciudad}`, 20, 90);
    doc.text(`Provincia :${c.provincia}`, 20, 100);
    doc.text(`Codigo Postal :${c.codigoPostal}`, 20, 110);

    //Listado de productos con cantidad,precio y subtotal
    let y = 120
    doc.text('Productos:', 14, y)
    this.factura.productos.forEach((item: any, index: number) => {
      y += 10;
      doc.text(
        `${index + 1}. ${item.producto.nombre} - Cantidad : ${item.cantidad}- Precio: ${item.producto.precio.toFixed(2)} - Subtotal $ ${(item.producto.precio * item.cantidad).toFixed(2)}`, 20, y)

    })
    //costos finales
    y += 10;
    doc.text(`Costos de envio :$ ${this.factura.envio.toFixed(2)}`, 14, y)
    y += 10
    doc.text(`Total a pagar: $ ${this.factura.total.toFixed(2)}`, 14, y)
    //Convierte el PDF y genera una url segura para angular 
    const pdfBlob = doc.output('blob')
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob))
    //Abre el modal q contiene el pdf
    this.mostrarModal = true
  }
  //Metodo para cerra el modal y liberar el url del pdf para evitar fugas de memoria
  cerrarModal(): void {
    this.mostrarModal = false;
    if (this.pdfSrc) {
      //se revoca la url para liberar recursos
      URL.revokeObjectURL((this.pdfSrc as any).changingThisBreaksApplicationSecurity)
      this.pdfSrc = undefined
    }
  }
  //Metodo para imprimir el pdf q esta cargando dentro del iframe de la vista
  ImprimirPDF(): void {
    //obtiene la referencia  al elemento iframe del DOM mediante su ID 'pdfFrame'
    //puede devolver null si no se encuentra el elemento 
    const iframe: HTMLIFrameElement | null = document.getElementById('pdfFrame') as HTMLIFrameElement;
    //verifique que el iframe exista y que tenga un objeto
    if (iframe && iframe.contentWindow) {
      //le da foco al contenido del iframe para asegurarse que la ventana correcta esta activa para imprimir
      iframe.contentWindow.focus()
      //llama al metodo print de la ventana del iframe para abrirla ventana de impresion del navegador 
      iframe.contentWindow.print()
    }

  }
}
