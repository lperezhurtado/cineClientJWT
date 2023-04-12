import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-data-table-usuario',
  templateUrl: './data-table-usuario.component.html',
  styleUrls: ['./data-table-usuario.component.css']
})
export class DataTableUsuarioComponent implements OnChanges, OnInit {

  @Input() id: number;
  usuario: UsuarioInterface;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    //this.getUsuario();
  }

  ngOnChanges() {   //ha permitido meter el view en un modal
    this.getUsuario();
  }

  getUsuario() {
    this.usuarioService.getUsuario(this.id).subscribe({
      next: (data: UsuarioInterface) => {
        this.usuario = data;
      }
    })
  }
}
