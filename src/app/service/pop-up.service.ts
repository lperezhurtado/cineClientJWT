import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  notificationPoUp(message: string, icon: string) {
    Swal.fire({
      icon: <any>icon,
      title: message,
      toast: true,
      position: 'bottom-end',
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }
}
