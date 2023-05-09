import { Component, Input } from '@angular/core';
import { EntradaInterface } from 'src/app/model/Entrada-interface';
import { SesionInterface } from 'src/app/model/Sesion-interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-selected-entradas',
  templateUrl: './selected-entradas.component.html',
  styleUrls: ['./selected-entradas.component.css']
})
export class SelectedEntradasComponent {

  @Input() entradas!: EntradaInterface[];
  @Input() sesion!: SesionInterface;

  private entityUrl="/pelicula";
  url = `${environment.baseURL}${this.entityUrl}`;

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }
}
