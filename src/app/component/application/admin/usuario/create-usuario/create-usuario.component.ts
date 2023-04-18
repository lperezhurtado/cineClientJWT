import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioInterface, IUsuario2Send, IUsuarior2Form } from 'src/app/model/Usuario-interface';
import { CryptoService } from 'src/app/service/crypto.service';
import { TipoUsuarioService } from 'src/app/service/tipo-usuario.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Location } from '@angular/common';
import { PopUpService } from 'src/app/service/pop-up.service';
import { TipoUsuarioInterface } from 'src/app/model/TipoUsuario-interface';

declare let bootstrap: any;

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  id: number = 0; //guarda el id del usuario creado para mostrarlo en el modal
  usuario!: UsuarioInterface;
  usuario2Send!: IUsuario2Send;
  form!: FormGroup<IUsuarior2Form>;
  error = "";
  tipousuarioDescription: string = "";

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private cryptoService: CryptoService,
    private tipoUsuarioService: TipoUsuarioService,
    private location: Location,
    private popUpService: PopUpService
  ) { }

  ngOnInit(): void {
    this.form = <FormGroup>this.formBuilder.group({
      id: [""],
      dni: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i)] ],
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellido1: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellido2: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      login: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ["", [Validators.required, Validators.minLength(3)]],
      passwordC: ["", [Validators.required]],
      tipousuario: ["", [Validators.required, Validators.pattern(/^\d{1,2}$/)]]
    });
  }

  createUsuario() {
    this.usuario2Send = {
      id:       this.form.value.id,
      dni:      this.form.value.dni,
      nombre:   this.form.value.nombre,
      apellido1:this.form.value.apellido1,
      apellido2:this.form.value.apellido2,
      email:    this.form.value.email,
      login:    this.form.value.login,
      password: this.cryptoService.getSHA256(this.form.value.password!),
      tipousuario: { id: this.form.value.tipousuario }
    }
    if (this.form.valid) {
      this.usuarioService.createUsuario(this.usuario2Send).subscribe({
        next: (resp: number) => {
          this.id = resp;
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Usuario " + resp + " creado";
          this.showModal();
        },
        error: (error: any) => {         //recoge errores que llegan del servidor en las validaciones
          this.error = error.error.message;
          this.popUpService.notificationPopUp(this.error,"error");
          console.log(error);
        }
      });
    } else {
      this.popUpService.notificationPopUp("Por favor, rellena todos los campos","warning");
    }
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    });
    var myModalEl = document.getElementById(this.mimodal);
    if (myModalEl) {
       myModalEl.addEventListener('hidden.bs.modal', (event): void => {

      this.router.navigate(['/admin/usuario/view/', this.id])
      });
    }
    this.myModal.show()
  }

  back() {
    this.location.back();
  }

  sonIguales() {
    let iguales = this.form.value.password == this.form.value.passwordC? true : false;
    return iguales;
  }

  openModalFindTeam(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findTeam"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.myModal.show()
  }

  openModalFindUsertype(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findUsertype"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show();
  }

  updateUserTypeDescription(id_team: number) {
    this.tipoUsuarioService.getTipoUsuario(id_team).subscribe({
      next: (data: TipoUsuarioInterface) => {
        this.tipousuarioDescription = data.nombre;
        return this.tipousuarioDescription;
      },
      error: (error: any) => {
        this.tipousuarioDescription = "No se ha encontrado";
        this.form.controls['tipousuario'].setErrors({'incorrect': true});
      }
    });
  }

  closeUserTypeModal(id_usertype: number) {
    this.form.controls['tipousuario'].setValue(id_usertype);
    this.updateUserTypeDescription(id_usertype);
    this.myModal.hide();
  }

}
