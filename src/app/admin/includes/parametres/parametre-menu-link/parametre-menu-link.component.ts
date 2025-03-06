import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';
import { HeaderMenuComponent } from '../../header-menu/header-menu.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-parametre-menu-link',
  templateUrl: './parametre-menu-link.component.html',
  styleUrls: ['./parametre-menu-link.component.scss'],
})
export class ParametreMenuLinkComponent implements OnInit, AfterViewInit {
  constructor(
    public _adminService: AdminService,
    private _router: Router,
    private _alertService: AlertService,
    private _notificationService: NotificationService,
    public _toolsService: ToolsService,
    public _loaderService: LoaderService,
    private _themeService: ThemeService,
    private _headerMenuComponent: HeaderMenuComponent,
    private _sidebarComponent: SidebarComponent
  ) {}

  id_el: any = 'idOperateur';
  @Input() op_actif: any = '';
  @Input() ag_actif: any = '';
  @Input() pro_actif: any = '';
  @Input() service_actif: any = '';
  @Input() jt_actif: any = '';
  @Input() lg_actif: any = '';
  @Input() param_actif: any = '';

  ChoixDeLongletParam(id_el: any) {
    switch (id_el) {
      case 'idOperateur':
        this._router.navigate(['/admin/parametres/creation_operateur']);
        break;
      case 'idAgence':
        this._router.navigate(['/admin/parametres/agence']);
        break;
      case 'idProfil':
        this._router.navigate(['/admin/parametres/profil']);
        break;
      case 'idService':
        this._router.navigate(['/admin/parametres/service']);
        break;
      case 'idJourneeTravail':
        this._router.navigate(['/admin/parametres/journee_de_travail']);
        break;
      case 'idLangues':
        this._router.navigate(['/admin/parametres/langues']);
        break;
      case 'idParametrage':
        this._router.navigate(['/admin/parametres/parametrages']);
        break;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
