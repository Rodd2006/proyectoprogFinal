import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf'
import { CarritoService } from '../../../servicios/carrito.service';
import { NOMEM } from 'dns';
import { url } from 'inspector';
import { create } from 'domain';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  //Declaracion del formulario reactivo para la compra 
  formularioCompra!: FormGroup;
  //variable para almacenar el total de la compra(subtotal+envio)
  total!: number

  //costo fijo de envio 
  envio = 5000
  //indicador para saber si la factura ya fue generada
  facturaGenerada = false

  //objeto que contiene la informacion de la factura generada 
  factura: any
  //controla la visibilidad del modal que muestre el pdf
  mostrarModal = false

  //fuente segura para mostrar el pdf mostrado en el iframe(estilizado)
  pdfSrc: SafeResourceUrl | undefined;

  constructor(
    private fb: FormBuilder, //FormBuild para crear el formulario activo
    private carritoService: CarritoService, // servicio para manejar el carrito y obtener productos y total 
    private sanitizer: DomSanitizer//para sanitizar la url del pdf y que angular lo permita mostr                                                           ar
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
  }
  //calcula el total de la compra sumando el subtotal y el costo de envio
  calcularTotal(): number {
    const subtotal = this.carritoService.obtenerTotal(); //obtiene el subtotal del carrito
    this.total = subtotal + this.envio
    return this.total
  }
  //Prepara los datos para la factura con cliente,productos,total y fecha
  emitirFactura(): void {
    const datosCliente = this.formularioCompra.value; //datos ingresados
    const productos = this.carritoService.obtenerProductos() //productos del carrito
    const totalFinal = this.calcularTotal() // Total calculado con  envio


    //construye el objeto factura con toda la info 
    this.factura = { cliente: datosCliente, productos: productos, envio: this.envio, total: totalFinal, fecha: new Date() };
    //marca la factura que fue generada
    this.facturaGenerada = true;

  }
  //metodo que se ejecuta al finalizar la compra (click al boton)
  //identifica validez del formulario,genera factura y muestra pdf
  finalizarCompra(): void {
    if (this.formularioCompra.valid) {
      this.emitirFactura(); //crea la factura 
      this.generarPDFModal(); //genera y muestra el pdf en Modal 
    } else {
      this.formularioCompra.markAllAsTouched(); //marca todos los campos como tocados para mostrar errores
    }

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
