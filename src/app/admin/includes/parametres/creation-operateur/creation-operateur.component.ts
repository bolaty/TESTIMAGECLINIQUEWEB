import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  selector: 'app-creation-operateur',
  templateUrl: './creation-operateur.component.html',
  styleUrls: ['./creation-operateur.component.scss'],
})
export class CreationOperateurComponent implements OnInit, AfterViewInit {
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
  ComboNumCompte: any[] = [];
  ComboNumCompteStock: any[] = [];
  ComboService: any[] = [];
  ComboProfil: any[] = [];
  RetourEnregistrement: any = [];
  RetourListeOperateur: any[] = [];
  SessionInfoUtilisateur: any = {};
  codeOperateur: any = '';
  ecran_affiche: any = 'liste'; // permet le basculement entre la liste et lenregistrement
  // Texte de recherche
  searchText: string = '';
  ligneselect: any = '';
  // Liste filtrée
  filteredOperateurs = [...this.RetourListeOperateur];
  model_operateur: any[] = [
    // 0
    {
      id: 'idNomPrenoms',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom et prénoms',
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idPrenoms',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'prénoms',
      afficher: true,
      readOnly: true,
    },
    // 2
    {
      id: 'idContact',
      type: 'telephone_extra',
      valeur: '',
      obligatoire: 'N',
      label: 'contact',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idEmail',
      type: 'email',
      valeur: '',
      obligatoire: 'N',
      label: 'email',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idService',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'service',
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'file',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'avatar',
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idStatut',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'statut',
      afficher: false,
      readOnly: true,
    },
    // 7
    {
      id: 'idProfil',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'profil',
      afficher: false,
      readOnly: true,
    },
    // 8
    {
      id: 'idCompteCaisse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'compte caisse',
      afficher: false,
      readOnly: true,
    },
    // 9
    {
      id: 'idCompteCoffre',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'compte coffre',
      afficher: false,
      readOnly: true,
    },
    // 10
    {
      id: 'idSortieProv',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'sortie provisoire',
      afficher: false,
      readOnly: true,
    },
    // 11
    {
      id: 'idCompteWave',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'compte Wave',
      afficher: false,
      readOnly: true,
    },
    // 12
    {
      id: 'idCompteMtn',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'compte MTN',
      afficher: false,
      readOnly: true,
    },
    // 13
    {
      id: 'idCompteOrange',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'compte Orange',
      afficher: false,
      readOnly: true,
    },
    // 14
    {
      id: 'idCompteMoov',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'compte Moov',
      afficher: false,
      readOnly: true,
    },
    // 15
    {
      id: 'idCompteCheque',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'compte chèque',
      afficher: false,
      readOnly: true,
    },
    // 16
    {
      id: 'idCompteVirement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'compte virement',
      afficher: false,
      readOnly: true,
    },
  ];
  accountNames = {
    PL_CODENUMCOMPTECAISSE: 'COMPTE CAISSE',
    PL_CODENUMCOMPTECHEQUE: 'COMPTE CHÈQUE',
    PL_CODENUMCOMPTECOFFRE: 'COMPTE COFFRE',
    PL_CODENUMCOMPTEMOOV: 'COMPTE MOOV',
    PL_CODENUMCOMPTEMTN: 'COMPTE MTN',
    PL_CODENUMCOMPTEORANGE: 'COMPTE ORANGE',
    PL_CODENUMCOMPTEPROVISOIRE: 'COMPTE PROVISOIRE',
    PL_CODENUMCOMPTEVIREMENT: 'COMPTE VIREMENT',
    PL_CODENUMCOMPTEWAVE: 'COMPTE WAVE',
  };
  chargementListeOperateur() {
    let Option = 'liste_operateur_par_type';
    let body = {
      Objet: [
        {
          OP_CODEOPERATEUR: '',
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PO_CODEPROFIL: '',
          SR_CODESERVICE: '',
          OP_NOMBRECONNEXION: '',
          TYPEOPERATION: '',
        },
      ],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.RetourListeOperateur = success;
        if (this.RetourListeOperateur[0].SL_RESULTAT == 'TRUE') {
          this.RetourListeOperateur = this.RetourListeOperateur[1];

          this.filteredOperateurs = [...this.RetourListeOperateur];
        } else {
          this._alertService.WarningAlert(
            'Information!',
            this.RetourListeOperateur[0].SL_RESULTAT
          );
        }
      },
      (error) => {
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
    this.filteredOperateurs = this.RetourListeOperateur.filter((operateur) =>
      Object.values(operateur).some(
        (
          value //@ts-ignore
        ) => value.toString().toLowerCase().includes(lowerSearchText)
      )
    );
  }

  chargementComboNumCompteinit() {
    this.ComboNumCompte = [];
    let Option = 'pvgComboCompte';
    let body = {
      Objet: [
        {
          SO_CODESOCIETE: this.session_de_connexion['SO_CODESOCIETE'], //"0001",//a remplacer dynamiquement
          PL_NUMCOMPTE: '',
          PL_TYPECOMPTE: 'I', //"I" a modifier selon bly
        },
      ],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboNumCompte = success;
        if (this.ComboNumCompte[0].SL_RESULTAT == 'TRUE') {
          this.ComboNumCompteStock = this.ComboNumCompte[1];
          this.ComboNumCompte = this.ComboNumCompte[1];

          this._loaderService._hide();
          this.chargementComboService();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboNumCompte[0].SL_RESULTAT
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

  chargementComboService() {
    this.ComboService = [];
    let Option = 'liste_service';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboService = success;
        if (this.ComboService[0].SL_RESULTAT == 'TRUE') {
          this.ComboService = this.ComboService[1];
          this.chargementComboProfil();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboService[0].SL_RESULTAT
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

  chargementComboProfil() {
    this.ComboProfil = [];
    let Option = 'liste_profil';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboProfil = success;
        if (this.ComboProfil[0].SL_RESULTAT == 'TRUE') {
          this.ComboProfil = this.ComboProfil[1];
          this.chargementListeOperateur();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboProfil[0].SL_RESULTAT
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

  chargementComboNumCompte(NUMCOMPTE: any) {
    this.ComboNumCompte = [];
    let Option = 'pvgComboCompte';
    let body = {
      Objet: [
        {
          SO_CODESOCIETE: this.session_de_connexion['SO_CODESOCIETE'], //"0001",//a remplacer dynamiquement
          PL_NUMCOMPTE: NUMCOMPTE,
          PL_TYPECOMPTE: 'I', //"I" a modifier selon bly
        },
      ],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboNumCompte = success;
        if (this.ComboNumCompte[0].SL_RESULTAT == 'TRUE') {
          this.ComboNumCompte = this.ComboNumCompte[1];
          this._loaderService._hide();
          $('#centermodal').modal('show');
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboNumCompte[0].SL_MESSAGE
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

  SelectionLigneCompte(indexCompte: any) {
    //8, 9, 10, 11, 12, 13, 14, 15, 16
    switch (this.ligneselect) {
      case '8':
        this.model_operateur[8]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      case '9':
        this.model_operateur[9]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      case '10':
        this.model_operateur[10]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      case '11':
        this.model_operateur[11]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      case '12':
        this.model_operateur[12]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      case '13':
        this.model_operateur[13]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      case '14':
        this.model_operateur[14]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      case '15':
        this.model_operateur[15]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      case '16':
        this.model_operateur[16]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
        break;
      default:
        // this.formulaire_utilisateur[12].valeur = this.vapNumreroCompte;
        break;
    }

    $('#centermodal').modal('hide');
  }

  selectCompte(info: any) {
    this.ligneselect = info;
    this.chargementComboNumCompte(
      this.model_operateur[parseInt(this.ligneselect)]['valeur']
    );
  }
  saveInfo(info: any) {
    this.SessionInfoUtilisateur = info;
  }
  AllerA(ecran: any) {
    this.codeOperateur = '';
    this.Initialisation('EnregistrerOperateur');
    if (ecran == 'modif') {
      // Réaffectation des valeurs dans `this.model_operateur`
      this.codeOperateur = this.SessionInfoUtilisateur.OP_CODEOPERATEUR;
      this.model_operateur[7]['valeur'] =
        this.SessionInfoUtilisateur.PO_CODEPROFIL;
      this.model_operateur[4]['valeur'] =
        this.SessionInfoUtilisateur.SR_CODESERVICE;
      this.model_operateur[0]['valeur'] =
        this.SessionInfoUtilisateur.OP_NOMPRENOM;
      this.model_operateur[2]['valeur'] =
        this.SessionInfoUtilisateur.OP_TELEPHONE;
      this.model_operateur[3]['valeur'] = this.SessionInfoUtilisateur.OP_EMAIL;
      this.model_operateur[6]['valeur'] = this.SessionInfoUtilisateur.OP_ACTIF;
      this.model_operateur[8]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTECAISSE
      )?.PL_NUMCOMPTE;
      this.model_operateur[9]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTECOFFRE
      )?.PL_NUMCOMPTE;
      this.model_operateur[10]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTEPROVISOIRE
      )?.PL_NUMCOMPTE;
      this.model_operateur[11]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTEWAVE
      )?.PL_NUMCOMPTE;
      this.model_operateur[12]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTEMTN
      )?.PL_NUMCOMPTE;
      this.model_operateur[13]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTEORANGE
      )?.PL_NUMCOMPTE;
      this.model_operateur[14]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTEMOOV
      )?.PL_NUMCOMPTE;
      this.model_operateur[15]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTECHEQUE
      )?.PL_NUMCOMPTE;
      this.model_operateur[16]['valeur'] = this.ComboNumCompteStock.find(
        (element) =>
          element.PL_CODENUMCOMPTE ==
          this.SessionInfoUtilisateur.PL_CODENUMCOMPTEVIREMENT
      )?.PL_NUMCOMPTE;
    }
    this.ecran_affiche = ecran;
  }
  containsUndefined(obj: any) {
    const undefinedKeys = [];

    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined) {
        undefinedKeys.push(key);
      }
    }

    if (undefinedKeys.length > 0) {
      this._alertService.WarningAlert(
        'Information!',
        `Les clés suivantes contiennent "undefined" :` + undefinedKeys
      );
      return;
    }
  }

  EnregistrerOperateur(tableau_recu: any, table_index: any) {
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
    let Option =
      this.ecran_affiche == 'modif'
        ? 'update_compte_utilisateur'
        : 'insert_operateur';

    if (this.model_operateur[6]['valeur'] == '') {
      this.model_operateur[6]['valeur'] = 'O';
    }

    let body = {
      Objet: [
        {
          OP_CODEOPERATEUR:
            this.ecran_affiche == 'modif' ? this.codeOperateur : '',
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PO_CODEPROFIL: this.model_operateur[7]['valeur'],
          SR_CODESERVICE: this.model_operateur[4]['valeur'],
          OP_NOMPRENOM: this.model_operateur[0]['valeur'],
          OP_TELEPHONE: this.model_operateur[2]['valeur'],
          OP_EMAIL: this.model_operateur[3]['valeur'],
          OP_LOGIN: '',
          OP_MOTPASSE: '',
          OP_URLPHOTO: 'http://example.com/photo.jpg',
          OP_ACTIF:
            this.model_operateur[6]['valeur'] == ''
              ? 'O'
              : this.model_operateur[6]['valeur'],
          PL_CODENUMCOMPTECAISSE: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[8]['valeur']
          )?.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTECOFFRE: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[9]['valeur']
          )?.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTEPROVISOIRE: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[10]['valeur']
          )?.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTEWAVE: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[11]['valeur']
          )?.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTEMTN: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[12]['valeur']
          )?.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTEORANGE: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[13]['valeur']
          )?.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTEMOOV: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[14]['valeur']
          )?.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTECHEQUE: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[15]['valeur']
          )?.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTEVIREMENT: this.ComboNumCompteStock.find(
            (element) =>
              element.PL_NUMCOMPTE === this.model_operateur[16]['valeur']
          )?.PL_CODENUMCOMPTE,
          OP_DATESAISIE: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          clsObjetEnvoi: {
            OE_A: this.session_de_connexion['AG_CODEAGENCE'],
            OE_J: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
            OE_Y: this.session_de_connexion['OP_CODEOPERATEUR'],
          },
        },
      ],
    };
    /*const accountNames = {
      PL_CODENUMCOMPTECAISSE: "COMPTE CAISSE",
      PL_CODENUMCOMPTECHEQUE: "COMPTE CHÈQUE",
      PL_CODENUMCOMPTECOFFRE: "COMPTE COFFRE",
      PL_CODENUMCOMPTEMOOV: "COMPTE MOOV",
      PL_CODENUMCOMPTEMTN: "COMPTE MTN",
      PL_CODENUMCOMPTEORANGE: "COMPTE ORANGE",
      PL_CODENUMCOMPTEPROVISOIRE: "COMPTE PROVISOIRE",
      PL_CODENUMCOMPTEVIREMENT: "COMPTE VIREMENT",
      PL_CODENUMCOMPTEWAVE: "COMPTE WAVE"
  };*/
    const undefinedKeys = [];
    const undefinedAccounts = [];
    for (const [key, value] of Object.entries(body.Objet[0])) {
      //@ts-ignore
      if (value === undefined && this.accountNames[key]) {
        //@ts-ignore
        undefinedAccounts.push(this.accountNames[key]);
      }
    }

    if (undefinedAccounts.length > 0) {
      this._alertService.WarningAlert(
        'Information!',
        'Veuillez bien renseigner les comptes suivants : ' +
          undefinedAccounts.join(', ')
      );
      this._loaderService._hide();
      return;
    }
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.RetourEnregistrement = success;
        if (this.RetourEnregistrement.SL_RESULTAT == 'TRUE') {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.RetourEnregistrement.SL_MESSAGE
          );
          this.Initialisation('EnregistrerOperateur');
          this.ecran_affiche = 'liste';
          this.chargementListeOperateur();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.RetourEnregistrement.SL_MESSAGE
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
  onMenuClick(event: Event): void {
    event.preventDefault(); // Empêche la redirection naturelle
    // Tu peux ajouter d'autres actions ici si nécessaire
  }
  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_operateur.forEach((element, index) => {
      if (index != 2) element['valeur'] = '';
      else if (index == 2) element['valeur'] = '225';
    });

    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ChoixDuStatut(etat: any) {
    this.model_operateur[6]['valeur'] = etat;
  }

  ngOnInit(): void {
    this.Initialisation('ngOnInit');
    this.chargementComboNumCompteinit();
  }

  ngAfterViewInit() {}
}
