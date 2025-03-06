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
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent {
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
  session_journal_de_caisse: any = JSON.parse(
    sessionStorage.getItem('et_journal') || '[]'
  );

  Telecharger() {
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

  /*exportAllTablesToExcelDerniervesionok(filename: string = 'exported_data.xls'): void {
    // Sélectionner toutes les tables dans le document
    const tables = document.querySelectorAll('table');

    // Vérifier s'il y a des tables
    if (tables.length === 0) {
      console.error('No tables found in the document.');
      return;
    }

    // Créer un contenu HTML combiné pour toutes les tables
    let combinedHTML = '';
    tables.forEach((table) => {
      // Encoder correctement le contenu HTML de la table
      const tableHTML = new XMLSerializer().serializeToString(table);
      combinedHTML += tableHTML + '<br><br>'; // Ajouter un espace entre les tables
    });

    // Définir le type de données
    const dataType = 'application/vnd.ms-excel;charset=UTF-8'; // Ajouter charset=UTF-8
    filename = filename ? `${filename}.xls` : 'excel_data.xls';

    // Créer un lien de téléchargement
    const downloadLink = this.renderer.createElement('a');
    this.renderer.appendChild(document.body, downloadLink);

    // Pour Internet Explorer
    //@ts-ignore
    if (navigator.msSaveOrOpenBlob) {
      // Encoder le contenu en UTF-8 avec BOM (Byte Order Mark)
      const blob = new Blob(['\ufeff', combinedHTML], {
        type: dataType,
      });
      //@ts-ignore
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Pour les autres navigateurs
      // Encoder le contenu en URI
      const encodedHTML = encodeURIComponent(combinedHTML);
      downloadLink.href = `data:${dataType}, ${encodedHTML}`;
      downloadLink.download = filename;
      downloadLink.click();
    }

    // Nettoyer le lien de téléchargement
    this.renderer.removeChild(document.body, downloadLink);
  }*/

  /* exportAllTablesToExcelDerniervesionok(): void {
    // Créer un nouveau classeur Excel
    const wb = XLSX.utils.book_new();
    const wsData: any[] = []; // Tableau pour stocker les données de toutes les tables

    // Sélectionner toutes les tables dans le document
    const tables = document.querySelectorAll('table');

    // Parcourir chaque table et extraire les données
    tables.forEach((table, index) => {
      // Convertir la table HTML en feuille de calcul
      const ws = XLSX.utils.table_to_sheet(table);

      // Ajouter les données de la table au tableau global
      const tableData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      wsData.push(...tableData);

      // Ajouter une ligne vide entre les tables (sauf après la dernière table)
      if (index < tables.length - 1) {
        wsData.push([]);
      }
    });

    // Convertir le tableau global en feuille de calcul
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Ajouter la feuille de calcul au classeur
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Exporter le fichier Excel
    XLSX.writeFile(wb, "exported_data.xlsx");
  }*/

  /* exporterEnExcelmodifmaisok(): void {
    // Créer un nouveau classeur Excel
    const wb = XLSX.utils.book_new();
    const wsData: any[] = []; // Tableau pour stocker les données de toutes les tables

    // Sélectionner toutes les tables dans le document
    const tables = document.querySelectorAll('table');

    // Parcourir chaque table et extraire les données
    tables.forEach((table) => {
      // Convertir la table HTML en tableau de données
      const tableData = XLSX.utils.sheet_to_json(XLSX.utils.table_to_sheet(table), { header: 1 });
      wsData.push(...tableData); // Ajouter les données de la table
      wsData.push([]); // Ajouter une ligne vide entre les tables
    });

    // Convertir les données en feuille Excel
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Appliquer des styles aux cellules
    Object.keys(ws).forEach((cellAddress) => {
      if (ws[cellAddress] && ws[cellAddress].v) {
        // Appliquer un style aux cellules non vides
        ws[cellAddress].s = {
          font: { bold: true, color: { rgb: 'FF0000' } }, // Texte en gras et rouge
          fill: { fgColor: { rgb: 'FFFF00' } }, // Fond jaune
          alignment: { horizontal: 'center' }, // Centrer le texte
        };
      }
    });

    // Ajouter la feuille au classeur
    XLSX.utils.book_append_sheet(wb, ws, 'Journal');

    // Générer le fichier Excel
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Télécharger le fichier
    saveAs(data, 'Journal.xlsx');
  }*/
  /* exporterEnExceldebutmaisok(): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const wsData: any[] = []; // Stocke toutes les données des tableaux

    // Récupérer tous les tableaux présents sur la page
    let tables = document.querySelectorAll("table");

    tables.forEach((table, index) => {
      const tableData = XLSX.utils.sheet_to_json(XLSX.utils.table_to_sheet(table), { header: 1 });

      //wsData.push(["Tableau " + (index + 1)]); // Ajoute un titre pour chaque tableau
      wsData.push(...tableData, []); // Ajoute le contenu du tableau et une ligne vide
    });

    // Création de la feuille Excel avec toutes les données
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Tous les tableaux');

    // 📌 **Ajout des styles aux cellules**
    const range = XLSX.utils.decode_range(ws['!ref'] || '');
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;

        ws[cellAddress].s = {
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } }
          },
          alignment: { vertical: "center", horizontal: "center" },
          font: { name: "Arial", sz: 12 },
        };

        // Appliquer un fond gris aux en-têtes (première ligne de chaque tableau)
        if (R === 0 || (Array.isArray(wsData[R]) && typeof wsData[R][0] === 'string' )) {
          ws[cellAddress].s.fill = { fgColor: { rgb: "D9D9D9" } };
          ws[cellAddress].s.font = { bold: true };
        }
      }
    }

    // Génération et téléchargement du fichier Excel
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'export.xlsx');
  }*/

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
    let dernier_element = this.session_journal_de_caisse;

    /*if (dernier_element) {
      this.tab_total.push(dernier_element);
    }*/

    this.total_solde = 0;
    //@ts-ignore
    /*this.total_solde = this.session_journal_de_caisse.reduce(
      (a: any, b: any) => a + b.CU_SOLDE,
      0
    );*/

    //  •••••••••••••••••••••••••••••••••••••••••• reorganiser le tableau de tel sorte quil soit organise par les dates MC_DATEPIECE ••••••••••••••••••••••••••••••••••••••••••
    // supprimez lelement final du tableau (le tableau des totaux)
    const tableau_sans_totaux = this.session_journal_de_caisse.filter(
      //@ts-ignore
      (item) => !Array.isArray(item)
    );

    // grouper par date
    //@ts-ignore
    const tableau_groupe = tableau_sans_totaux.reduce((result, current) => {
      const cle = `${current.MC_DATEPIECE}-${current.NUMBORDEREAU}`;

      if (!result[cle]) {
        result[cle] = [];
      }
      result[cle].push(current);
      return result;
    }, {});

    // transformer en tableau
    const tableau_organise = Object.entries(tableau_groupe).map(
      ([cle, elements]) => {
        const [date, numBordereau] = cle.split('-');

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
        ); //@ts-ignore
        /*const total_solde = elements.reduce(
          //@ts-ignore
          (sum, el) => sum + (el.CU_SOLDE || 0),
          0
        );*/
        const solde_final = total_montant_debit - total_montant_credit;

        // ajouter les totaux au bloc
        return [
          date,
          numBordereau,
          elements,
          {
            total_montant_debit,
            total_montant_credit,
            // total_solde,
            solde_final,
          },
        ];
      }
    );
    console.log('tableau_organise', tableau_organise);
    this.session_journal_de_caisse = [];
    this.session_journal_de_caisse = tableau_organise;

    //@ts-ignore
    this.session_journal_de_caisse.forEach((element) => {
      //@ts-ignore
      element[2].forEach((element2) => {
        if (element2['MC_HEUREACTION'])
          element2['MC_HEUREACTION'] = this._toolsService._getHeure(
            element2.MC_HEUREACTION,
            'hms'
          );
      });
    });

    console.log('session_journal_de_caisse', this.session_journal_de_caisse);
    console.log('tab_total', this.tab_total);
  }
}
