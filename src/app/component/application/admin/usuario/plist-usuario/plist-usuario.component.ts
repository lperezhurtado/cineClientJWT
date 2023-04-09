import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioPageInterface } from 'src/app/model/Usuario-interface';
import { PopUpService } from 'src/app/service/pop-up.service';
import { UsuarioService } from 'src/app/service/usuario.service';

declare let bootstrap: any;

@Component({
  selector: 'app-admin-plist-usuario',
  templateUrl: './plist-usuario.component.html',
  styleUrls: ['./plist-usuario.component.css']
})
export class PlistUsuarioComponent implements OnInit {

  usuariosPage: UsuarioPageInterface;

  filter: string = "";
  idUserTypeFilter: number = 0;
  numberOfElements: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  id: number;
  isDeleted: boolean;
  generated: number;
  msg: string = "";

  //modals
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private popUp: PopUpService
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.usuarioService.getUsuarioPlist(this.page,this.numberOfElements, this.filter, this.idUserTypeFilter, this.sortField, this.sortDirection)
    .subscribe({
      next: (resp: UsuarioPageInterface) => {
        this.usuariosPage = resp;

        if (this.page > resp.totalPages - 1) {
          this.page = resp.totalPages - 1;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  setPage(e: number) {
    this.page = e -1;
    this.getPage();
  }

  setRpp(rpp: number) {
    this.numberOfElements = rpp;
    this.page = 0;
    this.getPage();
  }

  setFilter(term: string) {
    this.filter = term;
    this.getPage();
  }

  setFilterUserType(id: number) {
    if (id == 0 && this.idUserTypeFilter == 2) {  //los 3 primeros if filtran al clickar en el th
      this.idUserTypeFilter = 0;
    }
    else if (id == 0 && this.idUserTypeFilter == 1) {
      this.idUserTypeFilter = 2;
    }
    else if (id == 0) {
      this.idUserTypeFilter = 1;
    }
    else if (this.idUserTypeFilter != id) {   //los 2 ultimmos if filtran al clickar en un td
      this.idUserTypeFilter = id;
    }
    else if(this.idUserTypeFilter == id){
      this.idUserTypeFilter = 0;
    }

    this.page = 0;
    this.getPage();
  }

  setOrder(order: string) {
    if (this.sortField !== order) {     //cuando se hace click en una columna nueva, este if devuelve el icon original a la columna anterior
      let icon = document.getElementById(this.sortField);
      icon?.classList.remove(icon.classList.value.slice(3));
      icon?.classList.add('pi-sort-alt');
    }

    this.sortField = order;
    this.sortDirection = this.sortDirection == "asc"? "desc" : "asc";

    let newIcon = document.getElementById(order);
    this.sortDirection === "asc" ? newIcon.classList.replace(newIcon.classList.value.slice(3),'pi-sort-numeric-down') : newIcon?.classList.replace(newIcon?.classList.value.slice(3),'pi-sort-numeric-up');

    this.getPage();
  }

  openModalView(id: number): void {
    this.id = id;
    this.myModal = new bootstrap.Modal(document.getElementById('viewUser'), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show();
  }

  openModalDelete(id: number): void {
    this.id = id;
    this.myModal = new bootstrap.Modal(document.getElementById('deleteUser'), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show();
  }

  closeModal(isDeleted: boolean) {
    this.isDeleted = isDeleted;

    isDeleted? this.popUp.notificationPoUp('Usuario eliminado','succes') : '';
    this.getPage();
    this.myModal.hide();
  }

  generar(cantidad: number) {
    this.usuarioService.generateUsuario(cantidad).subscribe({
      next: (resp: number) => {
        this.generated = resp;

        this.msg = "Se han generado "+(cantidad)+" usuarios ("+resp+" usuarios en total)" ;

        const myModal = new bootstrap.Modal('#generateInfo', {
          keyboard: false
        })
        myModal.show();
      }
    })
  }
}
