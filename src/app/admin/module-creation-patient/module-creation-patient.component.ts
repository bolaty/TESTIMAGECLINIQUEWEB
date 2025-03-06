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
  selector: 'app-module-creation-patient',
  templateUrl: './module-creation-patient.component.html',
  styleUrls: ['./module-creation-patient.component.scss'],
})
export class ModuleCreationPatientComponent implements OnInit, AfterViewInit {
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
  tab_releve: any = [];
  tab_reponse: any = [];
  informationpatient: any = {};
  _TYPEOPERATION: any = 0;
  _PT_IDPATIENT: any = '';
  _PT_CODEPATIENT: any = '';
  facture_selectionnee: any = {};
  tab_liste_num_compte: any = [];
  tab_statut: any = [];
  tab_liste_sexe: any = [];
  tab_liste_profession: any = [];
  tab_liste_assure: any = [];
  tab_liste_assurance: any = [];
  tab_liste_acte: any = [];
  tab_enregistrer_Patient: any = [];
  tab_liste_mode_regl: any = [];
  tab_liste_patient: any = [];
  tab_liste_facture_test: any = [];
  tab_liste_factureAregler: any = [];
  titre_etat: any = '';
  tab_affiche_mode_regle: any = [];
  infofactureAregler: any = {};
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
    // 20
    {
      id: 'idMontantFacture',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'montant facture',
      afficher: false,
      readOnly: true,
    },
    // 21
    {
      id: 'idNumDoc',
      type: 'numerique',
      valeur: '',
      obligatoire: 'O',
      label: 'n° dossier',
      afficher: false,
      readOnly: false,
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
    {
      id: 'idDossier',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'n° dossier',
      afficher: true,
    },
    {
      id: 'idMatricule',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'matricule',
      afficher: true,
    },
    {
      id: 'idDateDebut',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
    },
    {
      id: 'idDateFin',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
    },
    {
      id: 'idstatut',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'statut',
      afficher: true,
    },
    {
      id: 'idContact',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'contact',
      afficher: true,
    },
  ];
  montant_total_facture: any = 0;

  AllerA(ecran: any) {
    if (ecran != 'liste') this.Initialisation('nouvel ajout');
    else this.Initialisation('ajout');
    // @ts-ignore
    this.model_patient.forEach((element, idx) => {
      if (idx != 11) element['readOnly'] = false;
    });
    this.ecran_affiche = ecran;
  }

