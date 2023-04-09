import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Location } from '@angular/common';
import { EmitEvent } from 'src/app/service/login.service';
import { Events } from 'src/app/service/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  user: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    protected router: Router,
    private loginService: LoginService,
    private location: Location
  ) {
    if (loginService.isSessionActive()) {
      this.user = loginService.getUserName();
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    console.log("logout");
    this.loginService.emit(new EmitEvent(Events.logout,""));
    //this.router.navigate(['/home']);
  }

  volver() {
    this.location.back();
  }

}
