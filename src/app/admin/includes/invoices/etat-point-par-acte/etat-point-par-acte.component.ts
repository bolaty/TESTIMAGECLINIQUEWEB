import { Component } from '@angular/core';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
@Component({
  selector: 'app-etat-point-par-acte',
  templateUrl: './etat-point-par-acte.component.html',
  styleUrls: ['./etat-point-par-acte.component.scss'],
})
export class EtatPointParActeComponent {
  total: any = 0;
  session_point_par_acte: any[] = JSON.parse(
    sessionStorage.getItem('et_point_par_acte') || '[]'
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
    this.session_point_par_acte.forEach((element) => {
      element['MONTANT'] = +element['MONTANT'].split('.')[0];
    });

    this.total = this.session_point_par_acte.reduce(
      (acc: any, curVal: any) => acc + curVal.MONTANT,
      0
    );

    console.log('session_point_par_acte', this.session_point_par_acte);
  }
}
