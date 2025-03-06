import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-entete-invoice',
  templateUrl: './entete-invoice.component.html',
  styleUrls: ['./entete-invoice.component.scss'],
})
export class EnteteInvoiceComponent {
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _alertService: AlertService,
    private _notificationService: NotificationService,
    public _toolsService: ToolsService,
    public _loaderService: LoaderService
  ) {}
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  @Input() title: string = '';
  @Input() periode_du: string = '';
  @Input() periode_au: string = '';
  @Input() numero_bordereau: any = [];
  @Input() show_agent_immo_agree: boolean = true;
  dateEdition: any;
  date_d_edition_jour: any = this._toolsService
    ._avoirLaDateDuJour('j')
    .split('-')[1];
  date_d_edition_numero_jour: any = this._toolsService
    ._avoirLaDateDuJour('j')
    .split('-')[0];
  date_d_edition_mois: any = this._toolsService
    ._avoirLaDateDuJour('m')
    .split('-')[1];
  date_d_edition_annee: any = this._toolsService._avoirLaDateDuJour('a');
  getFormattedDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    this.dateEdition = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  ImprimerLetat() {
    window.print();
  }

  ngOnInit(): void {
    this.getFormattedDate();
  }
}