  EnregistrerPatient(tableau_recu: any, table_index: any) {
    // @ts-ignore
    tableau_recu.forEach((element) => {
      element['obligatoire'] = 'N';
    });

    // @ts-ignore
    table_index.forEach((element) => {
      tableau_recu[element]['obligatoire'] = 'O';
    });

    let testeur = 0;
    for (let index = 0; index < tableau_recu.length; index++) {
      if (
        tableau_recu[index]['obligatoire'] == 'O' &&
        tableau_recu[index]['valeur'] == ''
      ) {
        testeur = 1;
        break;
      }
    }

    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;
    if (
      !this._toolsService._contrainteTypeDeDonneeChampNonObligatoire(
        tableau_recu
      )
    )
      return;

    this._loaderService._show();

    let lien_du_service = 'insert_patient';

    let body = {
      Objet: [
        {
          PT_IDPATIENT: this._TYPEOPERATION == 1 ? this._PT_IDPATIENT : '',
          PT_CODEPATIENT: tableau_recu[21]['valeur'],
          PT_MATRICULE: tableau_recu[7]['valeur'],
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PT_NOMPRENOMS: tableau_recu[0]['valeur'],
          PT_CONTACT:
            tableau_recu[2]['valeur'] === '225'
              ? ''
              : tableau_recu[2]['valeur'],
          PT_EMAIL: tableau_recu[17]['valeur'],
          PT_DATENAISSANCE: tableau_recu[4]['valeur'],
          PT_DATESAISIE: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          PT_LIEUHABITATION: tableau_recu[5]['valeur'],
          PF_CODEPROFESSION: tableau_recu[6]['valeur'],
          SX_CODESEXE: tableau_recu[3]['valeur'],
          STAT_CODESTATUT: tableau_recu[10]['valeur'],
          OP_CODEOPERATEUR: this.session_de_connexion['OP_CODEOPERATEUR'],
          PL_CODENUMCOMPTE: '',
          TYPEOPERATION: this._TYPEOPERATION,
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
        this.tab_enregistrer_Patient = success;

        this._loaderService._hide();

        if (this.tab_enregistrer_Patient['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_enregistrer_Patient['SL_MESSAGE']
          );
        } else {
          this._alertService.SuccessAlert(
            'Succès!',
            `${this.tab_enregistrer_Patient['SL_MESSAGE']} <br> </b>`
          );
          console.log('tab_enregistrer_Patient', this.tab_enregistrer_Patient);
          // this.Initialisation('EnregistrerFacturePatient');
          this.AllerA('liste');
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_enregistrer_Patient['SL_MESSAGE']
      );
    };
  }

  ChoixAssure(id: any) {
    this.model_patient[16]['afficher'] = false;

    if (id == '01') {
      this.model_patient[16]['afficher'] = true;
      this.ChargerComboAssurance();
    }
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_patient.forEach((element, index) => {
      if (index != 2) element['valeur'] = '';
      else if (index == 2) element['valeur'] = '225';

      if (index == 13 || index == 14 || index == 15 || index == 16)
        element['afficher'] = false;

      $(`#${element['id']}`).css('background-color', 'white');
    });

    this.tab_affiche_mode_regle = [];
    this.montant_total_facture = 0;
    this._TYPEOPERATION = 0;
    this.model_filter_gest_patient[3]['valeur'] =
      this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    this.model_filter_gest_patient[4]['valeur'] =
      this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    console.log('_TYPEOPERATION', this._TYPEOPERATION);

    this._loaderService._hide();

    if (method == 'ajout')
      this.ChargerLaListePatient(this.model_filter_gest_patient, [3, 4]);
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ChoixDuModeReglement(code_element: any) {
    this.model_patient.forEach((element, index) => {
      if (index == 13 || index == 14 || index == 15)
        element['afficher'] = false;
    });

    if (code_element == 6) {
      this.model_patient[13]['afficher'] = this.model_patient[14]['afficher'] =
        true;
    } else if (code_element == 7) {
      this.model_patient[14]['afficher'] = this.model_patient[15]['afficher'] =
        true;
    }
  }

  EtatAAfficher(titre: any) {
    this.titre_etat = titre;
  }

  RecupInfoFact(infoFacts: any) {
    this.infofactureAregler = infoFacts;

    let lien_du_service = 'get_solde_mouvement_comptable';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          FT_CODEFACTURE: infoFacts.FT_CODEFACTURE,
          OP_CODEOPERATEUR: this.session_de_connexion['OP_CODEOPERATEUR'],
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_factureAregler = success;
        //  this.tab_liste_factureAregler = this.tab_liste_factureAregler[1];
      });
    (error: any) => {};
  }

  ChargerLaListePatient(tableau_recu: any, table_index: any) {
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

    let lien_du_service = 'ListePatient';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PT_CODEPATIENT: this.model_filter_gest_patient[1]['valeur'].trim(),
          PT_MATRICULE: this.model_filter_gest_patient[2]['valeur'].trim(),
          PT_NOMPRENOMS: this.model_filter_gest_patient[0]['valeur'].trim(),
          DATEDEBUT: this.model_filter_gest_patient[3]['valeur'],
          DATEFIN: this.model_filter_gest_patient[4]['valeur'],
          STAT_CODESTATUT: this.model_filter_gest_patient[5]['valeur'],
          PT_CONTACT: this.model_filter_gest_patient[6]['valeur'].trim(),
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_patient = success;

        this._loaderService._hide();

        if (this.tab_liste_patient[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_patient[0]['SL_MESSAGE']
          );
          this.tab_liste_patient = [];
        } else {
          this.tab_liste_patient = this.tab_liste_patient[1];
          console.log('tab_liste_patient', this.tab_liste_patient);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_patient['SL_MESSAGE']
      );
    };
  }

