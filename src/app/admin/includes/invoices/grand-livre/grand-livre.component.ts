import { Component, OnInit } from '@angular/core';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//import { Workbook } from 'exceljs';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

@Component({
  selector: 'app-grand-livre',
  templateUrl: './grand-livre.component.html',
  styleUrls: ['./grand-livre.component.scss'],
})
export class GrandLivreComponent {
  private renderer: Renderer2;
  constructor(
    rendererFactory: RendererFactory2,
    public _toolsService: ToolsService,
    public _adminService: AdminService,
    public _alertService: AlertService,
    public _loaderService: LoaderService,
    private _themeService: ThemeService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  date_save: string | null = null;

  total_solde: any;
  liste_temp: any = [];
  tab_total: any = [];
  session_grndlivre_de_caisse: any = JSON.parse(
    sessionStorage.getItem('et_grandlivre') || '[]'
  );
  Telecharger() {
    window.print();
  }
  Export2PDF(elementId: string, filename = 'document') {
    let content = document.getElementById(elementId);

    if (!content) {
      console.error('Élément introuvable !');
      return;
    }

    // Ajout des styles pour conserver les bordures
    let styles = `
      <style>
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 20px;
        width: 100%;
        height: 120px;
      }
      .header .left {
        text-align: left;
        line-height: 1.5;
      }
      .header .right {
        text-align: right;
        font-size: 12px;
      }
      .title {
        text-align: center;
        font-weight: bold;
        margin: 120px 0 10px 220px;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 7px;
        box-shadow: 10px 5px 5px gray;
      }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    `;

    // Construire le document HTML
    let preHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Export HTML To PDF</title>
      ${styles}
      </head><body>`;

    let postHtml = `</body></html>`;
    let html = preHtml + content.innerHTML + postHtml;

    // Options pour html2pdf
    const options = {
      margin: 10,
      filename: filename + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Utilisation de html2pdf pour générer le PDF
    //@ts-ignore
    html2pdf().from(html).set(options).save();
  }
  Export2WordEXCEL(elementId: string, filename = 'document') {
    let content = document.getElementById(elementId);

    if (!content) {
      console.error('Élément introuvable !');
      return;
    }

    // Ajout des styles pour conserver les bordures
    let styles = `
      <style>

        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    `;

    // Construire le document Word
    let preHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Export HTML To Word</title>
      ${styles}
      </head><body>`;

    let postHtml = `</body></html>`;
    let html = preHtml + content.innerHTML + postHtml;

    let blob = new Blob(['\ufeff', html], {
      type: 'application/vnd.ms-excel',
    });

    let url = URL.createObjectURL(blob);
    let downloadLink = document.createElement('a');

    downloadLink.href = url;
    downloadLink.download = filename + '.xls';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  Export2Word(elementId: string, filename = 'document') {
    let content = document.getElementById(elementId);

    if (!content) {
      console.error('Élément introuvable !');
      return;
    }

    // Ajout des styles pour conserver les bordures
    let styles = `
      <style>
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 20px;
        // margin-top: 2%;
        //background-color: transparent;
        width: 100%;
        height: 120px;
      }
      .header .left {
        text-align: left;
        line-height: 1.5;
      }
      .header .right {
        text-align: right;
        font-size: 12px;
      }
      .title {
        text-align: center;
        font-weight: bold;
        margin: 120px 0 10px 220px;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 7px;
        box-shadow: 10px 5px 5px gray;
        //display: inline-block;
      }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    `;

    // Construire le document Word
    let preHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Export HTML To Word</title>
      ${styles}
      </head><body>`;

    let postHtml = `</body></html>`;
    let html = preHtml + content.innerHTML + postHtml;

    let blob = new Blob(['\ufeff', html], {
      type: 'application/msword',
    });

    let url = URL.createObjectURL(blob);
    let downloadLink = document.createElement('a');

    downloadLink.href = url;
    downloadLink.download = filename + '.doc';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  TelechargerVersionPdf() {
    const element = document.getElementById('content');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210; // largeur A4 en mm
    const pageHeight = 297; // hauteur A4 en mm
    const margin = 10; // marge à appliquer

    // @ts-ignore
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('document.pdf');
    });
  }

  ShowDate(date_courente: string, index: number): boolean {
    if (index === 0 || date_courente !== this.date_save) {
      this.date_save = date_courente;
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    let dernier_element = this.session_grndlivre_de_caisse;

    /*if (dernier_element) {
    this.tab_total.push(dernier_element);
  }*/

    this.total_solde = 0;
    //@ts-ignore
    this.total_solde = this.session_grndlivre_de_caisse.reduce(
      (a: any, b: any) => a + b.CU_SOLDE,
      0
    );

    //  •••••••••••••••••••••••••••••••••••••••••• reorganiser le tableau de tel sorte quil soit organise par les dates MC_DATEPIECE ••••••••••••••••••••••••••••••••••••••••••
    // supprimez lelement final du tableau (le tableau des totaux)
    const tableau_sans_totaux = this.session_grndlivre_de_caisse.filter(
      //@ts-ignore
      (item) => !Array.isArray(item)
    );

    // grouper par date
    //@ts-ignore
    const tableau_groupe = tableau_sans_totaux.reduce((result, current) => {
      const cle = `${current.MC_DATEPIECE}-${current.PL_NUMCOMPTE}`;
      if (!result[cle]) {
        result[cle] = [];
      }
      result[cle].push(current);
      return result;
    }, {});

    // transformer en tableau
    const tableau_organise = Object.entries(tableau_groupe).map(
      ([cle, elements]) => {
        const [date, numeroCompte] = cle.split('-');

        // calcul des totaux
        //@ts-ignore
        const total_montant_debit = elements.reduce(
          //@ts-ignore
          (sum, el) => sum + (el.MC_MONTANTDEBIT || 0),
          0
        ); //@ts-ignore
        const total_montant_credit = elements.reduce(
          //@ts-ignore
          (sum, el) => sum + (el.MC_MONTANTCREDIT || 0),
          0
        );
        //@ts-ignore
        /* const total_solde = elements.reduce(
          //@ts-ignore
          (sum, el) => sum + (el.SOLDE || 0),
          0
        ); */

        const total_solde = //@ts-ignore
          elements.length > 0 ? elements[elements.length - 1].SOLDE : 0;
        const solde_final = total_montant_debit - total_montant_credit;

        // ajouter les totaux au bloc
        return [
          date,
          numeroCompte,
          elements,
          {
            total_montant_debit,
            total_montant_credit,
            total_solde,
            solde_final,
          },
        ];
      }
    );
    console.log('tableau_organise', tableau_organise);
    this.session_grndlivre_de_caisse = [];
    this.session_grndlivre_de_caisse = tableau_organise;

    // retirer le .00 dans SOLDEPRECEDENT
    //@ts-ignore
    this.session_grndlivre_de_caisse.forEach((element) => {
      //@ts-ignore
      element[2].forEach((element2) => {
        element2['SOLDEPRECEDENT'] = element2['SOLDEPRECEDENT'].split('.')[0];
      });
    });

    console.log(
      'session_grndlivre_de_caisse',
      this.session_grndlivre_de_caisse
    );
    console.log('tab_total', this.tab_total);
  }
}
/*
ImprimerLetat() {
  window.print();
}
*/
