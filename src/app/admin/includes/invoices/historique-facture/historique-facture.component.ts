import { Component } from '@angular/core';

@Component({
  selector: 'app-historique-facture',
  templateUrl: './historique-facture.component.html',
  styleUrls: ['./historique-facture.component.scss'],
})
export class HistoriqueFactureComponent {
  session_infos: any = JSON.parse(
    sessionStorage.getItem('sessiondate') || '{}'
  );
  ImprimerLetat() {
    window.print();
  }
}
