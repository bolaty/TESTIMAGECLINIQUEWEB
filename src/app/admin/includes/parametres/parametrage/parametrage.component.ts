import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';
import { HeaderMenuComponent } from '../../header-menu/header-menu.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { InternetStatutService } from 'src/app/services/internet-statut.service';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss'],
})
export class ParametrageComponent implements OnInit {
  constructor(
    public _adminService: AdminService,
    private _router: Router,
    private _alertService: AlertService,
    private _notificationService: NotificationService,
    public _toolsService: ToolsService,
    public _loaderService: LoaderService,
    private _themeService: ThemeService,
    private _headerMenuComponent: HeaderMenuComponent,
    private _sidebarComponent: SidebarComponent,
    private _internetStatutService: InternetStatutService
  ) {}

  en_ligne!: boolean;
  model_parametrage: any[] = [
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
      id: 'idLibelle',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'libellé',
      afficher: true,
      readOnly: true,
    },
    // 2
    {
      id: 'idMontantMin',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant min',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idMontantMax',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant max',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idTaux',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'taux',
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'idMontant',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant',
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idValeur',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'valeur',
      afficher: true,
      readOnly: true,
    },
    // 7
    {
      id: 'idNumCompte',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° compte',
      afficher: true,
      readOnly: true,
    },
    // 8
    {
      id: 'idAfficher',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'afficher',
      afficher: true,
      readOnly: true,
    },
  ];

  EnregistrerParametrage(tableau_recu: any, table_index: any) {
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

    this.Initialisation('EnregistrerParametrage');
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_parametrage.forEach((element, index) => {
      element['valeur'] = '';
    });

    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ngOnInit() {
    /* this._internetStatutService._statut_connexion$.subscribe((status) => {
      this.en_ligne = status;
      if (status) {
        console.log('Connecté à internet');
      } else {
        console.log("Déconnecté d'internet");
      }
    }); */
    this.Initialisation('ngOnInit');
  }
}
