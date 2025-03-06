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
  selector: 'app-module-reedition',
  templateUrl: './module-reedition.component.html',
  styleUrls: ['./module-reedition.component.scss'],
})
export class ModuleReeditionComponent implements OnInit, AfterViewInit {
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
  tab_reedition: any = [];

  tab_mode: any[] = [
    { code: '01', mode: 'Simple' },
    { code: '02', mode: 'Sms' },
    { code: '03', mode: 'Email' },
  ];
  model_reedition: any[] = [
    // 0
    {
      id: 'idMode',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mode de réédition',
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idNumPiece',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° de la pièce',
      afficher: true,
      readOnly: true,
    },
    // 2
    {
      id: 'idDate',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de la pièce',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idContact',
      type: 'telephone_extra',
      valeur: '',
      obligatoire: 'N',
      label: 'contact',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idEmail',
      type: 'email',
      valeur: '',
      obligatoire: 'N',
      label: 'email',
      afficher: true,
      readOnly: true,
    },
  ];

  ReediterLaPiece(tableau_recu: any, table_index: any) {
    // @ts-ignore
    tableau_recu.forEach((element) => {
      element['obligatoire'] = 'N';
    });

    // ajout de champ obligatoire dynamique
    if (tableau_recu[0]['valeur'] == '01') {
      table_index.push(1, 2);
    } else if (tableau_recu[0]['valeur'] == '02') {
      table_index.push(1, 2, 3);
    } else {
      table_index.push(1, 2, 4);
    }

    // @ts-ignore
    table_index.forEach((element) => {
      tableau_recu[element]['obligatoire'] = 'O';
    });

    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;

    if (tableau_recu[1]['valeur'].length != 19) {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez renseigner l'intégralité de la pièce.`
      );
      return;
    }

    this._loaderService._show();

    let lien_du_service = 'reedition';

    let _TYPEOPERATION = '';
    if (tableau_recu[0]['valeur'] == '01') {
      // cas de la reedition simple
      _TYPEOPERATION = '0';
    } else if (tableau_recu[0]['valeur'] == '02') {
      // cas de la reedition par sms
      _TYPEOPERATION = '1';
    } else {
      // cas de la reedition par email
      _TYPEOPERATION = '2';
    }

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          MC_DATEPIECE: tableau_recu[2]['valeur'],
          NUMEROBORDEREAU: tableau_recu[1]['valeur'],
          CONTACT_DESTI: tableau_recu[3]['valeur'],
          EMAIL_DESTI: tableau_recu[4]['valeur'],
          TYPEOPERATION: _TYPEOPERATION,
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_reedition = success;

        this._loaderService._hide();
        if (this.tab_reedition['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_reedition['SL_MESSAGE']
          );
        } else {
          this.tab_reedition = this.tab_reedition[1];

          if (tableau_recu[0]['valeur'] == '01') {
            // cas de la reedition simple
            this.Initialisation('ReediterLaPiece');
            sessionStorage.setItem(
              'recu_operation',
              JSON.stringify(this.tab_reedition)
            );
            window.open('/admin/invoice/recu', '_blank');
          } else if (tableau_recu[0]['valeur'] == '02') {
            // cas de la reedition par sms
            this.Initialisation('ReediterLaPiece');
            this._alertService.SuccessAlert(
              'Succès!',
              this.tab_reedition[0]['MESSAGE']
            );
          } else {
            // cas de la reedition par email
            this.Initialisation('ReediterLaPiece');
            this._alertService.SuccessAlert(
              'Succès!',
              this.tab_reedition[0]['MESSAGE']
            );
          }

          console.log('tab_reedition', this.tab_reedition);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_reedition['SL_MESSAGE']
      );
    };
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }
    this.model_reedition.forEach((element, index) => {
      if (index != 3) element['valeur'] = '';
      else element['valeur'] = '225';
    });
    this.model_reedition[2]['valeur'] = this.session_de_connexion.JT_DATEJOURNEETRAVAIL
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
