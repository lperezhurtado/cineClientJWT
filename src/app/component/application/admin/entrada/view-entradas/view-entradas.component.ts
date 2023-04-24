import { Component, Input } from '@angular/core';
import { EntradaInterface } from 'src/app/model/Entrada-interface';
import { SesionInterface } from 'src/app/model/Sesion-interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-entradas',
  templateUrl: './view-entradas.component.html',
  styleUrls: ['./view-entradas.component.css']
})
export class ViewEntradasComponent {

  @Input() entradas: EntradaInterface[];
  @Input() sesion: SesionInterface;

  private entityUrl="/pelicula";
  url = `${environment.baseURL}${this.entityUrl}`;

  getURLImage(image: string): string {
    return this.url + '/images/' + image;
  }
}
