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

declare var $: any;

@Component({
  selector: 'app-module-facture-annuler',
  templateUrl: './module-facture-annuler.component.html',
  styleUrls: ['./module-facture-annuler.component.scss'],
})
export class ModuleFactureAnnulerComponent implements OnInit, AfterViewInit {
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

  tab_liste_facture_filter: any = [];
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  tab_reponse: any = [];
  informationfactures: any = {};
  _TYPEOPERATION: any = 0;
  _PT_IDPATIENT: any = '';
  facture_selectionnee: any = {};
  tab_liste_num_compte: any = [];
  tab_liste_sexe: any = [];
  tab_liste_profession: any = [];
  tab_liste_assure: any = [];
  tab_liste_assurance: any = [];
  tab_liste_acte: any = [];
  tab_enregistrer_facture: any = [];
  tab_liste_mode_regl: any = [];
  tab_liste_facture: any = [];
  tab_liste_facture_test: any = [];
  titre_etat: any = '';
  tab_affiche_mode_regle: any = [];
  tab_mode_regle: any[] = [
    {
      code_du_mode: 1,
      nom_du_mode: 'Espece',
    },
    {
      code_du_mode: 2,
      nom_du_mode: 'MTN money',
    },
    {
      code_du_mode: 3,
      nom_du_mode: 'Moov money',
    },
    {
      code_du_mode: 4,
      nom_du_mode: 'Orange money',
    },
    {
      code_du_mode: 5,
      nom_du_mode: 'Wave',
    },
    {
      code_du_mode: 6,
      nom_du_mode: 'Cheque',
    },
    {
      code_du_mode: 7,
      nom_du_mode: 'Virement',
    },
  ];
  mode_enregistrement: boolean = true; // true design lenregistrement et false la modification
  ecran_affiche: any = 'liste'; // permet le basculement entre la liste et lenregistrement
  model_patient_critere: any[] = [
    // 0
    {
      id: 'idNomSearch',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom',
      afficher: true,
      readOnly: false,
    },
    // 1
    {
      id: 'idContactSearch',
      type: 'telephone_extra',
      valeur: '',
      obligatoire: 'N',
      label: 'contact',
      afficher: true,
      readOnly: false,
    },
    // 2
    {
      id: 'idDateDebutSearch',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: false,
    },
    // 3
    {
      id: 'idDateFinSearch',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: false,
    },
    // 4
    {
      id: 'idActeSearch',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'acte',
      afficher: true,
      readOnly: false,
    },
    // 5
    {
      id: 'idNumDocSearch',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'n° dossier',
      afficher: true,
      readOnly: false,
    }, // 6
    {
      id: 'idMatriculeSearch',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'matricule',
      afficher: true,
      readOnly: false,
    },
  ];
  model_patient: any[] = [
    // 0
    {
      id: 'idNom',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom',
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
      id: 'idSexe',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'sexe',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idDateNaissance',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de naissance',
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'idLieuHabitation',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "lieu d'habitation",
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idProfession',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'profession',
      afficher: true,
      readOnly: true,
    },
    // 7
    {
      id: 'idMatricule',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'matricule',
      afficher: true,
      readOnly: true,
    },
    // 8
    {
      id: 'idActe',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'acte',
      afficher: true,
      readOnly: true,
    },
    // 9
    {
      id: 'idMontantChiffre',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant en chiffre',
      afficher: true,
      readOnly: true,
    },
    // 10
    {
      id: 'idStatut',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assuré',
      afficher: true,
      readOnly: true,
    },
    // 11
    {
      id: 'idMontantLettre',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'montant en lettre',
      afficher: true,
      readOnly: true,
    },
    // 12
    {
      id: 'idModeReglement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mode de règlement',
      afficher: true,
      readOnly: true,
    },
    // 13
    {
      id: 'idNumCheque',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° cheque',
      afficher: true,
      readOnly: true,
    },
    // 14
    {
      id: 'idBanque',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'banque',
      afficher: true,
      readOnly: true,
    },
    // 15
    {
      id: 'idNumVirement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° virement',
      afficher: true,
      readOnly: true,
    },
    // 16
    {
      id: 'idAssurance',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assurance',
      afficher: false,
      readOnly: true,
    },
    // 17
    {
      id: 'idEmail',
      type: 'email',
      valeur: '',
      obligatoire: 'N',
      label: 'assurance',
      afficher: false,
      readOnly: true,
    },
    // 18
    {
      id: 'idDate1',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: false,
      readOnly: true,
    },
    // 19
    {
      id: 'idDate2',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: false,
      readOnly: true,
    },
  ];
  model_filter_gest_patient: any[] = [
    // 0
    {
      id: 'idFilterNomPrenoms',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom et prénoms',
      afficher: true,
    },
  ];
  montant_total_facture: any = 0;
  filteredefacture = [...this.tab_liste_facture];
  searchText: string = '';
  AllerA(ecran: any) {
    if (ecran != 'liste')
      //this.Initialisation('nouvel ajout');
      //else this.Initialisation('ajout');
      this.ecran_affiche = ecran;
  }

