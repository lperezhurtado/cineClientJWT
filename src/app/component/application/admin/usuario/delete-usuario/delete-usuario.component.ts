import { Component, EventEmitter, Input, Output } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
//import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})

export class DeleteUsuarioComponent {

  @Input() idUser: number;
  @Output() deleted = new EventEmitter<boolean>();

  //id: number;
  isDeleted: boolean = false;

  constructor(
    //protected location: Location,
    private usuarioService: UsuarioService,
    //private activatedRoute: ActivatedRoute,
  ) {
    //this.id = activatedRoute.snapshot.params['id'];
  }

  onDeleted():void {
    this.deleted.emit(this.isDeleted);
  }

  deleteUsuario() {
    console.log("deleteUusuario");
    this.usuarioService.deleteUsuario(this.idUser).subscribe({
      next: (data: number) => {
        this.isDeleted = true;
        this.onDeleted();
      }
    })
  }
}
