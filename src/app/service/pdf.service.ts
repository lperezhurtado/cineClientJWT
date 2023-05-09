import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SesionInterface } from '../model/Sesion-interface';
import { EntradaInterface } from '../model/Entrada-interface';
declare let jsPDF: any;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  //sesion: SesionInterface;
  arrayEntradas: EntradaInterface[] = [];

  private entityUrl="/pelicula";
  url = `${environment.baseURL}${this.entityUrl}`;

  constructor() { }

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }

  reverseFecha(dia:string) {
    return dia.split("-").reverse().join("-");
  }

  downloadPDF(dia: string, hora: string, sesion: SesionInterface, arrayEntradas: EntradaInterface[]):void {
    let document = new jsPDF('p', 'mm', 'a4');

    var altoPagina = 247;
    var anchoPagina = 170;
    var y = 82;

    var img = new Image();
    img.src = this.getURLimage(sesion.pelicula.imagen);
    document.addImage(img, 'jpg', 10, 12, 35, 50);

    document.setFontSize(23);
    document.setFont('courier', 'bold');
    document.text(sesion.pelicula.titulo, 50, 20);

    document.setFontSize(13);
    document.text("CineMatrix", 50, 50);
    document.text(this.reverseFecha(hora), 50, 60);
    document.text(this.reverseFecha(dia), 75, 60);

    document.roundedRect(10, 65, 190, 1, 1, 1, "F");

    document.setFont("courier", "normal");
    document.text("Sala " + sesion.sala.id, 12, 72);

    document.setFont("courier", "bold");
    document.text("Fila", 13, y);
    document.text("Butaca", 53, y);
    document.text("Tarifa", 103, y);
    document.text("Precio", 153, y);

    document.setFont("courier", "normal");
    for (let i = 0; i < arrayEntradas.length; i++) {
      y += 10;

      document.text(arrayEntradas[i].ejeX.toString(),13, y); //FILA
      document.text(arrayEntradas[i].ejeY.toString(),53, y); //BUTACA
      document.text(sesion.tarifa.nombre,103, y); //TARIFA
      document.text(sesion.tarifa.precio+" €",153, y);
    }

    document.setFont("courier", "bold");
    document.text("TOTAL: ",123, y+20);
    document.text(sesion.tarifa.precio * arrayEntradas.length+" €",153, y+20);
    document.save('entradas-' + sesion.pelicula.titulo + '.pdf');
  }
}
