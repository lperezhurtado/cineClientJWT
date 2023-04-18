import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoUsuarioInterface, TipoUsuarioResponse } from 'src/app/model/TipoUsuario-interface';
import { TipoUsuarioService } from 'src/app/service/tipo-usuario.service';

@Component({
  selector: 'app-lista-tipousuario-selection',
  templateUrl: './lista-tipousuario-selection.component.html',
  styleUrls: ['./lista-tipousuario-selection.component.css']
})
export class ListaTipousuarioSelectionComponent implements OnInit{

  pagesCount: number;
  numberPage: number;
  pageRegister: number;
  listUserTypes: TipoUsuarioInterface[];

  @Output() closeEvent = new EventEmitter<number>();

  constructor(
    private tipoUsuarioService: TipoUsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserTypePlist();
  }

  getUserTypePlist() {
    this.tipoUsuarioService.getUsersTypePlist(this.numberPage, this.pageRegister)
    .subscribe({
      next: (resp: TipoUsuarioResponse) => {
        this.listUserTypes = resp.content;
        this.pagesCount = resp.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  getPlistContent(): TipoUsuarioInterface[]{
    return this.listUserTypes;
  }

  getpagesCount(): number{
    return this.pagesCount;
  }

  getNumberPage( e: number ){
    this.numberPage = e;
    this.getUserTypePlist();
  }

  getPageRegister():number{
    return this.pageRegister;
  }

  setPageRegister( registerPage: number ){
    this.pageRegister = registerPage;
    this.getUserTypePlist();
  }

  userTypeSelected(id: number): void {
    this.closeEvent.emit(id);
  }
}
