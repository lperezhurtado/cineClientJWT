import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioInterface, IUsuarior2Form, IUsuario2Update } from 'src/app/model/Usuario-interface';
import { TipoUsuarioService } from 'src/app/service/tipo-usuario.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Location } from '@angular/common';
import { TipoUsuarioInterface } from 'src/app/model/TipoUsuario-interface';
import { PopUpService } from 'src/app/service/pop-up.service';

declare let bootstrap: any;

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit{

  id: number = 0;
  usuario!: UsuarioInterface;
  usuario2Form!: IUsuarior2Form;
  usuario2Update!: IUsuario2Update;
  form!: FormGroup<IUsuarior2Form>;
  error = ""; //guarda el error de validacion del servidor

  actualTipoUsuario!: number; //indicará si se ha cambiado el tipoUsuario

  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  // foreigns
  userTypeDescription: string = "Descripción de la ajena";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService,
    private formBuilder: FormBuilder,
    private location: Location,
    private popUpService: PopUpService
  ) {
    this.id = activatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.getUsuario();
  }

  back() {
    this.location.back();
  }

  updateUserTypeDescription(idUserType: number) {
    this.tipoUsuarioService.getTipoUsuario(idUserType).subscribe({
      next: (data: TipoUsuarioInterface) => {
        this.userTypeDescription = data.nombre;
      },
      error: (error: any) => {
        this.userTypeDescription = "No se ha encontrado";
        this.form.controls['tipousuario'].setErrors({'incorrect': true});
      }
    })
  }

  getUsuario() {
    this.usuarioService.getUsuario(this.id).subscribe({
      next: (data: UsuarioInterface) => {
        this.usuario = data;

        this.form = <FormGroup>this.formBuilder.group({
          id:       [data.id, [Validators.required]],
          dni:      [data.dni,[Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i) ]],
          nombre:   [data.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          apellido1:[data.apellido1, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          apellido2:[data.apellido2, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          email:    [data.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          login:    [data.login, [Validators.required, Validators.minLength(4), Validators.maxLength(20), /*Validators.pattern('^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$')*/]],
          tipousuario: [data.tipousuario.id, [Validators.required, Validators.pattern(/^\d{1,2}$/)]]
        });

        this.actualTipoUsuario = data.tipousuario.id;
        this.updateUserTypeDescription(this.usuario.tipousuario.id);
      }
    });
  }

  updateUsuario() {
    this.usuario2Update = {
      id:       this.form.value.id!,
      dni:      this.form.value.dni!,
      nombre:   this.form.value.nombre!,
      apellido1:this.form.value.apellido1!,
      apellido2:this.form.value.apellido2!,
      email:    this.form.value.email!,
      login:    this.form.value.login!,
      tipousuario: { id: this.form.value.tipousuario! }
    }

    if (this.form.valid) {
      this.usuarioService.updateUsuario(this.usuario2Update).subscribe({
        next: (data: number) => {
          this.modalTitle = "Cine MatriX"
          this.modalContent = "Usuario " + data + " actualizado";
          this.showModal();
        },
        error: (error: any) => {        //recoge errores que llegan del servidor en las validaciones
          this.error = error.error.message;
          this.popUpService.notificationPopUp(this.error, "error");
        }
      })
    }
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    });
    var myModalEl = document.getElementById(this.mimodal);
    if (myModalEl) {
      myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.router.navigate(['/admin/usuario/view', this.usuario2Update.id])
      })
    }
    this.myModal.show()
  }

  openModalFindUsertype(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findUsertype"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show()
  }

  closeUserTypeModal(id_usertype: number) {
    this.form.controls['tipousuario'].setValue(id_usertype);
    this.updateUserTypeDescription(id_usertype);
    this.myModal.hide();
  }

}
