import { Component } from '@angular/core';
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
  selector: 'app-email-contact',
  templateUrl: './email-contact.component.html',
  styleUrls: ['./email-contact.component.scss'],
})
export class EmailContactComponent {
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

  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  ecran_affiche: any = 'liste'; // permet le basculement entre la liste et lenregistrement
  model_service: any[] = [
    // 0
    {
      id: 'idCode',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'code',
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idNomService',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom du service',
      afficher: true,
      readOnly: true,
    },
  ];

  EnregistrerService(tableau_recu: any, table_index: any) {
    // @ts-ignore
    tableau_recu.forEach((element) => {
      element['obligatoire'] = 'N';
    });

    // @ts-ignore
    table_index.forEach((element) => {
      tableau_recu[element]['obligatoire'] = 'O';
    });

    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;

    this._loaderService._show();
    alert('enregistré avec succès');

    this.Initialisation('EnregistrerService');
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_service.forEach((element, index) => {
      element['valeur'] = '';
    });

    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  AllerA(ecran: any) {
    this.ecran_affiche = ecran;
  }

  ngOnInit(): void {
    this.Initialisation('ngOnInit');
  }
}
