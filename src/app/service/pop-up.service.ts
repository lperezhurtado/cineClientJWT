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

  confirmPopUp(message: string, btnMsg: string, option: string): boolean {
    let bool: boolean;
    Swal.fire({
      title: message,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: btnMsg
    }).then((result) => {
      if (result.isConfirmed && option === "cr") {
        bool = true;
      }
      else if (result.isConfirmed && option === "up") {
        bool = false
      }
    })

    return bool;
  }
}
