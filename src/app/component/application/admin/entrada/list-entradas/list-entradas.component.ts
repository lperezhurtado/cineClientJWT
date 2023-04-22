import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradaInterface } from 'src/app/model/Entrada-interface';
import { SesionInterface } from 'src/app/model/Sesion-interface';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { EntradaService } from 'src/app/service/entrada.service';
import { Location } from '@angular/common';
import { PopUpService } from 'src/app/service/pop-up.service';

@Component({
  templateUrl: './list-entradas.component.html',
  styleUrls: ['./list-entradas.component.css']
})
export class ListEntradasComponent implements OnInit {

  usuarioLogged: UsuarioInterface;
  resp: EntradaInterface[];
  sesion: SesionInterface;
  idSesion: number;
  filas: any[] = [];
  arrayEntradas: EntradaInterface[] = [];

  constructor(
    private entradaService: EntradaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private popUpService: PopUpService
  ) {
    this.idSesion = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getListOfEntradas();
  }

  back() {
    this.location.back();
  }

  cleanArrayEntradas() {
    this.arrayEntradas = [];
  }

  getListOfEntradas() {
    this.entradaService.getListEntrada(this.idSesion).subscribe({
      next: (resp: EntradaInterface[]) => {
        this.resp = resp;
        this.sesion = resp[0].sesion; //recoge los datos de la sesion

        this.ordenarEntradas(resp);
      }
    })
  }

  ordenarEntradas(resp: EntradaInterface[]) {
    let i = 0;
    let j = 0;
    let fila: EntradaInterface[] = [];

    resp.forEach( entrada => {
      if (entrada.ejeX === i) {
        fila.push(entrada);
      } else {
        i++;
        if (entrada.ejeX === i) {
          this.filas.push(fila);
          fila = [];
          fila.push(entrada);
        } else {
          this.filas.push(fila);
          fila = [];
        }
      }

      j++;
      if (j === resp.length) {
        this.filas.push(fila);
      }
    });
  }

  seleccionarEntrada(entrada: EntradaInterface) {

    !entrada.libre? this.popUpService.notificationPopUp("Butaca ocupada", "warning") : '';

    if(this.arrayEntradas.includes(entrada)) {
      let pos = this.arrayEntradas.indexOf(entrada);
      this.arrayEntradas.splice(pos, 1);
    } else {
      this.arrayEntradas.push(entrada);
    }
  }

  arrayEntradasOnLocalStorage() {
    localStorage.setItem("arrayEntradas", JSON.stringify(this.arrayEntradas));
  }
}