  onMenuClick(event: Event, infoFact: any, action: any): void {
    event.preventDefault(); // Empêche la redirection naturelle
    this.informationpatient = infoFact;

    if (action == 'edit fact') {
      sessionStorage.setItem(
        'info_patient_pour_facture',
        JSON.stringify(infoFact)
      );
      this._router.navigate(['admin/patient']);
    }

    if (action == 'rel pat') {
      $('#modal_affiche_etat').modal('show');
      this.model_patient[18]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
      this.model_patient[19]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    }
  }

  Suppressionpatient() {
    this._loaderService._show();

    let lien_du_service = 'deletepatient';

    let body = {
      Objet: [
        {
          PT_IDPATIENT: this.informationpatient.PT_IDPATIENT,
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_reponse = success;

        this._loaderService._hide();

        if (this.tab_reponse.SL_RESULTAT == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_reponse.SL_MESSAGE
          );
        } else {
          this.ChargerLaListePatient(this.model_filter_gest_patient, [3, 4]);
          this._alertService.SuccessAlert(
            'Information!',
            this.tab_reponse.SL_MESSAGE
          );
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert('Erreur!', this.tab_reponse.SL_MESSAGE);
    };
  }

  SelectionnerLaFacture(item: any, index: any) {
    this.facture_selectionnee = item;
    this.model_patient[0]['valeur'] = item['PT_NOMPRENOMS']; // Nom et prénoms
    this.model_patient[2]['valeur'] = item['PT_CONTACT']; // Contact
    this.model_patient[17]['valeur'] = item['PT_EMAIL']; // Email
    this.model_patient[3]['valeur'] = item['SX_CODESEXE']; // Sexe
    this.model_patient[4]['valeur'] =
      item['PT_DATENAISSANCE'] == '01/01/1900' ? '' : item['PT_DATENAISSANCE']; // Date de naissance
    this.model_patient[5]['valeur'] = item['PT_LIEUHABITATION']; // Lieu d'habitation
    this.model_patient[6]['valeur'] = item['PT_PROFESSION']; // Profession
    this.model_patient[7]['valeur'] = item['PT_MATRICULE']; // Matricule
    this.model_patient[10]['valeur'] = item['STAT_CODESTATUT']; // Statut

    this._PT_IDPATIENT = item['PT_IDPATIENT'];
    this.model_patient[21]['valeur'] = item['PT_CODEPATIENT'];
    // this._PT_CODEPATIENT = item['PT_CODEPATIENT'];
    this._TYPEOPERATION = 1; // cet type operation permet de ne pas creer le patient
    console.log('_TYPEOPERATION', this._TYPEOPERATION);
    console.log('item de la modif patient', item);

    this.ecran_affiche = 'ajout';
    this.ChoixAssure(this.model_patient[10]['valeur']);
  }

  // chargement des combos
  ChargerComboModeDeReglement() {
    this._loaderService._show();

    let lien_du_service = 'pvgComboModeReglement';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_mode_regl = success;

        if (this.tab_liste_mode_regl[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_mode_regl['SL_MESSAGE']
          );
        } else {
          this.tab_liste_mode_regl = this.tab_liste_mode_regl[1];
          // @ts-ignore
          this.tab_liste_mode_regl.forEach((element, idx) => {
            if (element['MR_CODEMODEREGLEMENT'] == '008')
              this.tab_liste_mode_regl.splice(idx, 1);
          });
          this.ChargerComboActe();
          console.log('tab_liste_mode_regl', this.tab_liste_mode_regl);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_mode_regl['SL_MESSAGE']
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
          this.ChargerComboAssure();
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

  ChargerComboAssurance() {
    this._loaderService._show();
    let lien_du_service = 'pvgComboAssurance';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_assurance = success;
        this._loaderService._hide();

        if (this.tab_liste_assurance[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_assurance['SL_MESSAGE']
          );
        } else {
          this.tab_liste_assurance = this.tab_liste_assurance[1];
          this.model_patient[16]['valeur'] =
            this.facture_selectionnee['AS_CODEASSURANCE']; // Assurance
          console.log('tab_liste_assurance', this.tab_liste_assurance);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_assurance['SL_MESSAGE']
      );
    };
  }

  ChargerComboAssure() {
    let lien_du_service = 'pvgComboAssure';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_assure = success;

        if (this.tab_liste_assure[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_assure['SL_MESSAGE']
          );
        } else {
          this.tab_liste_assure = this.tab_liste_assure[1];
          this.tab_statut = this.tab_liste_assure;
          this.ChargerComboSexe();
          console.log('tab_liste_assure', this.tab_liste_assure);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_assure['SL_MESSAGE']
      );
    };
  }

  ChargerComboSexe() {
    let lien_du_service = 'sexe';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_sexe = success;

        if (this.tab_liste_sexe[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_sexe['SL_MESSAGE']
          );
        } else {
          this.tab_liste_sexe = this.tab_liste_sexe[1];
          this.ChargerComboProfession();
          console.log('tab_liste_sexe', this.tab_liste_sexe);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_sexe['SL_MESSAGE']
      );
    };
  }

  ChargerComboProfession() {
    let lien_du_service = 'profession';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_profession = success;

        this._loaderService._hide();

        if (this.tab_liste_profession[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_profession['SL_MESSAGE']
          );
        } else {
          this.tab_liste_profession = this.tab_liste_profession[1];

          console.log('tab_liste_profession', this.tab_liste_profession);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_profession['SL_MESSAGE']
      );
    };
  }

