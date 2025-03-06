import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { Share } from '@capacitor/share';

@Component({
  selector: 'app-envoi-de-rapport',
  templateUrl: './envoi-de-rapport.component.html',
  styleUrls: ['./envoi-de-rapport.component.scss'],
})
export class EnvoiDeRapportComponent {
  ImprimerLetat() {
    window.print();
  }

  EnvoiDuRapport(methode: string) {
    const pdfBlob = this.GeneratePdf(); // generer le PDF

    if (methode === 'email') {
      this.EnvoyerParEmail(pdfBlob);
    } else if (methode === 'whatsapp') {
      this.EnvoyerParWhatsapp(pdfBlob);
    }
  }

  GeneratePdf(): Blob {
    const doc = new jsPDF();

    // ajouter un titre
    doc.text('Rapport Comptable', 14, 10);

    // generer le tableau
    autoTable(doc, {
      head: [['Actes', 'Caisses', 'Montant']],
      body: [
        ['Consultation.s', 'Caisse espèce', '10 000 F CFA'],
        ['', 'Dépot Wave', '5 000 F CFA'],
        ['', 'Dépot Orange', '2 000 F CFA'],
        ['', 'Dépot Moov', '1 000 F CFA'],
        ['', 'Dépot MTN', '500 F CFA'],
        ['', 'Virement', '500 F CFA'],
        ['', 'Chèque', '500 F CFA'],
        ['Hospitalisation.s', 'Caisse espèce', '10 000 F CFA'],
        ['', 'Dépot Wave', '5 000 F CFA'],
        ['', 'Dépot Orange', '2 000 F CFA'],
        ['', 'Dépot Moov', '1 000 F CFA'],
        ['', 'Dépot MTN', '500 F CFA'],
        ['', 'Virement', '500 F CFA'],
        ['', 'Chèque', '500 F CFA'],
        ['', 'Total', '1 000 000 F CFA'],
      ],
    });

    // retourner un Blob pour lenvoi
    const pdfBlob = doc.output('blob');
    return pdfBlob;
  }

  EnvoyerParEmail(pdfBlob: Blob) {
    // exemple avec un service backend
    const formData = new FormData();
    formData.append(
      'file',
      new File([pdfBlob], 'rapport.pdf', { type: 'application/pdf' })
    );
    formData.append('email', 'destination@example.com');

    // appelle de service pour envoyer le fichier (a implémenter)
    console.log('Envoi par Email : fichier PDF prêt.');
  }

  EnvoyerParWhatsapp(pdfBlob: Blob) {
    // convertir le PDF blob en URL utilisable dans WhatsApp
    const fileUrl = URL.createObjectURL(pdfBlob);
    const message = `Bonjour, voici le rapport comptable : ${fileUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;

    // rediriger vers WhatsApp
    window.open(whatsappUrl, '_blank');
  }
}
