import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-entete-recu',
  templateUrl: './entete-recu.component.html',
  styleUrls: ['./entete-recu.component.scss'],
})
export class EnteteRecuComponent {
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _alertService: AlertService,
    private _notificationService: NotificationService,
    public _toolsService: ToolsService,
    public _loaderService: LoaderService
  ) {}

  @Input() title: string = '';
  @Input() periode_du: string = '';
  @Input() periode_au: string = '';
  @Input() numero_bordereau: any = '';
  @Input() show_agent_immo_agree: boolean = true;
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
  heure_d_edition: any = this._toolsService._avoirLaDateDuJour('h');

  ngOnInit(): void {}
}
