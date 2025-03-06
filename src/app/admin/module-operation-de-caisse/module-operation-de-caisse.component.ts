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
import { LiteralArray } from '@angular/compiler';

declare var $: any;

@Component({
  selector: 'app-module-operation-de-caisse',
  templateUrl: './module-operation-de-caisse.component.html',
  styleUrls: ['./module-operation-de-caisse.component.scss'],
})
export class ModuleOperationDeCaisseComponent implements OnInit, AfterViewInit {
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

  solde_compte_op: any;
  tab_solde: any = [];
  tab_liste_gerant: any = [];
  tab_enregistrer_operation: any = [];
  tab_liste_operation: any = [];
  tab_liste_famille_operation: any = [];
  tab_liste_mode_regl: any = [];
  // Variable pour stocker les modes de règlement filtrés
  filteredModesReglement: any[] = [];
  montant_total_facture: any = 0;
  tab_affiche_mode_regle: any = [];
  model_op_caisse: any[] = [
    // 0
    {
      id: 'idFamilleOperation',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "famille d'opération",
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idOperation',
      type: 'text',
      valeur: '',
      tab_valeur: [],
      obligatoire: 'N',
      label: 'opération',
      afficher: true,
      readOnly: true,
    },
    // 2
    {
      id: 'idRefPiece',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'référence de la pièce',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idLibelleOperation',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "libellé de l'opération",
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idContact',
      type: 'telephone_extra',
      valeur: '',
      obligatoire: 'N',
      label: 'contact',
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'idEmail',
      type: 'email',
      valeur: '',
      obligatoire: 'N',
      label: 'email',
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idIntituleOp',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "intitulé de l'opération",
      afficher: true,
      readOnly: true,
    },
    // 7
    {
      id: 'idMontant',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant',
      afficher: true,
      readOnly: true,
    },
    // 8
    {
      id: 'idMontantTotal',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'total',
      afficher: true,
      readOnly: true,
    },
    // 9
    {
      id: 'idNomRecepteur',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'total',
      afficher: true,
      readOnly: true,
    },
    // 10
    {
      id: 'idModeReglement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mode de règlement',
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
      id: 'idNumCheque',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° cheque',
      afficher: true,
      readOnly: true,
    },
    // 13
    {
      id: 'idBanque',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'banque',
      afficher: true,
      readOnly: true,
    },
    // 14
    {
      id: 'idNumVirement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° virement',
      afficher: true,
      readOnly: true,
    },
    // 15
    {
      id: 'idOperateur',
      type: 'text',
      valeur: '',
      tab_valeur: [],
      obligatoire: 'N',
      label: 'opérateur',
      afficher: false,
      readOnly: true,
    },
  ];
  // Fonction déclenchée au changement de la famille d'opération

  EmailtoLowerCase(champ: any) {
    this.model_op_caisse[5]['valeur'] = champ.toLowerCase();
  }

