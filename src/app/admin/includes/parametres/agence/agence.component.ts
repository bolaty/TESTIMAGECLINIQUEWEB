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

declare var $: any;

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss'],
})
export class AgenceComponent {
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
  _SO_CODESOCIETE: any;
  tab_enregistrement_agence: any = [];
  tab_liste_gerant: any = [];
  tab_liste_ville: any = [];
  tab_liste_agence: any = [];
  tab_liste_pays: any = [];

  model_agence: any[] = [
    // 0
    {
      id: 'idCodeAgence',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'code agence',
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idRaisonSociale',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'raison sociale',
      afficher: true,
      readOnly: true,
    },
    // 2
    {
      id: 'idDateCreation',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de création',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idNumAgrement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° agrement',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idGerant',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'gérant',
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'idBoitePostale',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'boite postale',
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idPays',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'pays',
      afficher: true,
      readOnly: true,
    },
    // 7
    {
      id: 'idVille',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'ville',
      afficher: true,
      readOnly: true,
    },
    // 8
    {
      id: 'idAdresseGeographique',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'adrèsse géographique',
      afficher: true,
      readOnly: true,
    },
    // 9
    {
      id: 'idContact',
      type: 'telephone_extra_2',
      valeur: '',
      obligatoire: 'N',
      label: 'téléphone',
      afficher: true,
      readOnly: true,
    },
    // 10
    {
      id: 'idFax',
      type: 'telephone_extra',
      valeur: '',
      obligatoire: 'N',
      label: 'fax',
      afficher: true,
      readOnly: true,
    },
    // 11
    {
      id: 'idEmail',
      type: 'email',
      valeur: '',
      obligatoire: 'N',
      label: 'email',
      afficher: true,
      readOnly: true,
    },
    // 12
    {
      id: 'idMotDePasse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mot de passe',
      afficher: true,
      readOnly: true,
    },
    // 13
    {
      id: 'idRepeterMotDePasse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'repeter le mot de passe',
      afficher: true,
      readOnly: true,
    },
    // 14
    {
      id: 'idCpteCompensSiege',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Cpte compens. siège',
      afficher: true,
      readOnly: true,
    },
    // 15
    {
      id: 'idCpteCompensLiaison',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Cpte compens. liaison',
      afficher: true,
      readOnly: true,
    },
    // 16
    {
      id: 'idEmailEmeteur',
      type: 'email',
      valeur: '',
      obligatoire: 'N',
      label: 'Email emeteur',
      afficher: true,
      readOnly: true,
    },
    // 17
    {
      id: 'idContactEmeteur',
      type: 'telephone_extra',
      valeur: '',
      obligatoire: 'N',
      label: 'Contact emeteur',
      afficher: true,
      readOnly: true,
    },
  ];