  ChargerComboNumCompte(champ: any) {
    let lien_du_service = 'pvgComboCompte';

    let body = {
      Objet: [
        {
          SO_CODESOCIETE: this.session_de_connexion['SO_CODESOCIETE'],
          PL_NUMCOMPTE: champ,
          PL_TYPECOMPTE: 'I', //"I" a modifier selon bly
        },
      ],
    };

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success: any) => {
        this.tab_liste_num_compte = success;
        if (this.tab_liste_num_compte[0]['SL_RESULTAT'] == 'TRUE') {
          this.tab_liste_num_compte = this.tab_liste_num_compte[1];
          this._loaderService._hide();
          $('#centermodal').modal('show');
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_num_compte[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'Veuillez réessayer svp ou problème de connexion avec le serveur !!!'
        );
      }
    );
  }

  SelectionnerUnCompte(indexCompte: any) {
    this.model_patient[14]['valeur'] =
      this.tab_liste_num_compte[indexCompte]['PL_NUMCOMPTE'];

    $('#centermodal').modal('hide');
  }

  AfficherEtat(tableau_recu: any, table_index: any, etat: any) {
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

    // comparer deux dates
    const date1 = this._toolsService._convertirUneDate(
      this.model_patient[18]['valeur'].replaceAll('-', '/')
    );
    const date2 = this._toolsService._convertirUneDate(
      this.model_patient[19]['valeur'].replaceAll('-', '/')
    );
    const resultatComparaison = this._toolsService._comparerDeuxDates(
      date1,
      date2
    );

    if (resultatComparaison === 'date1Supdate2') {
      this._alertService.WarningAlert(
        'Information!',
        'La date de début ne doit pas être plus grande que la date de fin.'
      );

      return;
    }

    this._loaderService._show();

    let lien_du_service = 'edition_solde';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          OP_CODEOPERATEUREDITION:
            this.session_de_connexion['OP_CODEOPERATEUR'],
          DATEDEBUT: tableau_recu[18]['valeur'],
          DATEFIN: tableau_recu[19]['valeur'],
          PT_IDPATIENT: this.informationpatient['PT_IDPATIENT'],
          FT_CODEFACTURE: '',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_releve = success;

        this._loaderService._hide();
        if (this.tab_releve['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_releve['SL_MESSAGE']
          );
        } else {
          this.tab_releve = this.tab_releve[1].map(
            // @ts-ignore
            (item) => ({
              ...item,
              objetEnvoi: body, // ajouter la propriete 'images'
            })
          );
          console.log('tab_releve', this.tab_releve);

          sessionStorage.setItem(
            'et_solde_compte',
            JSON.stringify(this.tab_releve)
          );
          window.open('/admin/invoice/solde_compte');
        }
      });
    (error: any) => {};
  }

  ngOnInit(): void {
    // this.ChargerLaListePatient();
    this.ChargerComboModeDeReglement();
    this.Initialisation('ngOnInit');
  }

  ngAfterViewInit() {}
}
