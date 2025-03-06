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
  selector: 'app-creation-profil',
  templateUrl: './creation-profil.component.html',
  styleUrls: ['./creation-profil.component.scss'],
})
export class CreationProfilComponent {
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

  ListeProfil: any[] = [];
  codeProfil: any = '';
  SessionInfoProfil: any = [];
  // Texte de recherche
  searchText: string = '';
  ligneselect: any = '';
  // Liste filtrée
  filteredeProfil = [...this.ListeProfil];
  ecran_affiche: any = 'liste'; // permet le basculement entre la liste et lenregistrement
  model_profil: any[] = [
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
      id: 'idNomProfil',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom du profil',
      afficher: true,
      readOnly: true,
    },
  ];

  chargementListeProfil() {
    let Option = 'liste_profil';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeProfil = success;
        if (this.ListeProfil[0].SL_RESULTAT == 'TRUE') {
          this.ListeProfil = this.ListeProfil[1];
          this.filteredeProfil = [...this.ListeProfil];
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ListeProfil[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  // Méthode pour filtrer les données
  applyFilter(): void {
    const lowerSearchText = this.searchText.toLowerCase();
    this.filteredeProfil = this.ListeProfil.filter((operateur) =>
      Object.values(operateur).some(
        (
          value //@ts-ignore
        ) => value.toString().toLowerCase().includes(lowerSearchText)
      )
    );
  }

  saveInfo(info: any) {
    this.SessionInfoProfil = info;
  }
  AllerA(ecran: any) {
    this.codeProfil = '';
    this.Initialisation('EnregistrerProfil');
    if (ecran == 'modif') {
      // Réaffectation des valeurs dans `this.model_operateur`
      this.codeProfil = this.SessionInfoProfil.PO_CODEPROFIL;
      this.model_profil[0]['valeur'] = this.SessionInfoProfil.PO_CODEPROFIL;
      this.model_profil[1]['valeur'] = this.SessionInfoProfil.PO_LIBELLE;
    }
    this.ecran_affiche = ecran;
  }
  onMenuClick(event: Event): void {
    event.preventDefault(); // Empêche la redirection naturelle
    // Tu peux ajouter d'autres actions ici si nécessaire
  }
  delete() {
    this._loaderService._show();

    let Option = 'delete_profil';

    let body = {
      Objet: [
        {
          PO_CODEPROFIL: this.SessionInfoProfil.PO_CODEPROFIL,
        },
      ],
    };
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.SessionInfoProfil = success;
        this._loaderService._hide();
        if (this.SessionInfoProfil.SL_RESULTAT == 'TRUE') {
          this._alertService.WarningAlert(
            'Information!',
            this.SessionInfoProfil.SL_MESSAGE
          );
          this.ecran_affiche = 'liste';
          this.chargementListeProfil();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.SessionInfoProfil.SL_MESSAGE
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  EnregistrerProfil(tableau_recu: any, table_index: any) {
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

    let Option =
      this.ecran_affiche == 'modif' ? 'update_profil' : 'creation_profil';

    let body = {
      Objet: [
        {
          PO_CODEPROFIL: this.ecran_affiche == 'modif' ? this.codeProfil : '',
          PO_LIBELLE: this.model_profil[1]['valeur'],
          clsObjetEnvoi: {
            OE_A: this.session_de_connexion['AG_CODEAGENCE'],
            OE_J: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
            OE_Y: this.session_de_connexion['OP_CODEOPERATEUR'],
          },
        },
      ],
    };
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.SessionInfoProfil = success;
        if (this.SessionInfoProfil.SL_RESULTAT == 'TRUE') {
          this._alertService.WarningAlert(
            'Information!',
            this.SessionInfoProfil.SL_MESSAGE
          );
          this.Initialisation('EnregistrerProfil');
          this.ecran_affiche = 'liste';
          this.chargementListeProfil();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.SessionInfoProfil.SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_profil.forEach((element, index) => {
      element['valeur'] = '';
    });

    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ngOnInit(): void {
    this.Initialisation('ngOnInit');
    this.chargementListeProfil();
  }
}
