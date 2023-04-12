import { Events } from './../../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/service/crypto.service';
import { EmitEvent, LoginService } from 'src/app/service/login.service';
import { LoginInterface } from 'src/app/model/login-interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup<LoginInterface>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private loginService: LoginService,
    private cryptoService: CryptoService
  ) {
    if (this.loginService.isSessionActive()) {
      this.router.navigate(['/home']);
    }

    this.formLogin = <FormGroup>this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login( this.formLogin.get('login').value, this.cryptoService.getSHA256(this.formLogin.get('password').value) )
    .subscribe({
      next: (data: string) => {
        localStorage.setItem("token", data);
        this.loginService.emit(new EmitEvent(Events.login, data));
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.status, error.statusText);
      }
    })
  }

  loginAdmin() {
    this.formLogin.setValue({
      login: "luisp",
      password: "admin1"
    });
  }

  loginUser() {
    this.formLogin.setValue({
      login: "usuario",
      password: "user"
    });
  }
}
