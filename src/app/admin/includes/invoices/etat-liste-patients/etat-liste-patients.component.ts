import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
@Component({
  selector: 'app-etat-liste-patients',
  templateUrl: './etat-liste-patients.component.html',
  styleUrls: ['./etat-liste-patients.component.scss'],
})
export class EtatListePatientsComponent {
  session_listepatient: any = JSON.parse(
    sessionStorage.getItem('et_listepatient') || '[]'
  );
  _STAT_CODESTATUT: any = '';
  date_save: string | null = null;
  LibelleEtat: any = '';
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
  ImprimerLetat() {
    window.print();
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
    console.log('session_listepatient', this.session_listepatient);
    this.session_listepatient[0]['objetEnvoi']['Objet'][0]['STAT_CODESTATUT'] ==
    '01'
      ? (this._STAT_CODESTATUT = 'ASSURE')
      : (this._STAT_CODESTATUT = 'NON ASSURE');

    if (
      this.session_listepatient[0]['objetEnvoi']['Objet'][0]['TYPEETAT'] ==
      'LTCLTS'
    ) {
      if (
        !this.session_listepatient[0]['objetEnvoi']['Objet'][0][
          'STAT_CODESTATUT'
        ]
      ) {
        this.LibelleEtat =
          'LISTE DES NOUVEAUX PATIENTS DU ' +
          this.session_listepatient[0]['objetEnvoi']['Objet'][0]['DATEDEBUT'] +
          ' AU ' +
          this.session_listepatient[0]['objetEnvoi']['Objet'][0]['DATEFIN'];
      } else {
        this.LibelleEtat = `LISTE DES NOUVEAUX PATIENTS ${this._STAT_CODESTATUT} DU ${this.session_listepatient[0]['objetEnvoi']['Objet'][0]['DATEDEBUT']} AU ${this.session_listepatient[0]['objetEnvoi']['Objet'][0]['DATEFIN']}`;
      }
    } else {
      if (
        !this.session_listepatient[0]['objetEnvoi']['Objet'][0][
          'STAT_CODESTATUT'
        ]
      ) {
        this.LibelleEtat =
          'LISTE DES PATIENTS AU ' +
          this.session_listepatient[0]['objetEnvoi']['Objet'][0]['DATEFIN'];
      } else {
        this.LibelleEtat = `LISTE DES PATIENTS ${this._STAT_CODESTATUT} AU
        ${this.session_listepatient[0]['objetEnvoi']['Objet'][0]['DATEFIN']}`;
      }
    }

    if (
      this.session_listepatient[0]['objetEnvoi']['Objet'][0]['OPTIONTRIE'] ==
      '01'
    ) {
      this.session_listepatient = this._toolsService._trierTableau(
        this.session_listepatient,
        'nom',
        'asc'
      );
    } else {
      this.session_listepatient = this._toolsService._trierTableau(
        this.session_listepatient,
        'numeroDossier',
        'asc'
      );
    }

    console.log('new session_listepatient', this.session_listepatient);
  }
}
