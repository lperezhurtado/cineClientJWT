import { CryptoService } from 'src/app/service/crypto.service';
import { DecodeService } from './service/decode.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar'; //CALENDAR PRIME NG
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/shared/login/login.component';
import { MenuComponent } from './component/shared/menu/menu.component';
import { HomeComponent } from './component/shared/home/home.component';
import { LogoutComponent } from './component/shared/logout/logout.component';
import { LoginService } from './service/login.service';
import { DropdownRegisterPageComponent } from './component/shared/unrouted/dropdown-register-page/dropdown-register-page.component';
import { PaginationUnroutedComponent } from './component/shared/unrouted/pagination-unrouted/pagination-unrouted.component';
import { PaginationComponent } from './component/shared/unrouted/pagination/pagination.component';
import { SearchUnroutedComponent } from './component/shared/unrouted/search-unrouted/search-unrouted.component';
import { PlistUsuarioComponent } from './component/application/admin/usuario/plist-usuario/plist-usuario.component';
import { GetUsuarioComponent } from './component/application/admin/usuario/get-usuario/get-usuario.component';
import { DataTableUsuarioComponent } from './component/application/admin/usuario/auxiliar/data-table-usuario/data-table-usuario.component';
import { DeleteUsuarioComponent } from './component/application/admin/usuario/delete-usuario/delete-usuario.component';
import { CreateUsuarioComponent } from './component/application/admin/usuario/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './component/application/admin/usuario/update-usuario/update-usuario.component';
import { ListaTipousuarioSelectionComponent } from './component/application/admin/tipousuario/auxiliar/lista-tipousuario-selection/lista-tipousuario-selection.component';
import { ListaTiposalaSelectionComponent } from './component/application/admin/tiposala/auxiliar/lista-tiposala-selection/lista-tiposala-selection.component';
import { CreateTiposalaComponent } from './component/application/admin/tiposala/create-tiposala/create-tiposala.component';
import { DeleteTiposalaComponent } from './component/application/admin/tiposala/delete-tiposala/delete-tiposala.component';
import { GetTiposalaComponent } from './component/application/admin/tiposala/get-tiposala/get-tiposala.component';
import { UpdateTiposalaComponent } from './component/application/admin/tiposala/update-tiposala/update-tiposala.component';
import { PlistTiposalaComponent } from './component/application/admin/tiposala/plist-tiposala/plist-tiposala.component';
import { GetSalaComponent } from './component/application/admin/sala/get-sala/get-sala.component';
import { UpdateSalaComponent } from './component/application/admin/sala/update-sala/update-sala.component';
import { CreateSalaComponent } from './component/application/admin/sala/create-sala/create-sala.component';
import { DeleteSalaComponent } from './component/application/admin/sala/delete-sala/delete-sala.component';
import { DataTableSalaComponent } from './component/application/admin/sala/auxiliar/data-table-sala/data-table-sala.component';
import { SelectPlistComponent } from './component/application/admin/sala/auxiliar/select-plist/select-plist.component';
import { PlistSalaComponent } from './component/application/admin/sala/plist-sala/plist-sala.component';

@NgModule({
  declarations: [
    AppComponent,
    //==================== SHARED =============================
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    HomeComponent,
    PaginationComponent,
    SearchUnroutedComponent,
    PaginationUnroutedComponent,
    DropdownRegisterPageComponent,
    //=================== USUARIO ADMIN =======================
    PlistUsuarioComponent,
    GetUsuarioComponent,
    DataTableUsuarioComponent,
    DeleteUsuarioComponent,
    CreateUsuarioComponent,
    UpdateUsuarioComponent,
    //=================== TIPOUSUARIO ADMIN =======================
    ListaTipousuarioSelectionComponent,
    //=================== TIPOSALA ADMIN =======================
    ListaTiposalaSelectionComponent,
    CreateTiposalaComponent,
    DeleteTiposalaComponent,
    GetTiposalaComponent,
    UpdateTiposalaComponent,
    PlistTiposalaComponent,
    //=================== SALA ADMIN =======================
    GetSalaComponent,
    UpdateSalaComponent,
    CreateSalaComponent,
    DeleteSalaComponent,
    DataTableSalaComponent,
    SelectPlistComponent,
    PlistSalaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    CryptoService,
    LoginService,
    DecodeService,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