  EnregistrerOpDeCaisse(tableau_recu: any, table_index: any) {
    if (tableau_recu[5]['valeur'] != '')
      tableau_recu[5]['valeur'] = tableau_recu[5]['valeur'].toLowerCase();

    if (
      this.tab_affiche_mode_regle.length == 0 ||
      (tableau_recu[12]['afficher'] && tableau_recu[12]['valeur'] == '') ||
      (tableau_recu[13]['afficher'] && tableau_recu[13]['valeur'] == '') ||
      (tableau_recu[14]['afficher'] && tableau_recu[14]['valeur'] == '')
    ) {
      // @ts-ignore
      tableau_recu.forEach((element) => {
        element['obligatoire'] = 'N';
      });

      // ajout de champ obligatoire dynamique
      table_index.push(9);
      if (tableau_recu[12]['afficher'] && tableau_recu[13]['afficher']) {
        table_index.push(12, 13);
      } else if (tableau_recu[13]['afficher'] && tableau_recu[14]['afficher']) {
        table_index.push(13, 14);
      }

      if (tableau_recu[15]['afficher']) {
        table_index.push(15);
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
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;
    if (this.tab_affiche_mode_regle.length != 0) {
      this._loaderService._show();

      let libelle_operation = '';
      // @ts-ignore
      this.tab_liste_operation.forEach((element) => {
        if (tableau_recu[1]['valeur'] == element['OP_CODEOPERATION']) {
          libelle_operation = element['OP_LIBELLE'];
        }
      });

      let table_mode_regl: any[] = [];
      // @ts-ignore
      this.tab_affiche_mode_regle.forEach((element) => {
        let objet = {
          MR_CODEMODEREGLEMENT: element['code_mode_reglement'],
          MR_LIBELLEMODEREGLEMENT: element['libelle_mode_reglement'],
          MC_MONTANTDEBIT: '',
          MC_MONTANTCREDIT: +element['montant_chiffre'].replaceAll(' ', ''),
          MC_NUMPIECE: '',
          MC_NUMSEQUENCE: '',
          MC_ANNULATION: '',
          JO_CODEJOURNAL: 'CA',
          MC_REFERENCEPIECE: tableau_recu[2]['valeur'],
          MC_LIBELLEOPERATION: tableau_recu[3]['valeur'], //`opération de caisse: ${libelle_operation} du ${this.session_de_connexion['JT_DATEJOURNEETRAVAIL']}`,
          MC_NOMTIERS: tableau_recu[9]['valeur'],
          MC_CONTACTTIERS: tableau_recu[4]['valeur'],
          MC_EMAILTIERS: tableau_recu[5]['valeur'],
          MC_NUMPIECETIERS: '',
          MC_TERMINAL: '',
          MC_AUTRE: '',
          MC_AUTRE1: '',
          MC_AUTRE2: '',
          MC_AUTRE3: '',
          TS_CODETYPESCHEMACOMPTABLE: this.tab_liste_operation.find(
            //@ts-ignore
            (element) =>
              element.OP_CODEOPERATION == this.model_op_caisse[1]['valeur']
          )?.TS_CODETYPESCHEMACOMPTABLE,
          MC_SENSBILLETAGE: 'N',
          MC_LIBELLEBANQUE: '',
          MC_MONTANT_FACTURE: +this.montant_total_facture.replaceAll(' ', ''),
          OP_CODEOPERATEURPASSATIONFOND: tableau_recu[15]['valeur'],
        };

        table_mode_regl.push(objet);
      });

      let lien_du_service = 'operation_de_caisse';

      let body = {
        Objet: [
          {
            AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
            PT_DATESAISIE: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
            OP_CODEOPERATEUR: this.session_de_connexion['OP_CODEOPERATEUR'],
            OP_CODEOPERATION: tableau_recu[1]['valeur'],
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
          this.tab_enregistrer_operation = success;

          this._loaderService._hide();

          if (this.tab_enregistrer_operation['SL_RESULTAT'] == 'FALSE') {
            this._alertService.WarningAlert(
              'Information!',
              this.tab_enregistrer_operation['SL_MESSAGE']
            );
          } else {
            this._alertService.SuccessAlert(
              'Succès!',
              `${this.tab_enregistrer_operation['SL_MESSAGE']} <br> <b>${this.tab_enregistrer_operation['NUMEROBORDEREAUREGLEMENT']}</b>`
            );
            console.log(
              'tab_enregistrer_operation',
              this.tab_enregistrer_operation
            );
            this.Initialisation('EnregistrerOpDeCaisse');

            let table: any[] = [];
            table.push(this.tab_enregistrer_operation);
            this.tab_enregistrer_operation = table.map(
              // @ts-ignore
              (item) => ({
                ...item,
                objetEnvoi: body, // ajouter le body
              })
            );

            sessionStorage.setItem(
              'recu_operation',
              JSON.stringify(this.tab_enregistrer_operation)
            );
            window.open('/admin/invoice/recu', '_blank');
            console.log(
              'tab_enregistrer_operation',
              this.tab_enregistrer_operation
            );
          }
        });
      (error: any) => {
        this._loaderService._hide();

        this._alertService.ErrorAlert(
          'Erreur!',
          this.tab_enregistrer_operation['SL_MESSAGE']
        );
      };
    } else {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez définir le mode par lequel vous réglez l'opération.`
      );
    }
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_op_caisse.forEach((element, index) => {
      if (index != 4) element['valeur'] = '';
      else element['valeur'] = '225';

      if (index == 12 || index == 13 || index == 14)
        element['afficher'] = false;

      $(`#${element['id']}`).css('background-color', 'white');
    });

    this.montant_total_facture = 0;
    this.tab_affiche_mode_regle = [];
    this.SoldeCompteOp();
    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ChoixDeLOperationOld(valeur: any) {
    this.model_op_caisse[1]['tab_valeur'][0] = valeur['OP_SENS'];
    this.model_op_caisse[1]['tab_valeur'][1] = valeur['PL_CODENUMCOMPTE'];
    this.model_op_caisse[6]['valeur'] = this.model_op_caisse[1][
      'tab_valeur'
    ][2] = valeur['OP_LIBELLE']; //valeur['NT_LIBELLEFAMILLEOPERATIONDETAIL'];
    this.model_op_caisse[1]['tab_valeur'][3] =
      valeur['FO_CODEFAMILLEOPERATION'];
    this.model_op_caisse[1]['tab_valeur'][2] =
      valeur['TS_CODETYPESCHEMACOMPTABLE'];
  }

  ChoixDeLOperation() {
    let valeur = this.tab_liste_operation.find(
      //@ts-ignore
      (element) => element.OP_CODEOPERATION == this.model_op_caisse[1]['valeur']
    )?.OP_LIBELLE;
    // @ts-ignore
    this.tab_liste_operation.forEach((element) => {
      if (valeur.includes('PASSATION DE FONDS')) {
        this.model_op_caisse[15]['afficher'] = true;
      } else {
        this.model_op_caisse[15]['afficher'] = false;
      }
    });
  }

  AjouterLeModeDeReglement() {
    if (
      this.model_op_caisse[10]['valeur'] &&
      this.model_op_caisse[7]['valeur'] &&
      this.model_op_caisse[11]['valeur'] != ''
    ) {
      let objet = {
        code_mode_reglement: '',
        libelle_mode_reglement: '',
        montant_chiffre: '',
        montant_lettre: '',
      };

      let libelle = '';
      let code_mdr = '';
      //@ts-ignore
      this.tab_liste_mode_regl.forEach((element) => {
        if (
          element['MR_CODEMODEREGLEMENT'] == this.model_op_caisse[10]['valeur']
        ) {
          libelle = element['MR_LIBELLE'];
          code_mdr = element['MR_CODEMODEREGLEMENT'];
        }
      });

      objet['code_mode_reglement'] = code_mdr;
      objet['libelle_mode_reglement'] = libelle;
      objet['montant_chiffre'] = this.model_op_caisse[7]['valeur'];
      objet['montant_lettre'] = this.model_op_caisse[11]['valeur'];

      this.tab_affiche_mode_regle.push(objet);

      this.montant_total_facture = this.tab_affiche_mode_regle.reduce(
        (acc: any, curVal: any) =>
          acc + parseInt(curVal.montant_chiffre.replaceAll(' ', '')),
        0
      );

      this.montant_total_facture = this._toolsService._formaterMontantRecu(
        this.montant_total_facture
      );

      this.model_op_caisse[10]['valeur'] =
        this.model_op_caisse[7]['valeur'] =
        this.model_op_caisse[11]['valeur'] =
          '';
    } else {
      this._alertService.WarningAlert(
        'Information!',
        `Veuillez définir un mode de règlement et préciser le montant du règlement.`
      );
    }
  }

  ConvertionDuMontantEnLettre(index: any, index_receive: any) {
    this.model_op_caisse[index_receive]['valeur'] =
      this._toolsService._convertirEnLettre(
        +this.model_op_caisse[index]['valeur'].replaceAll(' ', '')
      );

    /* if (this.model_op_caisse[index_receive]['valeur'].substr(0, 2) == 'un')
      this.model_op_caisse[index_receive]['valeur'] = this.model_op_caisse[
        index_receive
      ]['valeur'].replace('un', ''); */
  }

  ChoixDuModeReglement(code_element: any) {
    this.model_op_caisse.forEach((element, index) => {
      if (index == 12 || index == 13 || index == 14)
        element['afficher'] = false;
    });

    if (code_element == 6) {
      this.model_op_caisse[12]['afficher'] = this.model_op_caisse[13][
        'afficher'
      ] = true;
    } else if (code_element == 7) {
      this.model_op_caisse[13]['afficher'] = this.model_op_caisse[14][
        'afficher'
      ] = true;
    }
  }

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
          // @ts-ignore
          this.tab_liste_mode_regl.forEach((element, idx) => {
            if (element['MR_CODEMODEREGLEMENT'] == '009')
              this.tab_liste_mode_regl.splice(idx, 1);
          });
          this.ChargerComboFamilleOperation();
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

  ChargerComboFamilleOperation() {
    let lien_du_service = 'famille_operation';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_famille_operation = success;

        this._loaderService._hide();
        if (this.tab_liste_famille_operation[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_famille_operation['SL_MESSAGE']
          );
        } else {
          this.tab_liste_famille_operation =
            this.tab_liste_famille_operation[1];
          console.log(
            'tab_liste_famille_operation',
            this.tab_liste_famille_operation
          );
        }

        this.ChargerComboGerant();
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_famille_operation['SL_MESSAGE']
      );
    };
  }

  ChargerComboOperation(code_famille_op: any) {
    this._loaderService._show();

    let lien_du_service = 'operation';

    let body = {
      Objet: [
        {
          FO_CODEFAMILLEOPERATION: code_famille_op,
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_operation = success;

        this._loaderService._hide();
        if (this.tab_liste_operation[0]['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_operation['SL_MESSAGE']
          );
        } else {
          this.tab_liste_operation = this.tab_liste_operation[1];
          console.log('tab_liste_operation', this.tab_liste_operation);
           // Vérifie si la famille d'opération est "Transfert d'argent"
          if (code_famille_op == '005') { // Remplace par le vrai code
            this.filteredModesReglement = this.tab_liste_mode_regl.filter(//@ts-ignore
              (item) => item.MR_LIBELLE === 'ESPECE'
            );
          } else {
            // Sinon, restaurer tous les modes de règlement
            this.filteredModesReglement = [...this.tab_liste_mode_regl];
          }
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_operation['SL_MESSAGE']
      );
    };
  }

  ChargerComboGerant() {
    let lien_du_service = 'pvgComboOperateurCaisse';

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

          // @ts-ignore
          this.tab_liste_gerant.forEach((element, idx) => {
            if (
              element['OP_CODEOPERATEUR'] ==
              this.session_de_connexion['OP_CODEOPERATEUR']
            )
              this.tab_liste_gerant.splice(idx, 1);
          });

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

        console.log('tab_solde', this.tab_solde);
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_mode_regl['SL_MESSAGE']
      );
    };
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
    this.ChargerComboModeDeReglement();
    this.Initialisation('ngOnInit');
  }

  ngAfterViewInit() {}
}
