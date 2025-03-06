import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  SuccessAlert(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      html: text,
      confirmButtonText: 'OK',
    });
  }

  ErrorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      html: text,
      confirmButtonText: 'OK',
    });
  }

  WarningAlert(title: string, text: string) {
    Swal.fire({
      icon: 'warning',
      title: title,
      html: text,
      confirmButtonText: 'OK',
    });
  }

  ConfirmationArreteDeCaisse(
    title: string,
    text: string,
    callback: () => void // fonction a executer apres validation
  ): void {
    Swal.fire({
      icon: 'warning',
      title: title,
      html: text,
      showCancelButton: !0,
      cancelButtonColor: '#bb9457',
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Annuler',
    }).then((result: any) => {
      if (result.isConfirmed) {
        callback(); // appel de la fonction passee en parametre
      }
    });
  }

  CustomAlert(options: any) {
    Swal.fire(options);
  }
}