  EnregistrerAgence(tableau_recu: any, table_index: any) {
    // @ts-ignore
    tableau_recu.forEach((element) => {
      if (element['valeur'] == undefined) element['valeur'] = '';
    });

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
    if (
      !this._toolsService._contrainteTypeDeDonneeChampNonObligatoire(
        tableau_recu
      )
    )
      return;

    this._loaderService._show();
    let tab_contact;
    let tab_email;

    let lien_du_service = 'modifier_agence';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: tableau_recu[0]['valeur'],
          SO_CODESOCIETE: this._SO_CODESOCIETE,
          AG_RAISONSOCIAL: tableau_recu[1]['valeur'],
          AG_DATECREATION: tableau_recu[2]['valeur'],
          AG_NUMEROAGREMENT: tableau_recu[3]['valeur'],
          OP_CODEOPERATEUR: tableau_recu[4]['valeur'],
          AG_BOITEPOSTAL: tableau_recu[5]['valeur'],
          VL_CODEVILLE: tableau_recu[7]['valeur'],
          AG_ADRESSEGEOGRAPHIQUE: tableau_recu[8]['valeur'],
          AG_TELEPHONE: tableau_recu[17]['valeur'],
          AG_EMAIL: tableau_recu[16]['valeur'],
          AG_EMAILMOTDEPASSE: tableau_recu[13]['valeur'],
          TYPEOPERATION: '1',
          AG_EMAIL_DESTI: [],
          AG_TELEPHONE_DESTI: [],
        },
      ],
    };

    if (tableau_recu[9]['valeur'].includes('/')) {
      tab_contact = tableau_recu[9]['valeur'].split('/');
      console.log('tab_contact', tab_contact);
      body['Objet'][0]['AG_TELEPHONE_DESTI'] = tab_contact;
    } else {
      body['Objet'][0]['AG_TELEPHONE_DESTI'] = tableau_recu[9]['valeur'];
    }
    if (tableau_recu[11]['valeur'].includes('/')) {
      tab_email = tableau_recu[11]['valeur'].split('/');
      console.log('tab_email', tab_email);
      body['Objet'][0]['AG_EMAIL_DESTI'] = tab_email;
    } else {
      body['Objet'][0]['AG_EMAIL_DESTI'] = tableau_recu[11]['valeur'];
    }

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success: any) => {
        this.tab_enregistrement_agence = success;
        this._loaderService._hide();
        if (this.tab_enregistrement_agence['SL_RESULTAT'] == 'TRUE') {
          this._alertService.SuccessAlert(
            'Succès!',
            this.tab_enregistrement_agence['SL_MESSAGE']
          );
          $('#centermodal').modal('hide');
          this.Initialisation('EnregistrerAgence');
        } else {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_enregistrement_agence['SL_MESSAGE']
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'Veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_agence.forEach((element, index) => {
      element['valeur'] = '';
    });

    if (method == 'EnregistrerAgence') {
      this.ListeDesAgences();
    }

    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ListeDesAgences() {
    this._loaderService._show();

    let lien_du_service = 'liste_agence';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_agence = success;

        this._loaderService._hide();
        if (this.tab_liste_agence[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_agence['SL_MESSAGE']
          );
        } else {
          this.tab_liste_agence = this.tab_liste_agence[1];
          console.log('tab_liste_agence', this.tab_liste_agence);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_agence['SL_MESSAGE']
      );
    };
  }

  ChargerComboPays() {
    let lien_du_service = 'pays';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_pays = success;

        this._loaderService._hide();

        if (this.tab_liste_pays[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_pays['SL_MESSAGE']
          );
        } else {
          this.tab_liste_pays = this.tab_liste_pays[1];

          console.log('tab_liste_pays', this.tab_liste_pays);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_pays['SL_MESSAGE']
      );
    };
  }

  ChargerComboVille(_PY_CODEPAYS: any) {
    let lien_du_service = 'ville';

    let body = {
      Objet: [
        {
          PY_CODEPAYS: _PY_CODEPAYS,
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_ville = success;

        this._loaderService._hide();

        if (this.tab_liste_ville[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_ville['SL_MESSAGE']
          );
        } else {
          this.tab_liste_ville = this.tab_liste_ville[1];

          console.log('tab_liste_ville', this.tab_liste_ville);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_ville['SL_MESSAGE']
      );
    };
  }

  ChargerComboGerant() {
    let lien_du_service = 'pvgComboOperateur';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          OP_CODEOPERATEUR: '',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_gerant = success;

        this._loaderService._hide();

        if (this.tab_liste_gerant[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_gerant['SL_MESSAGE']
          );
        } else {
          this.tab_liste_gerant = this.tab_liste_gerant[1];

          console.log('tab_liste_gerant', this.tab_liste_gerant);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_gerant['SL_MESSAGE']
      );
    };
  }

  AllerAModifierAgence(info_agence: any) {
    this.model_agence[0]['valeur'] = info_agence['AG_CODEAGENCE']; // code agence
    this.model_agence[1]['valeur'] = info_agence['AG_RAISONSOCIAL']; // raison sociale
    this.model_agence[2]['valeur'] = info_agence['AG_DATECREATION']; // date creation
    this.model_agence[3]['valeur'] = info_agence['AG_NUMEROAGREMENT']; // num agrement
    this.model_agence[4]['valeur'] = info_agence['OP_CODEOPERATEUR']; // gerant
    this.model_agence[5]['valeur'] = info_agence['AG_BOITEPOSTAL']; // boite postale
    this.model_agence[6]['valeur'] = ''; // pays
    this.model_agence[7]['valeur'] = info_agence['VL_CODEVILLE']; // ville
    this.model_agence[8]['valeur'] = info_agence['AG_ADRESSEGEOGRAPHIQUE']; // adresse geo
    this.model_agence[12]['valeur'] = info_agence['AG_EMAILMOTDEPASSE']; // mot de passe
    this.model_agence[13]['valeur'] = info_agence['AG_EMAILMOTDEPASSE']; // repeter mot de passe
    this.model_agence[16]['valeur'] = info_agence['AG_EMAIL']; // email emetteur
    this.model_agence[17]['valeur'] = info_agence['AG_TELEPHONE']; // contact emetteur
    this._SO_CODESOCIETE = info_agence['SO_CODESOCIETE']; // _SO_CODESOCIETE

    // extraction des valeurs renseignées
    const telephones = [
      info_agence['AG_TELEPHONEDESTI1'],
      info_agence['AG_TELEPHONEDESTI2'],
      info_agence['AG_TELEPHONEDESTI3'],
      info_agence['AG_TELEPHONEDESTI4'],
      info_agence['AG_TELEPHONEDESTI5'],
    ].filter((tel) => tel);
    this.model_agence[9]['valeur'] = telephones.join('/'); // contact destinataire

    // extraction des valeurs renseignées
    const emails = [
      info_agence['AG_EMAILDESTI1'],
      info_agence['AG_EMAILDESTI2'],
      info_agence['AG_EMAILDESTI3'],
      info_agence['AG_EMAILDESTI4'],
      info_agence['AG_EMAILDESTI5'],
    ].filter((email) => email);
    this.model_agence[11]['valeur'] = emails.join('/'); // email destinataire

    // @ts-ignore
    this.tab_liste_ville.forEach((element) => {
      if (element['VL_CODEVILLE'] == info_agence['VL_CODEVILLE']) {
        this.model_agence[6]['valeur'] = element['PY_CODEPAYS']; // pays
      }
    });

    $('#centermodal').modal('show');
  }

  ngOnInit(): void {
    this.ListeDesAgences();
    this.ChargerComboPays();
    this.ChargerComboGerant();
    this.ChargerComboVille('0001'); // le code de la civ par defaut • parametrable
    this.Initialisation('ngOnInit');
  }
}
