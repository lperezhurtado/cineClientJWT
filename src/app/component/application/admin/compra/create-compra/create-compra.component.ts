import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraInterface, CompraNewInterface } from 'src/app/model/Compra-interface';
import { EntradaInterface } from 'src/app/model/Entrada-interface';
import { FacturaNewInterface } from 'src/app/model/Factura-interface';
import { SesionInterface } from 'src/app/model/Sesion-interface';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { CompraService } from 'src/app/service/compra.service';
import { EntradaService } from 'src/app/service/entrada.service';
import { FacturaService } from 'src/app/service/factura.service';
import { PdfService } from 'src/app/service/pdf.service';
import { PopUpService } from 'src/app/service/pop-up.service';

@Component({
  templateUrl: './create-compra.component.html',
  styleUrls: ['./create-compra.component.css']
})
export class CreateCompraComponent implements OnInit {

  loggedUsuario: UsuarioInterface;
  descuentoUsuario: number;
  sesion: SesionInterface;
  fecha!:string;
  dia!: string;
  hora!: string;

  compra: CompraNewInterface;
  compras: CompraNewInterface[] = [];
  arrayCompras: CompraInterface[] = [];
  updatedCompra: CompraNewInterface;
  arrayIDCompras: number[] = [];

  idEntrada: number;
  entrada: EntradaInterface;
  arrayEntradas: EntradaInterface[] = [];   //EL ARRAY QUE COGE LAS ENTRADAS DE LOCALSTORAGE
  entradas: number[];

  factura: FacturaNewInterface;
  idFactura: number;
  tarifa: number;
  totalPrecio: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private compraService: CompraService,
    private facturaService: FacturaService,
    private formBuilder: FormBuilder,
    private entradaService: EntradaService,
    private popUpService: PopUpService,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.arrayEntradasFromLocalStorage();
    this.getSesion();
    this.setEntradasToCompras();
    localStorage.removeItem('arrayEntradas');

    this.fecha = this.sesion.fechaHora.toString();
    this.dia = this.fecha.slice(0, 10);
    this.hora = this.fecha.slice(11, 16);
  }

  ngOnChange() {
    this.pdfService.downloadPDF(this.dia, this.hora);
    this.updateCompras();
  }

  arrayEntradasFromLocalStorage() {
    this.arrayEntradas = JSON.parse(localStorage.getItem('arrayEntradas'));
  }

  getSesion() {
    this.sesion = this.arrayEntradas[0].sesion;
  }

  setEntradasToCompras() {
    this.tarifa = this.sesion.tarifa.precio;
    this.totalPrecio = this.tarifa * this.arrayEntradas.length;
    this.descuentoUsuario = this.loggedUsuario? this.loggedUsuario.descuento : 0;
    let actualFecha = new Date().toJSON();

    this.arrayEntradas.forEach(entrada => {
      this.compra = {
        id: undefined,
        precio: this.tarifa,
        fecha: new Date(actualFecha),
        descuentoUsuario: this.descuentoUsuario,
        entrada: {id: entrada.id},
        factura: null
      }
      this.compras.push(this.compra);
    })
  }

  // 1
  createCompra() {
    for (let i = 0; i < this.compras.length; i++) {
      this.compraService.createCompra(this.compras[i]).subscribe ({
        next: (resp: number) => {
          this.arrayIDCompras.push(resp);
        }
      });
    }

    setTimeout( () => {
      //this.popUpService.confirmPopUp("Se ha realizado tu compra", "De acuerdo", "cr");
      if (this.popUpService.confirmPopUp("Se ha realizado tu compra", "De acuerdo", "cr")) {
        this.getCompras();
      }
    }, 500)

    this.createFactura();
  }

  // 2
  getCompras() {
    this.arrayIDCompras.forEach( idCompra => {
      this.compraService.getCompra(idCompra).subscribe({
        next: (resp: CompraInterface) => {
          this.arrayCompras.push(resp);
        }
      });
    });
  }

  // 3
  createFactura() {
    let precioTotal = this.arrayEntradas[0].sesion.tarifa.precio * this.arrayEntradas.length;

    this.factura = {
      fecha: new Date(),
      iva: 21,
      total: precioTotal,
      usuario: {id: this.loggedUsuario.id}
    }

    this.facturaService.createFactura(this.factura).subscribe ({
      next: (resp: number) => {
        this.idFactura = resp;
      }
    });
  }

  // 4
  updateCompras() {
    this.arrayCompras.forEach( compra => {
      this.updatedCompra = {
        id: compra.id,
        precio: compra.precio,
        fecha: compra.fecha,
        descuentoUsuario: compra.descuentoUsuario,
        entrada: {id: compra.entrada.id},
        factura: {id: this.idFactura}
      }

      this.compraService.updateCompraFactura(this.updatedCompra).subscribe({
        next: (resp: number) => {
          console.log("updated compra ", resp);

          //this.popUpService.confirmPopUp("Entradas descargadas", "Ver", "up");
          if (!this.popUpService.confirmPopUp("Entradas descargadas", "Ver", "up")) {
            this.router.navigate(['/home']);
          }
        }
      });
    });
  }

}
