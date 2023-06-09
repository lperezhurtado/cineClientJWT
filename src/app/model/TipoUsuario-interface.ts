import { FormControl } from "@angular/forms";
import { Pageable, Sort } from "./shared-interface";

export interface TipoUsuarioInterface {
  id:            number;
  nombre:        string;
  usuariosCount: number;
}

export interface TipoUsuarioResponse {
  content:          TipoUsuarioInterface[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  numberOfElements: number;
  sort:             Sort;
  number:           number;
  first:            boolean;
  size:             number;
  empty:            boolean;
}

export interface TipoUsuarioNewInterface {
  id:            number;
  nombre:        string;
}

export interface TipoSalaFormInterface {
  id:           FormControl<number>;
  nombre:       FormControl<string>;
}
