import { Component } from '@angular/core';

@Component({
  selector: 'app-antecedent-patient',
  templateUrl: './antecedent-patient.component.html',
  styleUrls: ['./antecedent-patient.component.scss'],
})
export class AntecedentPatientComponent {
  session_infos: any = JSON.parse(
    sessionStorage.getItem('sessiondate') || '{}'
  );
  ImprimerLetat() {
    window.print();
  }
}
