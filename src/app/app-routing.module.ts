import { HomeComponent } from './component/shared/home/home.component';
import { LoginComponent } from './component/shared/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './component/shared/logout/logout.component';
import { PlistUsuarioComponent } from './component/application/admin/usuario/plist-usuario/plist-usuario.component';
import { GetUsuarioComponent } from './component/application/admin/usuario/get-usuario/get-usuario.component';
import { DeleteUsuarioComponent } from './component/application/admin/usuario/delete-usuario/delete-usuario.component';
import { CreateUsuarioComponent } from './component/application/admin/usuario/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './component/application/admin/usuario/update-usuario/update-usuario.component';
import { ListaTipousuarioSelectionComponent } from './component/application/admin/tipousuario/auxiliar/lista-tipousuario-selection/lista-tipousuario-selection.component';
import { ListaTiposalaSelectionComponent } from './component/application/admin/tiposala/auxiliar/lista-tiposala-selection/lista-tiposala-selection.component';
import { CreateTiposalaComponent } from './component/application/admin/tiposala/create-tiposala/create-tiposala.component';
import { DeleteTiposalaComponent } from './component/application/admin/tiposala/delete-tiposala/delete-tiposala.component';
import { CreateSalaComponent } from './component/application/admin/sala/create-sala/create-sala.component';
import { DeleteSalaComponent } from './component/application/admin/sala/delete-sala/delete-sala.component';
import { GetSalaComponent } from './component/application/admin/sala/get-sala/get-sala.component';
import { PlistSalaComponent } from './component/application/admin/sala/plist-sala/plist-sala.component';
import { UpdateSalaComponent } from './component/application/admin/sala/update-sala/update-sala.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'logout', component: LogoutComponent},
  //============= USUARIO ===================
  {path:'admin/usuario/plist', component: PlistUsuarioComponent},
  {path:'admin/usuario/view/:id', component: GetUsuarioComponent},
  {path:'admin/usuario/delete/:id', component: DeleteUsuarioComponent},
  {path:'admin/usuario/create', component: CreateUsuarioComponent},
  {path:'admin/usuario/update/:id', component: UpdateUsuarioComponent},
  //============= TIPOUSUARIO =================
  {path:'admin/tipousuario/list', component: ListaTipousuarioSelectionComponent},
  //============= TIPOSALA =================
  {path: 'admin/tiposala/list', component: ListaTiposalaSelectionComponent},
  {path: 'admin/tiposala/create', component: CreateTiposalaComponent},
  {path: 'admin/tiposala/delete/:id', component: DeleteTiposalaComponent},
  //============= SALA =================
  {path:'admin/sala/plist', component: PlistSalaComponent},
  {path:'admin/sala/view/:id', component: GetSalaComponent},
  {path:'admin/sala/create', component: CreateSalaComponent},
  {path:'admin/sala/delete/:id', component: DeleteSalaComponent},
  {path:'admin/sala/update/:id', component: UpdateSalaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
