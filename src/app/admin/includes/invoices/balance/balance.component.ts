import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
  constructor(
    public _toolsService: ToolsService,
    public _adminService: AdminService,
    public _alertService: AlertService,
    public _loaderService: LoaderService,
    private _themeService: ThemeService
  ) {}

  total_ecart_1: any = 0;
  total_ecart_2: any = 0;
  total_ecart_3: any = 0;
  total_result_net_pro_1: any = 0;
  total_result_net_pro_2: any = 0;
  total_result_net_pro_3: any = 0;
  session_brouillard_de_caisse: any = JSON.parse(
    sessionStorage.getItem('et_balance') || '[]'
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
    this.total_ecart_1 =
      this.session_brouillard_de_caisse[0].TOTALMOUVEMENTPRECEDENTDEBIT -
      this.session_brouillard_de_caisse[0].TOTALMOUVEMENTPRECEDENTCREDIT;
    this.total_ecart_2 =
      this.session_brouillard_de_caisse[0].TOTALMOUVEMENTPERIODEDEBIT -
      this.session_brouillard_de_caisse[0].TOTALMOUVEMENTPERIODECREDIT;
    this.total_ecart_3 =
      this.session_brouillard_de_caisse[0].TOTALSOLDEPERIODEDEBIT -
      this.session_brouillard_de_caisse[0].TOTALSOLDEPERIODECREDIT;

    this.total_result_net_pro_1 =
      this.session_brouillard_de_caisse[0].TOTALCHARGEPRECEDENT +
      this.session_brouillard_de_caisse[0].TOTALPRODUITPRECEDENT;
    this.total_result_net_pro_2 =
      this.session_brouillard_de_caisse[0].TOTALCHARGEENCOURS +
      this.session_brouillard_de_caisse[0].TOTALPRODUITENCOURS;
    this.total_result_net_pro_3 =
      this.session_brouillard_de_caisse[0].TOTALCHARGEFINAL +
      this.session_brouillard_de_caisse[0].TOTALPRODUITFINAL;
  }
}
