import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { Events, LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  usuario: UsuarioInterface;
  user: string = "";
  userType: string = "";
  strUrl: string = "";
  isAdmin: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.user = loginService.getUserName();
    this.userType = loginService.getUserType();
    this.isAdmin = this.userType=="administrador";
    //ALTERNATIVA
    /*const storage = localStorage.getItem('usuario');
    this.usuario = storage? JSON.parse( localStorage.getItem("user") || "[]") : null;*/

    //this.usuario =  JSON.parse( localStorage.getItem("usuario")! ); //tambien se puede usar la exclamacion en vez de || "[]"
    //console.log("menu component",this.usuario);

    /*this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    });*/
  }

  ngOnInit(): void {
    this.loginService.on(Events.login).subscribe(
      (data: string) => {
        this.user = this.loginService.getUserName();
        this.userType = this.loginService.getUserType();
        this.isAdmin = this.userType=="administrador";

      });
    this.loginService.on(Events.logout).subscribe(
      (data: string) => {
        this.user = '';
        this.userType = '';
        this.isAdmin = this.userType=="administrador";
      });
  }
}
