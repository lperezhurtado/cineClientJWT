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
//=================================== U S U A R I O ===================================================
import { PlistUsuarioComponent } from './component/application/admin/usuario/plist-usuario/plist-usuario.component';
import { GetUsuarioComponent } from './component/application/admin/usuario/get-usuario/get-usuario.component';
import { DataTableUsuarioComponent } from './component/application/admin/usuario/auxiliar/data-table-usuario/data-table-usuario.component';
import { DeleteUsuarioComponent } from './component/application/admin/usuario/delete-usuario/delete-usuario.component';
import { CreateUsuarioComponent } from './component/application/admin/usuario/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './component/application/admin/usuario/update-usuario/update-usuario.component';
import { ListaTipousuarioSelectionComponent } from './component/application/admin/tipousuario/auxiliar/lista-tipousuario-selection/lista-tipousuario-selection.component';
//=================================== T I P O S A L A ===================================================
import { ListaTiposalaSelectionComponent } from './component/application/admin/tiposala/auxiliar/lista-tiposala-selection/lista-tiposala-selection.component';
import { CreateTiposalaComponent } from './component/application/admin/tiposala/create-tiposala/create-tiposala.component';
import { DeleteTiposalaComponent } from './component/application/admin/tiposala/delete-tiposala/delete-tiposala.component';
import { GetTiposalaComponent } from './component/application/admin/tiposala/get-tiposala/get-tiposala.component';
import { UpdateTiposalaComponent } from './component/application/admin/tiposala/update-tiposala/update-tiposala.component';
import { PlistTiposalaComponent } from './component/application/admin/tiposala/plist-tiposala/plist-tiposala.component';
//=================================== S A L A ===================================================
import { GetSalaComponent } from './component/application/admin/sala/get-sala/get-sala.component';
import { UpdateSalaComponent } from './component/application/admin/sala/update-sala/update-sala.component';
import { CreateSalaComponent } from './component/application/admin/sala/create-sala/create-sala.component';
import { DeleteSalaComponent } from './component/application/admin/sala/delete-sala/delete-sala.component';
import { DataTableSalaComponent } from './component/application/admin/sala/auxiliar/data-table-sala/data-table-sala.component';
import { SelectPlistComponent } from './component/application/admin/sala/auxiliar/select-plist/select-plist.component';
import { PlistSalaComponent } from './component/application/admin/sala/plist-sala/plist-sala.component';
import { CreateGeneroComponent } from './component/application/admin/genero/create-genero/create-genero.component';
import { UpdateGeneroComponent } from './component/application/admin/genero/update-genero/update-genero.component';
import { DeleteGeneroComponent } from './component/application/admin/genero/delete-genero/delete-genero.component';
import { PlisGeneroComponent } from './component/application/admin/genero/plis-genero/plis-genero.component';
import { ListaGeneroComponent } from './component/application/admin/genero/lista-genero/lista-genero.component';
import { CreateTarifaComponent } from './component/application/admin/tarifa/create-tarifa/create-tarifa.component';
import { UpdateTarifaComponent } from './component/application/admin/tarifa/update-tarifa/update-tarifa.component';
import { DeleteTarifaComponent } from './component/application/admin/tarifa/delete-tarifa/delete-tarifa.component';
import { PlistTarifaComponent } from './component/application/admin/tarifa/plist-tarifa/plist-tarifa.component';
import { GetTarifaComponent } from './component/application/admin/tarifa/get-tarifa/get-tarifa.component';
import { SelectPlistTarifaComponent } from './component/application/admin/tarifa/Auxiliar/select-plist/select-plist-tarifa.component';
import { CreatePeliculaComponent } from './component/application/admin/pelicula/create-pelicula/create-pelicula.component';
import { DeletePeliculaComponent } from './component/application/admin/pelicula/delete-pelicula/delete-pelicula.component';
import { GetPeliculaComponent } from './component/application/admin/pelicula/get-pelicula/get-pelicula.component';
import { PlistPeliculaComponent } from './component/application/admin/pelicula/plist-pelicula/plist-pelicula.component';
import { UpdatePeliculaComponent } from './component/application/admin/pelicula/update-pelicula/update-pelicula.component';
import { DataTablePeliculaComponent } from './component/application/admin/pelicula/auxiliar/data-table-pelicula/data-table-pelicula.component';
import { SelectPlistPeliculaComponent } from './component/application/admin/pelicula/auxiliar/select-plist/select-plist-pelicula/select-plist-pelicula.component';
import { CreateSesionComponent } from './component/application/admin/sesion/create-sesion/create-sesion.component';
import { DeleteSesionComponent } from './component/application/admin/sesion/delete-sesion/delete-sesion.component';
import { GetSesionComponent } from './component/application/admin/sesion/get-sesion/get-sesion.component';
import { PlistSesionComponent } from './component/application/admin/sesion/plist-sesion/plist-sesion.component';
import { UpdateSesionComponent } from './component/application/admin/sesion/update-sesion/update-sesion.component';
import { DataTableSesionComponent } from './component/application/admin/sesion/Auxiliar/data-table-sesion/data-table-sesion.component';
import { ListEntradasComponent } from './component/application/admin/entrada/list-entradas/list-entradas.component';
import { ViewEntradasComponent } from './component/application/admin/entrada/view-entradas/view-entradas.component';
import { CreateCompraComponent } from './component/application/admin/compra/create-compra/create-compra.component';
import { GetSesionPeliculaComponent } from './component/application/user/sesiones/get-sesion-pelicula/get-sesion-pelicula.component';
import { ViewPeliculaComponent } from './component/application/user/pelicula/view-pelicula/view-pelicula.component';
import { CarteleraComponent } from './component/application/user/cartelera/cartelera.component';

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
    PlistSalaComponent,
    //=================== GENERO ADMIN =======================
    CreateGeneroComponent,
    UpdateGeneroComponent,
    DeleteGeneroComponent,
    PlisGeneroComponent,
    ListaGeneroComponent,
    //=================== TARIFA ADMIN =======================
    CreateTarifaComponent,
    UpdateTarifaComponent,
    DeleteTarifaComponent,
    PlistTarifaComponent,
    GetTarifaComponent,
    SelectPlistTarifaComponent,
    //=================== PELICULA ADMIN =======================
    CreatePeliculaComponent,
    DeletePeliculaComponent,
    GetPeliculaComponent,
    PlistPeliculaComponent,
    UpdatePeliculaComponent,
    DataTablePeliculaComponent,
    SelectPlistPeliculaComponent,
    //=================== SESION ADMIN =======================
    CreateSesionComponent,
    DeleteSesionComponent,
    GetSesionComponent,
    PlistSesionComponent,
    UpdateSesionComponent,
    DataTableSesionComponent,
    //=================== ENTRADA ADMIN =======================
    ListEntradasComponent,
    ViewEntradasComponent,
    CreateCompraComponent,
    //=================== U S E R =======================
    GetSesionPeliculaComponent,
    ViewPeliculaComponent,
    CarteleraComponent
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
