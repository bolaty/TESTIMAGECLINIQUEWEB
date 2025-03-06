import { Component } from '@angular/core';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
@Component({
  selector: 'app-etat-formation',
  templateUrl: './etat-formation.component.html',
  styleUrls: ['./etat-formation.component.scss'],
})
export class EtatFormationComponent {
  total: any = 0;
  recup_session: any = sessionStorage.getItem('etatform') || '';
  session_formation: any[] = JSON.parse(
    sessionStorage.getItem('et_formation_charge_produit') || '[]'
  );
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
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

  ngOnInit(): void {
    this.session_formation.forEach((element) => {
      // element['MC_MONTANTNET'] = +element['MC_MONTANTNET'].split('.')[0];
      element['MC_MONTANT'] = +element['MC_MONTANT'].split('.')[0];
    });

    /* this.total = this.session_formation.reduce(
      (acc: any, curVal: any) => acc + curVal.MC_MONTANT,
      0
    ); */

    this.total = this.session_formation
      .filter((item: any) => item.PL_TYPECOMPTE === 'I')
      .reduce((acc: number, curVal: any) => acc + curVal.MC_MONTANT, 0);

    console.log('session_formation', this.session_formation);
  }
}
