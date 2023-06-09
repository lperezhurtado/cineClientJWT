import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector:'app-get-usuario',
  templateUrl: './get-usuario.component.html',
  styleUrls: ['./get-usuario.component.css']
})
export class GetUsuarioComponent implements OnInit{

  @Input() id: number;
  usuario: UsuarioInterface;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    this.usuarioService.getUsuario(this.id).subscribe({
      next: (data: UsuarioInterface) => {
        this.usuario = data;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['admin/usuario/plist']);
  }

}
