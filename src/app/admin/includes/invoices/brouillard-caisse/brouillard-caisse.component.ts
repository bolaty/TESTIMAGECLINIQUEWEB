import { Component, OnInit } from '@angular/core';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-brouillard-caisse',
  templateUrl: './brouillard-caisse.component.html',
  styleUrls: ['./brouillard-caisse.component.scss'],
})
export class BrouillardCaisseComponent {
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

  total_solde: any;
  nbre_operation: any = 0;
  nbre_caisse: any = 0;
  nbre_cheque: any = 0;
  nbre_moov: any = 0;
  nbre_mtn: any = 0;
  nbre_orange: any = 0;
  nbre_virement: any = 0;
  nbre_wave: any = 0;
  total_solde_precedent: any;
  total_solde_nouveau: any;
  total_solde_actuel: any;
  liste_temp: any = [];
  tab_total: any = [];
  session_brouillard_de_caisse: any = JSON.parse(
    sessionStorage.getItem('et_brouillard_de_caisse') || '[]'
  );
  Telecharger(){
    window.print()
  }


  Export2WordEXCEL(elementId: string, filename = 'document') {
    let content = document.getElementById(elementId);
    
    if (!content) {
      console.error("Élément introuvable !");
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
      type: 'application/vnd.ms-excel'
    });
  
    let url = URL.createObjectURL(blob);
    let downloadLink = document.createElement("a");
  
    downloadLink.href = url;
    downloadLink.download = filename + ".xls";
  
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
 
  Export2Word(elementId: string, filename = 'document') {
    let content = document.getElementById(elementId);
    
    if (!content) {
      console.error("Élément introuvable !");
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
      type: 'application/msword'
    });

    let url = URL.createObjectURL(blob);
    let downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = filename + ".doc";

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

  ngOnInit(): void {
    //let dernier_element = this.session_brouillard_de_caisse;

    /*if (dernier_element) {
      this.tab_total.push(dernier_element);
    }*/

    this.total_solde = 0;
    //@ts-ignore
    this.total_solde = this.session_brouillard_de_caisse.reduce(
      (a: any, b: any) => a + b.SOLDE,
      0
    );

    this.total_solde_precedent = 0;
    const table: any[] = [];
    table.push(this.session_brouillard_de_caisse[0]);
    //@ts-ignore
    this.total_solde_precedent = table.reduce(
      (a: any, b: any) =>
        a +
        b.SOLDEPRECEDENTCAISSE +
        b.SOLDEPRECEDENTCHEQUE +
        b.SOLDEPRECEDENTMOOV +
        b.SOLDEPRECEDENTMTN +
        b.SOLDEPRECEDENTORANGE +
        b.SOLDEPRECEDENTVIREMENT +
        b.SOLDEPRECEDENTWAVE,
      0
    );

    this.total_solde_nouveau = 0;
    //@ts-ignore
    this.total_solde_nouveau = table.reduce(
      (a: any, b: any) =>
        a +
        b.SOLDENOUVEAUCAISSE +
        b.SOLDENOUVEAUCHEQUE +
        b.SOLDENOUVEAUMOOV +
        b.SOLDENOUVEAUMTN +
        b.SOLDENOUVEAUORANGE +
        b.SOLDENOUVEAUVIREMENT +
        b.SOLDENOUVEAUWAVE,
      0
    );

    this.total_solde_actuel = 0;
    //@ts-ignore
    this.total_solde_actuel = table.reduce(
      (a: any, b: any) =>
        a +
        b.SOLDEACTUELCAISSE +
        b.SOLDEACTUELCHEQUE +
        b.SOLDEACTUELMOOV +
        b.SOLDEACTUELMTN +
        b.SOLDEACTUELORANGE +
        b.SOLDEACTUELVIREMENT +
        b.SOLDEACTUELWAVE,
      0
    );
    //  •••••••••••••••••••••••••••••••••••••••••• reorganiser le tableau de tel sorte quil soit organise par les dates MC_DATEPIECE ••••••••••••••••••••••••••••••••••••••••••
    // supprimez lelement final du tableau (le tableau des totaux)
    const tableau_sans_totaux = this.session_brouillard_de_caisse.filter(
      //@ts-ignore
      (item) => !Array.isArray(item)
    );

    // grouper par date
    //@ts-ignore
    const tableau_groupe = tableau_sans_totaux.reduce((result, current) => {
      const date = current.MC_DATEPIECE;
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(current);
      return result;
    }, {});

    // transformer en tableau
    const tableau_organise = Object.entries(tableau_groupe).map(
      ([date, elements]) => {
        // Trier les éléments par MC_NUMPIECE en ordre croissant
        //@ts-ignore
        /*  elements.sort((a, b) => {
          const refA = parseInt(a.MC_NUMPIECE, 10); // conversion en entier
          const refB = parseInt(b.MC_NUMPIECE, 10); // conversion en entier

          if (refA < refB) return -1; // place a avant b
          if (refA > refB) return 1; // place b avant a
          return 0; // laisse l'ordre inchangé
        }); */

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
        const total_solde = elements.reduce(
          //@ts-ignore
          (sum, el) => sum + (el.CU_SOLDE || 0),
          0
        );
        //@ts-ignore
        const solde_final = elements[elements.length - 1]['SOLDE'];

        // ajouter les totaux au bloc
        return [
          date,
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
    this.session_brouillard_de_caisse = [];
    this.session_brouillard_de_caisse = tableau_organise;

    // retirer le .00 dans CU_SOLDEPRECEDENT
    //@ts-ignore
    /* this.session_brouillard_de_caisse.forEach((element) => {
      //@ts-ignore
      element[1].forEach((element2) => {
        element2['SOLDEPRECEDENTOPERATION'] =
          element2['SOLDEPRECEDENTOPERATION'].split('.')[0];
      });
    });*/

    this.nbre_operation = 0;
    this.nbre_caisse = 0;
    this.nbre_cheque = 0;
    this.nbre_moov = 0;
    this.nbre_mtn = 0;
    this.nbre_orange = 0;
    this.nbre_virement = 0;
    this.nbre_wave = 0;
    //@ts-ignore
    this.session_brouillard_de_caisse.forEach((element) => {
      this.nbre_operation = this.nbre_operation + element[1].length;
      //@ts-ignore
      element[1].forEach((element2) => {
        if (element2['MR_CODEMODEREGLEMENT'] == '001') this.nbre_caisse += 1;
        if (element2['MR_CODEMODEREGLEMENT'] == '002') this.nbre_mtn += 1;
        if (element2['MR_CODEMODEREGLEMENT'] == '003') this.nbre_moov += 1;
        if (element2['MR_CODEMODEREGLEMENT'] == '004') this.nbre_orange += 1;
        if (element2['MR_CODEMODEREGLEMENT'] == '005') this.nbre_wave += 1;
        if (element2['MR_CODEMODEREGLEMENT'] == '006') this.nbre_cheque += 1;
        if (element2['MR_CODEMODEREGLEMENT'] == '007') this.nbre_virement += 1;
      });
    });

    console.log(
      'session_brouillard_de_caisse',
      this.session_brouillard_de_caisse
    );
    console.log('tab_total', this.tab_total);
  }
}
/*
ImprimerLetat() {
    window.print();
  }
*/