  EtatAAfficher(titre: any) {
    this.titre_etat = titre;
  }

  ChargerLaListeFacture() {
    this._loaderService._show();

    let lien_du_service = 'liste_facture_par_type';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          FT_CODEFACTURE: '',
          PT_IDPATIENT: '',
          ACT_CODEACTE: '',
          PT_NOMPRENOMS: '',
          PT_CONTACT: '',
          PT_MATRICULE: '',
          PT_CODEPATIENT: '',
          AS_CODEASSURANCE: '',
          MC_DATESAISIE1: '01/01/1900',
          MC_DATESAISIE2: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          TYPEOPERATION: '1',
          MONTANT1: '',
          MONTANT2: '',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_facture = success;

        this._loaderService._hide();

        if (this.tab_liste_facture[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_facture[0]['SL_MESSAGE']
          );
          this.tab_liste_facture = [];
        } else {
          this.tab_liste_facture = this.tab_liste_facture[1];

          this.filteredefacture = [...this.tab_liste_facture];
          // this.filteredefacture.reverse();

          this.filteredefacture.sort((a, b) => {
            const numA = parseInt(a.NUMEROBORDEREAU.substring(13), 10);
            const numB = parseInt(b.NUMEROBORDEREAU.substring(13), 10);
            return numB - numA;
          });
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.WarningAlert(
        'Information!',
        'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
      );
    };
  }

  // Méthode pour filtrer les données
  applyFilter(): void {
    const lowerSearchText = this.searchText.toLowerCase();
    //@ts-ignore
    this.filteredefacture = this.tab_liste_facture.filter((facture) =>
      Object.values(facture).some(
        (
          value //@ts-ignore
        ) => value.toString().toLowerCase().includes(lowerSearchText)
      )
    );
  }

