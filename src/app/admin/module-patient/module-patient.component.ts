import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-module-patient',
  templateUrl: './module-patient.component.html',
  styleUrls: ['./module-patient.component.scss'],
})
export class ModulePatientComponent
  implements OnInit, AfterViewInit, OnDestroy
{
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
  session_patient: any = JSON.parse(
    sessionStorage.getItem('info_patient_pour_facture') || '{}'
  );
  tab_reponse: any = [];
  informationfactures: any = {};
  _TYPEOPERATION: any = 0;
  total_fact_rest_a_regler: any = 0;
  _PT_IDPATIENT: any = '';
  facture_selectionnee: any = {};
  item_facture: any = {};
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
  tab_liste_facture_filter: any = [];
  tab_liste_factureAregler: any = [];
  tab_releve: any = [];
  titre_etat: any = '';
  tab_affiche_mode_regle: any = [];
  infofactureAregler: any = {};
  solde_compte_op: any;
  tab_solde: any = [];
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
    // 7
    {
      id: 'idMtntDebutSearch',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant début',
      afficher: true,
      readOnly: false,
    }, // 8
    {
      id: 'idMtntFinSearch',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant fin',
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
      readOnly: false,
    },
    // 1
    {
      id: 'idPrenoms',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'prénoms',
      afficher: true,
      readOnly: false,
    },
    // 2
    {
      id: 'idContact',
      type: 'telephone_extra',
      valeur: '',
      obligatoire: 'N',
      label: 'contact',
      afficher: true,
      readOnly: false,
    },
    // 3
    {
      id: 'idSexe',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'sexe',
      afficher: true,
      readOnly: false,
    },
    // 4
    {
      id: 'idDateNaissance',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de naissance',
      afficher: true,
      readOnly: false,
    },
    // 5
    {
      id: 'idLieuHabitation',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "lieu d'habitation",
      afficher: true,
      readOnly: false,
    },
    // 6
    {
      id: 'idProfession',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'profession',
      afficher: true,
      readOnly: false,
    },
    // 7
    {
      id: 'idMatricule',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'matricule',
      afficher: true,
      readOnly: false,
    },
    // 8
    {
      id: 'idActe',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'acte',
      afficher: true,
      readOnly: false,
    },
    // 9
    {
      id: 'idMontantChiffre',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant en chiffre',
      afficher: true,
      readOnly: false,
    },
    // 10
    {
      id: 'idStatut',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assuré',
      afficher: true,
      readOnly: false,
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
      readOnly: false,
    },
    // 13
    {
      id: 'idNumCheque',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° cheque',
      afficher: true,
      readOnly: false,
    },
    // 14
    {
      id: 'idBanque',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'banque',
      afficher: true,
      readOnly: false,
    },
    // 15
    {
      id: 'idNumVirement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° virement',
      afficher: true,
      readOnly: false,
    },
    // 16
    {
      id: 'idAssurance',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assurance',
      afficher: false,
      readOnly: false,
    },
    // 17
    {
      id: 'idEmail',
      type: 'email',
      valeur: '',
      obligatoire: 'N',
      label: 'assurance',
      afficher: false,
      readOnly: false,
    },
    // 18
    {
      id: 'idDate1',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: false,
      readOnly: false,
    },
    // 19
    {
      id: 'idDate2',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: false,
      readOnly: false,
    },
    // 20
    {
      id: 'idMontantFacture',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant facture',
      afficher: false,
      readOnly: true,
    },
    // 21
    {
      id: 'idLibOp',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "Libellé de l'opération",
      afficher: false,
      readOnly: false,
    },
    // 22
    {
      id: 'idNumDoc',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'n° dossier',
      afficher: false,
      readOnly: false,
    },
    // 23
    {
      id: 'idRefPiece',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
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
  ];
  montant_total_facture: any = 0;

  AllerA(ecran: any) {
    sessionStorage.removeItem('info_patient_pour_facture');
    if (ecran != 'liste') this.Initialisation('nouvel ajout');
    else this.Initialisation('ajout');
    this.ecran_affiche = ecran;
  }
  SoldeCompteOp() {
    let lien_du_service = 'solde_compte_operateur';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PL_CODENUMCOMPTE: this.session_de_connexion['PL_CODENUMCOMPTECAISSE'],
          JT_DATEJOURNEETRAVAIL: this._toolsService._getNextDay(
            this.session_de_connexion.JT_DATEJOURNEETRAVAIL
          ),
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_solde = success;

        this.solde_compte_op = +this.tab_solde[1][0]['SOLDE'].split('.')[0];
        console.log('solde_compte_op', this.solde_compte_op);

        this.ChargerComboModeDeReglement();
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_mode_regl['SL_MESSAGE']
      );
    };
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

    if (
      +this.model_patient_critere[7]['valeur'].replaceAll(' ', '') >
      +this.model_patient_critere[8]['valeur'].replaceAll(' ', '')
    ) {
      this._alertService.WarningAlert(
        'Information!',
        `Le montant début ne peut pas être supérieur au montant fin.`
      );
      return;
    }

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
          TYPEOPERATION: '0',
          MONTANT1: +this.model_patient_critere[7]['valeur'].replaceAll(
            ' ',
            ''
          ),
          MONTANT2: +this.model_patient_critere[8]['valeur'].replaceAll(
            ' ',
            ''
          ),
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
          this.tab_liste_facture = [];
        } else {
          this.tab_liste_facture = this.tab_liste_facture_filter =
            this.tab_liste_facture[1];
          this.tab_liste_facture.reverse();
          /*  this.tab_liste_facture_test = [];
                const name =
                  this.model_filter_gest_patient[0]['valeur'].toLowerCase();

                const tableauFiltre = this.tab_liste_facture.filter(
                  // @ts-ignore
                  (item) => {
                    return !name || item.PT_NOMPRENOMS.toLowerCase().includes(name);
                  }
                );
                this.tab_liste_facture = this.tab_liste_facture_test =
                  tableauFiltre; */

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

  EnregistrerFacturePatient(tableau_recu: any, table_index: any) {
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

    if (
      testeur == 1 ||
      this.tab_affiche_mode_regle.length == 0 ||
      (tableau_recu[13]['afficher'] && tableau_recu[13]['valeur'] == '') ||
      (tableau_recu[14]['afficher'] && tableau_recu[14]['valeur'] == '') ||
      (tableau_recu[15]['afficher'] && tableau_recu[15]['valeur'] == '') ||
      (tableau_recu[16]['afficher'] && tableau_recu[16]['valeur'] == '')
    ) {
      // @ts-ignore
      tableau_recu.forEach((element) => {
        element['obligatoire'] = 'N';
      });

      // ajout de champ obligatoire dynamique
      if (tableau_recu[16]['afficher']) {
        table_index.push(16);
      }
      if (tableau_recu[13]['afficher'] && tableau_recu[14]['afficher']) {
        table_index.push(13, 14);
      } else if (tableau_recu[14]['afficher'] && tableau_recu[15]['afficher']) {
        table_index.push(14, 15);
      }
      if (this.tab_affiche_mode_regle.length != 0) {
        const index = table_index.indexOf(12);
        if (index !== -1) {
          table_index.splice(index, 1);
        }
        const index_2 = table_index.indexOf(9);
        if (index_2 !== -1) {
          table_index.splice(index_2, 1);
        }
      }

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
    }

    if (
      +this.montant_total_facture.replaceAll(' ', '') >
      +this.model_patient[20]['valeur']
    ) {
      this._alertService.WarningAlert(
        'Information!',
        `Vous ne pouvez pas regler plus que le montant attendu de la facture.`
      );
      return;
    }

    if (this.tab_affiche_mode_regle.length != 0) {
      this._loaderService._show();

      let libelle_acte = '';
      let table_mode_regl: any[] = [];
      // @ts-ignore
      this.tab_affiche_mode_regle.forEach((element) => {
        // @ts-ignore
        this.tab_liste_mode_regl.forEach((element2) => {
          if (
            element2['MR_CODEMODEREGLEMENT'] == element['code_mode_reglement']
          ) {
            libelle_acte = element2['MR_LIBELLE'];
          }
        });

        let objet = {
          ACT_CODEACTE: element['code_acte'],
          AS_CODEASSURANCE: element['code_assurance'],
          MR_CODEMODEREGLEMENT: element['code_mode_reglement'],
          MR_LIBELLEMODEREGLEMENT: element['libelle_mode_reglement'],
          MC_MONTANTDEBIT: '',
          MC_MONTANTCREDIT: +element['montant_chiffre'].replaceAll(' ', ''),
          MC_NUMPIECE: '',
          MC_NUMSEQUENCE: '',
          MC_ANNULATION: '',
          JO_CODEJOURNAL: 'CA',
          MC_REFERENCEPIECE: tableau_recu[23]['valeur'],
          MC_LIBELLEOPERATION: tableau_recu[21]['valeur'], //`règlement facture: ${libelle_acte} du ${this.session_de_connexion['JT_DATEJOURNEETRAVAIL']}`,
          MC_NOMTIERS: tableau_recu[0]['valeur'],
          MC_CONTACTTIERS:
            tableau_recu[2]['valeur'] === '225'
              ? ''
              : tableau_recu[2]['valeur'],
          MC_EMAILTIERS: tableau_recu[17]['valeur'],
          MC_NUMPIECETIERS: '',
          MC_TERMINAL: '',
          MC_AUTRE: '',
          MC_AUTRE1: '',
          MC_AUTRE2: '',
          MC_AUTRE3: '',
          TS_CODETYPESCHEMACOMPTABLE: '',
          MC_SENSBILLETAGE: 'N',
          MC_LIBELLEBANQUE: '',
          MC_MONTANT_FACTURE: +this.montant_total_facture.replaceAll(' ', ''),
          MC_MONTANT_CONSTATIONFACTURE: +tableau_recu[20]['valeur'].replaceAll(
            ' ',
            ''
          ),
        };

        table_mode_regl.push(objet);
      });

      let lien_du_service = 'creation_facture';

      let body = {
        Objet: [
          {
            PT_IDPATIENT: this._TYPEOPERATION == 7 ? this._PT_IDPATIENT : '',
            PT_CODEPATIENT: tableau_recu[22]['valeur'],
            FT_ANNULATION: 'N',
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
            PL_CODENUMCOMPTE: this.tab_liste_assure.find(
              //@ts-ignore
              (element) =>
                element.STAT_CODESTATUT === this.model_patient[10]['valeur']
            )?.PL_CODENUMCOMPTE,
            TYPEOPERATION: this._TYPEOPERATION,
            TABLEMODEREGLEMENT: table_mode_regl,
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
          this.tab_enregistrer_facture = success;

          this._loaderService._hide();

          if (this.tab_enregistrer_facture['SL_RESULTAT'] == 'FALSE') {
            this._alertService.WarningAlert(
              'Information!',
              this.tab_enregistrer_facture['SL_MESSAGE']
            );
          } else {
            this._alertService.SuccessAlert(
              'Succès!',
              `${this.tab_enregistrer_facture['SL_MESSAGE']} <br> <b>${this.tab_enregistrer_facture['NUMEROBORDEREAUREGLEMENT']}</b>`
            );
            console.log(
              'tab_enregistrer_facture',
              this.tab_enregistrer_facture
            );
            // this.Initialisation('EnregistrerFacturePatient');

            if (sessionStorage.getItem('info_patient_pour_facture')) {
              sessionStorage.removeItem('info_patient_pour_facture');
            }

            this.AllerA('liste');

            let table: any[] = [];
            table.push(this.tab_enregistrer_facture);
            this.tab_enregistrer_facture = table.map(
              // @ts-ignore
              (item) => ({
                ...item,
                objetEnvoi: body, // ajouter le body
              })
            );

            sessionStorage.setItem(
              'recu_operation',
              JSON.stringify(this.tab_enregistrer_facture)
            );
            window.open('/admin/invoice/recu', '_blank');
          }
        });
      (error: any) => {
        this._loaderService._hide();

        this._alertService.ErrorAlert(
          'Erreur!',
          this.tab_enregistrer_facture['SL_MESSAGE']
        );
      };
    } else {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez définir le mode par lequel vous réglez la facture.`
      );
    }
  }

  EnregistrerReglementFacture(tableau_recu: any, table_index: any) {
    if (this.tab_affiche_mode_regle.length == 0) {
      this._alertService.WarningAlert(
        'Information!',
        'Veuillez saisir un montant svp !!!'
      );
      return;
    }

    //CONTRAINTE DES MONTANTS

    var montant = parseInt(this.tab_liste_factureAregler?.MONTANTAREGLER);
    var montanttotal = +this.montant_total_facture.replaceAll(' ', '');
    var montant_restant_a_regler = +(
      this.infofactureAregler?.MONTANT_FACTURE -
      this.tab_liste_factureAregler?.MONTANTAREGLER
    )
      .toString()
      .replaceAll(/\s/g, '');
    if (montant_restant_a_regler == 0) {
      this._alertService.WarningAlert(
        'Information!',
        'Cette facture est déjà reglée entièrement'
      );
      return;
    }
    if (montanttotal > montant_restant_a_regler) {
      this._alertService.WarningAlert(
        'Information!',
        'Opération impossible le montant total est superieur au montant restant à regler'
      );
      return;
    }

    if (this.tab_affiche_mode_regle.length != 0) {
      this._loaderService._show();

      let libelle_acte = '';
      let table_mode_regl: any[] = [];
      // @ts-ignore
      this.tab_affiche_mode_regle.forEach((element) => {
        // @ts-ignore
        this.tab_liste_mode_regl.forEach((element2) => {
          if (
            element2['MR_CODEMODEREGLEMENT'] == element['code_mode_reglement']
          ) {
            libelle_acte = element2['MR_LIBELLE'];
          }
        });

        let objet = {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          MR_CODEMODEREGLEMENT: element['code_mode_reglement'],
          MR_LIBELLEMODEREGLEMENT: element['libelle_mode_reglement'],
          MC_MONTANTDEBIT: '',
          MC_MONTANTCREDIT: +element['montant_chiffre'].replace(' ', ''),
          PT_DATESAISIE: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          PT_IDPATIENT: this.infofactureAregler.PT_IDPATIENT,
          FT_CODEFACTURE: this.infofactureAregler.FT_CODEFACTURE,
          OP_CODEOPERATEUR: this.infofactureAregler.OP_CODEOPERATEUR,
          PL_CODENUMCOMPTE: this.session_de_connexion.PL_CODENUMCOMPTECAISSE,
          ACT_CODEACTE: this.infofactureAregler.ACT_CODEACTE,
          AS_CODEASSURANCE: this.infofactureAregler.AS_CODEASSURANCE,
          STAT_CODESTATUT: this.infofactureAregler.STAT_CODESTATUT,
          SX_CODESEXE: this.infofactureAregler.SX_CODESEXE,
          MC_NUMPIECE: '',
          MC_NUMSEQUENCE: '',
          MC_ANNULATION: '',
          JO_CODEJOURNAL: 'CA',
          MC_REFERENCEPIECE: '',
          MC_LIBELLEOPERATION: '', //`règlement facture: ${libelle_acte} du ${this.session_de_connexion['JT_DATEJOURNEETRAVAIL']}`,
          MC_NOMTIERS: this.infofactureAregler.PT_NOMPRENOMS, //tableau_recu[0]['valeur'],
          MC_CONTACTTIERS: this.infofactureAregler.PT_CONTACT, //tableau_recu[2]['valeur'],
          MC_EMAILTIERS: this.infofactureAregler.PT_EMAIL, //tableau_recu[17]['valeur'],
          MC_NUMPIECETIERS: '',
          MC_TERMINAL: '',
          MC_AUTRE: '',
          MC_AUTRE1: '',
          MC_AUTRE2: '',
          MC_AUTRE3: '',
          TS_CODETYPESCHEMACOMPTABLE: '00002',
          MC_SENSBILLETAGE: 'N',
          MC_LIBELLEBANQUE: '',
          MC_MONTANT_FACTURE: +this.montant_total_facture.replaceAll(' ', ''),
          clsObjetEnvoi: {
            OE_A: this.session_de_connexion['AG_CODEAGENCE'],
            OE_J: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
            OE_Y: this.session_de_connexion['OP_CODEOPERATEUR'],
          },
        };

        table_mode_regl.push(objet);
      });

      let lien_du_service = 'ReglementFacture';

      let body = {
        Objet: table_mode_regl,
      };

      this._adminService
        .AppelServeur(body, lien_du_service)
        .subscribe((success: any) => {
          this.tab_enregistrer_facture = success;

          this._loaderService._hide();

          if (this.tab_enregistrer_facture['SL_RESULTAT'] == 'FALSE') {
            this._alertService.WarningAlert(
              'Information!',
              this.tab_enregistrer_facture['SL_MESSAGE']
            );
          } else {
            this._alertService.SuccessAlert(
              'Succès!',
              `${this.tab_enregistrer_facture['SL_MESSAGE']} <br> <b>${this.tab_enregistrer_facture['NUMEROBORDEREAUREGLEMENT']}</b>`
            );
            console.log(
              'tab_enregistrer_facture',
              this.tab_enregistrer_facture
            );
            // this.Initialisation('EnregistrerFacturePatient');
            this.AllerA('liste');

            let table: any[] = [];
            table.push(this.tab_enregistrer_facture);
            var bodyrecu = {
              Objet: [
                {
                  TABLEMODEREGLEMENT: table_mode_regl,
                },
              ],
            };
            this.tab_enregistrer_facture = table.map(
              // @ts-ignore
              (item) => ({
                ...item,
                objetEnvoi: bodyrecu, // ajouter le body
              })
            );
            $('#modal_affiche_reglement').modal('hide');
            sessionStorage.setItem(
              'recu_operation',
              JSON.stringify(this.tab_enregistrer_facture)
            );
            window.open('/admin/invoice/recu', '_blank');
          }
        });
      (error: any) => {
        this._loaderService._hide();

        this._alertService.ErrorAlert(
          'Erreur!',
          this.tab_enregistrer_facture['SL_MESSAGE']
        );
      };
    } else {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez définir le mode par lequel vous réglez la facture.`
      );
    }
  }

  ChoixAssure(id: any) {
    this.model_patient[16]['afficher'] = false;

    if (id == '01') {
      this.model_patient[16]['afficher'] = true;
      this.ChargerComboAssurance();
    }
  }

  ConvertionDuMontantEnLettre(index: any, index_receive: any) {
    this.model_patient[index_receive]['valeur'] =
      this._toolsService._convertirEnLettre(
        +this.model_patient[index]['valeur'].replaceAll(' ', '')
      );

    /* if (this.model_patient[index_receive]['valeur'].substr(0, 2) == 'un')
      this.model_patient[index_receive]['valeur'] = this.model_patient[
        index_receive
      ]['valeur'].replace('un', ''); */
  }

  AffectationDuMontant(index: any, index_receive: any) {
    this.model_patient[index_receive]['valeur'] = this.model_patient[index][
      'valeur'
    ].replaceAll(' ', '');
    this.model_patient[index_receive]['valeur'] =
      this._toolsService._formaterMontantRecu(
        this.model_patient[index_receive]['valeur']
      );
  }

  AjouterLeModeDeReglement() {
    if (!this.model_patient[8]['valeur']) {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez définir <b>un acte</b>.`
      );
      return;
    }
    if (!this.model_patient[12]['valeur']) {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez définir <b>un mode de règlement</b>.`
      );
      return;
    }
    if (!this.model_patient[9]['valeur']) {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez définir <b>un montant à regler</b>.`
      );
      return;
    }
    if (
      this.model_patient[16]['afficher'] &&
      !this.model_patient[16]['valeur']
    ) {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez préciser <b>une assurance</b>.`
      );
      return;
    }

    let objet = {
      code_mode_reglement: '',
      libelle_mode_reglement: '',
      montant_chiffre: '',
      montant_lettre: '',
      code_acte: '',
      libelle_acte: '',
      code_assurance: '',
      libelle_assurance: '',
    };

    let libelle = '';
    let libelle_acte = '';
    let libelle_assurance = '';
    //@ts-ignore
    this.tab_liste_mode_regl.forEach((element) => {
      if (element['MR_CODEMODEREGLEMENT'] == this.model_patient[12]['valeur'])
        libelle = element['MR_LIBELLE'];
    });

    //@ts-ignore
    this.tab_liste_acte.forEach((element) => {
      if (element['ACT_CODEACTE'] == this.model_patient[8]['valeur'])
        libelle_acte = element['ACT_LIBELLE'];
    });

    //@ts-ignore
    this.tab_liste_assurance.forEach((element) => {
      if (element['AS_CODEASSURANCE'] == this.model_patient[16]['valeur'])
        libelle_assurance = element['AS_LIBELLE'];
    });

    objet['code_mode_reglement'] = this.model_patient[12]['valeur'];
    objet['libelle_mode_reglement'] = libelle;
    objet['montant_chiffre'] = this.model_patient[9]['valeur'];
    objet['montant_lettre'] = this.model_patient[11]['valeur'];
    objet['montant_lettre'] = this.model_patient[11]['valeur'];
    objet['montant_lettre'] = this.model_patient[11]['valeur'];
    objet['code_acte'] = this.model_patient[8]['valeur'];
    objet['libelle_acte'] = libelle_acte;
    objet['code_assurance'] = this.model_patient[16]['valeur'];
    objet['libelle_assurance'] = libelle_assurance;

    this.tab_affiche_mode_regle.push(objet);

    this.montant_total_facture = this.tab_affiche_mode_regle.reduce(
      (acc: any, curVal: any) =>
        acc + parseInt(curVal.montant_chiffre.replaceAll(' ', '')),
      0
    );

    this.montant_total_facture = this._toolsService._formaterMontantRecu(
      this.montant_total_facture
    );

    this.model_patient[12]['valeur'] =
      this.model_patient[9]['valeur'] =
      this.model_patient[11]['valeur'] =
        '';
    this.model_patient[8]['readOnly'] = true;
    this.model_patient[16]['readOnly'] = true;
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

      if (index != 20) element['readOnly'] = false;
      $(`#${element['id']}`).css('background-color', 'white');
    });

    this.tab_affiche_mode_regle = [];
    this.montant_total_facture = 0;
    this._TYPEOPERATION = 0;
    console.log('_TYPEOPERATION', this._TYPEOPERATION);

    this._loaderService._hide();

    if (method == 'ajout')
      this.ChercherLesFactures(this.model_patient_critere, [2, 3]); // this.ChargerLaListeFacture();
    this.facture_selectionnee = {};
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

    switch (etat) {
      case 'solde':
        let lien_du_service = 'edition_solde';

        let body = {
          Objet: [
            {
              AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
              OP_CODEOPERATEUREDITION:
                this.session_de_connexion['OP_CODEOPERATEUR'],
              DATEDEBUT: tableau_recu[18]['valeur'],
              DATEFIN: tableau_recu[19]['valeur'],
              PT_IDPATIENT: this.item_facture['PT_IDPATIENT'],
              FT_CODEFACTURE: this.item_facture['FT_CODEFACTURE'],
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
        break;

      case 'historique facture':
        window.open('/admin/invoice/historique_facture');
        break;

      case 'antecedent':
        window.open('/admin/invoice/antecedent_patient');
        break;
    }
  }

  EtatAAfficher(titre: any, item: any) {
    this.titre_etat = titre;
    this.model_patient[18]['valeur'] = this.model_patient[19]['valeur'] =
      this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    this.item_facture = item;
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
        this.tab_liste_factureAregler['MONTANTAREGLER'] = parseInt(
          this.tab_liste_factureAregler?.MONTANTAREGLER.split('.')[0]
        );
        console.log('tab_liste_factureAregler', this.tab_liste_factureAregler);
        this.total_fact_rest_a_regler =
          this.infofactureAregler?.MONTANT_FACTURE -
          this.tab_liste_factureAregler?.MONTANTAREGLER;
        //  this.tab_liste_factureAregler = this.tab_liste_factureAregler[1];
      });
    (error: any) => {};
  }

  ChargerLaListeFacture() {
    this._loaderService._show();

    if (
      +this.model_patient_critere[7]['valeur'].replaceAll(' ', '') >
      +this.model_patient_critere[8]['valeur'].replaceAll(' ', '')
    ) {
      this._alertService.WarningAlert(
        'Information!',
        `Le montant début ne peut pas être supérieur au montant fin.`
      );
      return;
    }

    let lien_du_service = 'liste_facture_par_type';

    let body = {
      Objet: [
        {
          /*AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          FT_CODEFACTURE: '',
          PT_IDPATIENT: '',
          ACT_CODEACTE: '',
          AS_CODEASSURANCE: '',
          MC_DATESAISIE: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          TYPEOPERATION: '0',*/
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          FT_CODEFACTURE: '',
          PT_IDPATIENT: '',
          ACT_CODEACTE: '',
          PT_NOMPRENOMS: this.model_patient_critere[0]['valeur'],
          PT_CONTACT: '',
          PT_MATRICULE: '',
          PT_CODEPATIENT: '',
          AS_CODEASSURANCE: '',
          MC_DATESAISIE1: this.model_patient_critere[2]['valeur'],
          MC_DATESAISIE2: this.model_patient_critere[3]['valeur'],
          TYPEOPERATION: '0',
          MONTANT1: +this.model_patient_critere[7]['valeur'].replaceAll(
            ' ',
            ''
          ),
          MONTANT2: +this.model_patient_critere[8]['valeur'].replaceAll(
            ' ',
            ''
          ),
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
          this.tab_liste_facture.reverse();
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
  onMenuClick(event: Event, infoFact: any): void {
    event.preventDefault(); // Empêche la redirection naturelle
    this.informationfactures = infoFact;
    // Tu peux ajouter d'autres actions ici si nécessaire
  }

  AnnulationFacture() {
    this._loaderService._show();

    let lien_du_service = 'ExtourneFacture';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          MV_DATEPIECECOMPTABILISATION:
            this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          MC_DATESAISIE: this.informationfactures.MC_DATESAISIE,
          FT_CODEFACTURE: this.informationfactures.FT_CODEFACTURE,
          MV_NUMPIECE3: '',
          OP_CODEOPERATEUR: this.session_de_connexion['OP_CODEOPERATEUR'],
          TYPEOPERATION: '0',
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
        this.tab_reponse = success;

        this._loaderService._hide();

        if (this.tab_reponse.SL_RESULTAT == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_reponse.SL_MESSAGE
          );
        } else {
          this.ChargerLaListeFacture();
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
            PT_NOMPRENOMS: this.model_patient_critere[0]['valeur'],
            PT_CONTACT: '',
            PT_MATRICULE: '',
            PT_CODEPATIENT: '',
            AS_CODEASSURANCE: '',
            MC_DATESAISIE1: this.model_patient_critere[2]['valeur'],
            MC_DATESAISIE2: this.model_patient_critere[3]['valeur'],
            TYPEOPERATION: '0',
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
            this.tab_liste_facture.reverse();
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
    } else {
      this._loaderService._hide();
    }
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
    this.model_patient[6]['valeur'] =
      index == '' ? item['PT_PROFESSION'] : item['PF_CODEPROFESSION']; // Profession
    this.model_patient[7]['valeur'] = item['PT_MATRICULE']; // Matricule
    this.model_patient[10]['valeur'] = item['STAT_CODESTATUT']; // Statut
    this.model_patient[22]['valeur'] = item['PT_CODEPATIENT']; // N° dossier

    this._PT_IDPATIENT = item['PT_IDPATIENT'];
    this._TYPEOPERATION = 7; // cet type operation permet de ne pas creer le patient
    console.log('_TYPEOPERATION', this._TYPEOPERATION);

    const table = [0, 2, 17, 3, 4, 5, 6, 7, 10, 22];

    //@ts-ignore
    table.forEach((element) => {
      this.model_patient[element]['readOnly'] = true;
    });

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
            this.facture_selectionnee?.AS_CODEASSURANCE; // Assurance
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

  SupprimerModeReglement(idx: any) {
    this.tab_affiche_mode_regle.splice(idx, 1);

    this.montant_total_facture = this.tab_affiche_mode_regle.reduce(
      (acc: any, curVal: any) =>
        acc + parseInt(curVal.montant_chiffre.replaceAll(' ', '')),
      0
    );

    this.montant_total_facture = this._toolsService._formaterMontantRecu(
      this.montant_total_facture
    );
  }

  ngOnInit(): void {
    this.model_patient_critere[2]['valeur'] =
      this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    this.model_patient_critere[3]['valeur'] =
      this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    // this.ChargerLaListeFacture();
    this.SoldeCompteOp();

    this.Initialisation('ngOnInit');

    console.log('session_patient', this.session_patient);
    if (sessionStorage.getItem('info_patient_pour_facture')) {
      this.SelectionnerLaFacture(this.session_patient, '');
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('info_patient_pour_facture');
  }

  ngAfterViewInit() {}
}
