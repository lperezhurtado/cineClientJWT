import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  notificationPopUp(message: string, icon: string) {
    Swal.fire({
      icon: <any>icon,
      title: message,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }
}
