import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AdminService } from '../admin.service';
import { HeaderMenuComponent } from '../includes/header-menu/header-menu.component';
import { SidebarComponent } from '../includes/sidebar/sidebar.component';

@Component({
  selector: 'app-module-extourne-operation',
  templateUrl: './module-extourne-operation.component.html',
  styleUrls: ['./module-extourne-operation.component.scss'],
})
export class ModuleExtourneOperationComponent implements OnInit, AfterViewInit {
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
  tab_extourne: any = [];

  tab_mode: any[] = [
    { code: '01', mode: 'Simple' },
    { code: '02', mode: 'Sms' },
    { code: '03', mode: 'Email' },
  ];
  model_Extourne: any[] = [
    // 0
    {
      id: 'idNumPiece',
      type: 'numerique',
      valeur: '',
      obligatoire: 'O',
      label: 'n° de la pièce',
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idDate',
      type: 'date',
      valeur: '',
      obligatoire: 'O',
      label: 'date de la pièce',
      afficher: true,
      readOnly: true,
    },
  ];
  estNumerique(valeur: any) {
    return /^[0-9]+$/.test(valeur);
  }

  ExtourneLaPiece(tableau_recu: any, table_index: any) {
    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;

    this._loaderService._show();

    let lien_du_service = 'ExtourneOperation';
    if (!this.estNumerique(tableau_recu[0]['valeur'])) {
      this._loaderService._hide();
      this._alertService.WarningAlert(
        'Information!',
        "Merci de saisir uniquement le numéro de la pièce, s'il vous plaît."
      );
      return;
    }

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          MV_DATEPIECECOMPTABILISATION:
            this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          MV_DATEPIECE: tableau_recu[1]['valeur'],
          MV_NUMPIECE1: tableau_recu[0]['valeur'],
          MV_NUMPIECE3: '',
          OP_CODEOPERATEUR: this.session_de_connexion['OP_CODEOPERATEUR'],
          TYPEOPERATION: '1',
          clsObjetEnvoi: {
            OE_A: this.session_de_connexion['AG_CODEAGENCE'],
            OE_J: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
            OE_Y: this.session_de_connexion['OP_CODEOPERATEUR'],
          },
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_extourne = success;

        this._loaderService._hide();
        if (this.tab_extourne['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_extourne['SL_MESSAGE']
          );
        } else {
          this._alertService.SuccessAlert(
            'Succès!',
            this.tab_extourne['SL_MESSAGE']
          );
          this.Initialisation('ReediterLaPiece');
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert('Erreur!', this.tab_extourne['SL_MESSAGE']);
    };
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }
    this.model_Extourne.forEach((element, index) => {
      if (index != 3) element['valeur'] = '';
      else element['valeur'] = '225';
    });
    this.model_Extourne[1]['valeur'] =
      this.session_de_connexion.JT_DATEJOURNEETRAVAIL;
    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ngOnInit(): void {
    this.Initialisation('ngOnInit');
  }

  ngAfterViewInit() {}
}