  // filtrer les factures
  FiltrerListeDeFacture() {
    this.tab_liste_facture_test = [];
    const name = this.model_patient_critere[0]['valeur'].toLowerCase();

    const tableauFiltre = this.tab_liste_facture_filter.filter(
      // @ts-ignore
      (item) => {
        return !name || item.PT_NOMPRENOMS.toLowerCase().includes(name);
      }
    );
    this.tab_liste_facture_test = tableauFiltre;
    console.log('filtre sur les factures', tableauFiltre);
    if (this.tab_liste_facture_test.length != 0) {
      this.tab_liste_facture = tableauFiltre;
      this.filteredefacture = [...this.tab_liste_facture];
    }

    if (this.tab_liste_facture_test.length == 0) {
      // this._loaderService._show();
      let lien_du_service = 'liste_facture_par_type';

      let body = {
        Objet: [
          {
            AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
            FT_CODEFACTURE: '',
            PT_IDPATIENT: '',
            ACT_CODEACTE: '',
            PT_NOMPRENOMS: '',
            PT_CONTACT: '',
            PT_MATRICULE: '',
            PT_CODEPATIENT: '',
            AS_CODEASSURANCE: '',
            MC_DATESAISIE1: '01/01/1900',
            MC_DATESAISIE2: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
            TYPEOPERATION: '1',
            MONTANT1: '',
            MONTANT2: '',
          },
        ],
      };

      this._adminService
        .AppelServeur(body, lien_du_service)
        .subscribe((success: any) => {
          this.tab_liste_facture = success;

          // this._loaderService._hide();
          if (this.tab_liste_facture[0]['SL_RESULTAT'] == 'FALSE') {
            /* this._alertService.WarningAlert(
              'Information!',
              this.tab_liste_facture[0]['SL_MESSAGE']
            ); */
            this.tab_liste_facture = [];
          } else {
            this.tab_liste_facture = this.tab_liste_facture[1];

            this.tab_liste_facture_test = [];
            const name = this.model_patient_critere[0]['valeur'].toLowerCase();

            const tableauFiltre = this.tab_liste_facture.filter(
              // @ts-ignore
              (item) => {
                return !name || item.PT_NOMPRENOMS.toLowerCase().includes(name);
              }
            );
            this.tab_liste_facture = this.tab_liste_facture_test =
              tableauFiltre;

            this.filteredefacture = [...this.tab_liste_facture];

            console.log('filteredefacture', this.filteredefacture);
          }
        });
      (error: any) => {
        this._loaderService._hide();

        this._alertService.ErrorAlert(
          'Erreur!',
          this.tab_liste_facture['SL_MESSAGE']
        );
      };
    } else {
      this._loaderService._hide();
    }
  }

  ChercherLesFactures(tableau_recu: any, table_index: any) {
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

    // this._loaderService._show();
    let lien_du_service = 'liste_facture_par_type';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          FT_CODEFACTURE: '',
          PT_IDPATIENT: '',
          ACT_CODEACTE: this.model_patient_critere[4]['valeur'],
          PT_NOMPRENOMS: this.model_patient_critere[0]['valeur'].trim(),
          PT_CONTACT: this.model_patient_critere[1]['valeur'].trim(),
          PT_MATRICULE: this.model_patient_critere[6]['valeur'].trim(),
          PT_CODEPATIENT: this.model_patient_critere[5]['valeur'].trim(),
          AS_CODEASSURANCE: '',
          MC_DATESAISIE1: this.model_patient_critere[2]['valeur'],
          MC_DATESAISIE2: this.model_patient_critere[3]['valeur'],
          TYPEOPERATION: '1',
          MONTANT1: '',
          MONTANT2: '',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_facture = success;

        // this._loaderService._hide();
        if (this.tab_liste_facture[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_facture[0]['SL_MESSAGE']
          );
          this.tab_liste_facture = this.filteredefacture = [];
        } else {
          this.tab_liste_facture = this.tab_liste_facture_filter =
            this.tab_liste_facture[1];

          this.filteredefacture = [...this.tab_liste_facture];

          console.log('tab_liste_facture', this.tab_liste_facture);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_facture['SL_MESSAGE']
      );
    };
  }

  ChargerComboActe() {
    let lien_du_service = 'pvgComboActe';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_acte = success;

        if (this.tab_liste_acte[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_acte['SL_MESSAGE']
          );
        } else {
          this.tab_liste_acte = this.tab_liste_acte[1];
          console.log('tab_liste_acte', this.tab_liste_acte);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_acte['SL_MESSAGE']
      );
    };
  }

  ngOnInit(): void {
    // this.ChargerLaListeFacture();
    this.ChargerComboActe();
    this.model_patient_critere[2]['valeur'] =
      this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    this.model_patient_critere[3]['valeur'] =
      this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];

    // this.Initialisation('ngOnInit');
  }

  ngAfterViewInit() {}
}
