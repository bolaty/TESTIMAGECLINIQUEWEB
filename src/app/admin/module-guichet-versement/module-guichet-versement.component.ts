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
  selector: 'app-module-guichet-versement',
  templateUrl: './module-guichet-versement.component.html',
  styleUrls: ['./module-guichet-versement.component.scss']
})
export class ModuleGuichetVersementComponent {
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  ComboTypeshemacomptable:any=[]
  tab_RetourEnregistrement:any=[]
  ListeCaracteristiques:any=[]
  ComboTypespiece:any=[]
  tab_liste_patient:any=[]
  TableauEnvoi:any=[]
  infoPatientselect:any={}
  page:boolean=false
  vapTypeCodeSchemaComptable:any=''
  LibelleOperation:any=''
  statutlibelle:any=''
  resultat:any=0
  vapSensBilletage:any
  Bordereau:any=''
  solde_compte_op: any;
  tab_solde: any = [];
  tab_liste_mode_regl:any=[]
  model_guichet: any[] = [
    // 0
    {
      id: 'idNumdossier',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Numéro dossier',
      afficher: true,
      readOnly: false,
    },
    // 1
    {
      id: 'idnom',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'nom',
      afficher: true,
      readOnly: false,
    },
    // 2
    {
      id: 'idtypepiece',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'type piece',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idNpiece',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Numéro piece',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idRemettant',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Remettant',
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'idContact',
      type: 'telephone_extra',
      valeur: '',
      obligatoire: 'N',
      label: "contact",
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idRefpiece',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Reference Piece',
      afficher: true,
      readOnly: true,
    },
    // 7
    {
      id: 'idAutreLibelle',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Autre Libelle',
      afficher: true,
      readOnly: true,
    },
    // 8
    {
      id: 'idModeReglement',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Mode de Reglement',
      afficher: true,
      readOnly: true,
    }
  ];
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
  selectCompte() {
    this.ChargerLaListePatient()
   
  }

  chargementComboTypeshemacomptable() {
    let Option = 'pvgComboTypeshemacomptableVersement';
    let body = {
      Objet: [
        {
          
        },
      ],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboTypeshemacomptable = success;

        if (this.ComboTypeshemacomptable[0].SL_RESULTAT == 'TRUE') {
          this.ComboTypeshemacomptable = this.ComboTypeshemacomptable[1];
         this._loaderService._hide();
         this.chargementComboTypespiece()
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboTypeshemacomptable[0].SL_RESULTAT
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
  chargementComboTypespiece() {
    let Option = 'pvgComboTypespiece';
    let body = {
      Objet: [
        {
          
        },
      ],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboTypespiece = success;
        if (this.ComboTypespiece[0].SL_RESULTAT == 'TRUE') {
          this.ComboTypespiece = this.ComboTypespiece[1];
          this.ChargerComboModeDeReglement()
         this._loaderService._hide();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboTypespiece[0].SL_RESULTAT
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
        this.chargementComboTypeshemacomptable();
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_mode_regl['SL_MESSAGE']
      );
    };
  }

  ChargerLaListePatient() {
    

    if(this.model_guichet[0]['valeur'] == "" && this.model_guichet[1]['valeur'] == "") return
    this._loaderService._show();
    let lien_du_service = 'ListePatient';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PT_CODEPATIENT: this.model_guichet[0]['valeur'].trim(),
          PT_MATRICULE:  "",
          PT_NOMPRENOMS:  this.model_guichet[1]['valeur'].trim(),
          DATEDEBUT:  "01/01/1900",
          DATEFIN:  this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          STAT_CODESTATUT:  "",
          PT_CONTACT:  "",
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
          $('#centermodal').modal('hide');
        } else {
          this.tab_liste_patient = this.tab_liste_patient[1];
          console.log('tab_liste_patient', this.tab_liste_patient);
          $('#centermodal').modal('show');
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

  selectPatient(infoPatient:any){
    this.infoPatientselect = infoPatient
    this.model_guichet[0]['valeur'] = infoPatient.PT_CODEPATIENT
    this.model_guichet[1]['valeur'] = infoPatient.PT_NOMPRENOMS
    this.model_guichet[0]['readOnly'] = true
    this.model_guichet[1]['readOnly'] = true
    this.SchemaComptable(this.vapTypeCodeSchemaComptable)
    $('#centermodal').modal('hide');
  }
  ChargerComboModeDeReglement() {

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
            if (element['MR_CODEMODEREGLEMENT'] == '006' || element['MR_CODEMODEREGLEMENT'] == '007' || element['MR_CODEMODEREGLEMENT'] == '008')
              this.tab_liste_mode_regl.splice(idx, 1);
          });

          
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

// soumettre le formulaire d'Enregistrement
EnregistrerGuichet(tableau_recu: any) {
    if(tableau_recu[5].valeur != ''){
      tableau_recu[5].obligatoire = 'O'
    }
    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;
    
    //recuperration libelle mode de reglement 
   
    var MR_LIBELLE =  this.tab_liste_mode_regl.find(//@ts-ignore
      (element) =>
        element.MR_CODEMODEREGLEMENT == this.model_guichet[8]['valeur']
    )?.MR_LIBELLE
   var PT_CONTACT = this.model_guichet[5]['valeur']
   if(this.model_guichet[5]['valeur'] == ''){
    PT_CONTACT = this.infoPatientselect.PT_CONTACT
   }

    let Options =  'pvgAjouterComptabilisation';
    this.TableauEnvoi = [];
    for (let i = 0; i < this.ListeCaracteristiques.length; i++) {
      let ObjetEnvoi = {
        
        "AG_CODEAGENCE": this.session_de_connexion['AG_CODEAGENCE'].toString(),
        "MC_DATEPIECE": this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
        "MC_NUMPIECE": "",
        "MC_NUMSEQUENCE": "",
        "MR_CODEMODEREGLEMENT": this.model_guichet[8]['valeur'],//"001",
        "PT_IDPATIENT": "",//this.infoPatientselect.PT_IDPATIENT,
        "FT_CODEFACTURE": "",
        "OP_CODEOPERATEUR": this.session_de_connexion['OP_CODEOPERATEUR'],
        "MC_MONTANTDEBIT": "0",
        "MC_MONTANTCREDIT": "0",
        "MC_DATESAISIE": this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
        "MC_ANNULATION": "N",
        "JO_CODEJOURNAL": this.ListeCaracteristiques[i].JO_CODEJOURNAL,
        "MC_REFERENCEPIECE": this.model_guichet[6]['valeur'].trim(),
        /*"MC_LIBELLEOPERATION": this.model_guichet[7]['valeur'] != ''
        ? this.ListeCaracteristiques[i].SC_LIBELLE +
          ' PAR : ' + MR_LIBELLE + '  | ' +
          this.model_guichet[7]['valeur'] + '  | ' + this.model_guichet[5]['valeur'] + ' | ' + this.model_guichet[4]['valeur'] + ' | ' + this.infoPatientselect.PT_CODEPATIENT + ' | ' + this.infoPatientselect.PT_MATRICULE
        : this.ListeCaracteristiques[i].SC_LIBELLE,*/
        "MC_LIBELLEOPERATION": 
        this.ListeCaracteristiques[i].SC_LIBELLE + ' PAR : ' + MR_LIBELLE + '  / ' +
          this.model_guichet[7]['valeur'] + ' N° DOSSIER: ' + this.infoPatientselect.PT_CODEPATIENT + 
        ' | MATRICULE:' + this.infoPatientselect.PT_MATRICULE + ' | NOM ET PRENOMS:'  + this.infoPatientselect.PT_NOMPRENOMS + 
        ' | TELEPHONE:' + PT_CONTACT + 
        ' | STATUT:'   + this.infoPatientselect.STAT_LIBELLE ,
        "PL_CODENUMCOMPTE": "",//this.session_de_connexion['PL_CODENUMCOMPTE'],
        "MC_NOMTIERS": this.model_guichet[4]['valeur'] == ''
        ? this.model_guichet[1]['valeur']
        : this.model_guichet[4]['valeur'],
        "MC_CONTACTTIERS":  this.infoPatientselect.PT_CONTACT == ''
        ? this.model_guichet[5]['valeur']
        : this.infoPatientselect.PT_CONTACT,
        "MC_EMAILTIERS": this.infoPatientselect.PT_EMAIL,
        "MC_NUMPIECETIERS": this.model_guichet[3]['valeur'],
        "MC_TERMINAL": "",
        "MC_AUTRE": "",
        "MC_AUTRE1": "",
        "MC_AUTRE2": "",
        "MC_AUTRE3": "",
        "TS_CODETYPESCHEMACOMPTABLE":  this.ListeCaracteristiques[i].TS_CODETYPESCHEMACOMPTABLE,
        "EM_MONTANT": this.ListeCaracteristiques[0].SC_MONTANTNUMERIQUE.toString()
        .replaceAll(/\s/g, ''),// this.resultat.toString(), 
        "MC_SENSBILLETAGE": "N",
        "MC_LIBELLEBANQUE": "",
      };


      if (
        this.ListeCaracteristiques[i].SC_SENS == 'D' 
      ) {
        ObjetEnvoi.MC_MONTANTDEBIT = this.resultat.toString() 
        ObjetEnvoi.MC_MONTANTCREDIT = '0'
      } 

      if (
        this.ListeCaracteristiques[i].SC_SENS == 'C' 
      ) {
        ObjetEnvoi.MC_MONTANTDEBIT = '0'
        ObjetEnvoi.MC_MONTANTCREDIT = this.resultat.toString()
      } 

     /* if (
        this.ListeCaracteristiques[i].SC_SENSBILLETAGE == 'E' ||
        this.ListeCaracteristiques[i].SC_SENSBILLETAGE == 'S'
      ) {
        if (this.session_de_connexion['PL_CODENUMCOMPTECAISSE'] != '') {
          ObjetEnvoi.PL_CODENUMCOMPTE =
          this.session_de_connexion['PL_CODENUMCOMPTECAISSE']
        } else {
          ObjetEnvoi.PL_CODENUMCOMPTE =
            this.ListeCaracteristiques[i].PL_CODENUMCOMPTE;
        }
      } else {
        ObjetEnvoi.PL_CODENUMCOMPTE =
          this.ListeCaracteristiques[i].PL_CODENUMCOMPTE;
      }*/


      if (
        this.ListeCaracteristiques[i].SC_CHOIXCOMPTE == 'CLT' 
      ) {
        ObjetEnvoi.PT_IDPATIENT = this.infoPatientselect.PT_IDPATIENT
        ObjetEnvoi.PL_CODENUMCOMPTE = this.infoPatientselect.PL_CODENUMCOMPTE
      }


      if (
        this.ListeCaracteristiques[i].SC_CHOIXCOMPTE == 'OPE' 
      ) {
        ObjetEnvoi.PT_IDPATIENT = ''
        if (this.session_de_connexion['PL_CODENUMCOMPTECAISSE'] != '') {
          ObjetEnvoi.PL_CODENUMCOMPTE =
          this.session_de_connexion['PL_CODENUMCOMPTECAISSE']
        } else {
          ObjetEnvoi.PL_CODENUMCOMPTE =
            this.ListeCaracteristiques[i].PL_CODENUMCOMPTE;
        }
      }
     
      ObjetEnvoi.MC_NUMSEQUENCE = this.ListeCaracteristiques[i].SC_NUMEROORDRE;
      ObjetEnvoi.TS_CODETYPESCHEMACOMPTABLE =
        this.ListeCaracteristiques[i].TS_CODETYPESCHEMACOMPTABLE;
      ObjetEnvoi.EM_MONTANT = this.resultat.toString(); //this.ListeCaracteristiques[i].SC_MONTANTNUMERIQUE;
     // ObjetEnvoi.SC_LIGNECACHEE = this.ListeCaracteristiques[i].SC_LIGNECACHEE;
      ObjetEnvoi.MC_SENSBILLETAGE =
        this.ListeCaracteristiques[i].SC_SENSBILLETAGE;
      if (
        ObjetEnvoi.PL_CODENUMCOMPTE == '' ||
        ObjetEnvoi.PL_CODENUMCOMPTE == undefined ||
        ObjetEnvoi.PL_CODENUMCOMPTE == null
      ) {
        ObjetEnvoi.PL_CODENUMCOMPTE = '';
      }
      this.TableauEnvoi.push(ObjetEnvoi);
    }
   
    let body = {
      Objet: this.TableauEnvoi
    };
    //ETAPE 4  : continuer AVEC la methode habituelle merciii
    this._adminService.AppelServeur(body, Options).subscribe((success: any) => {
      this.tab_RetourEnregistrement = success;

      this._loaderService._hide();

      if (this.tab_RetourEnregistrement.SL_RESULTAT == 'FALSE') {
        this._alertService.WarningAlert(
          'Information!',
          this.tab_RetourEnregistrement.SL_MESSAGE
        );
        
      } else {
        //this.tab_RetourEnregistrement = this.tab_RetourEnregistrement[1];
        this._alertService.SuccessAlert(
          'Succès!',
          `${this.tab_RetourEnregistrement['SL_MESSAGE']} <br> <b>${this.tab_RetourEnregistrement['NUMEROBORDEREAU']}</b>`
        );
        this.Bordereau = this.tab_RetourEnregistrement['NUMEROBORDEREAU']
        this.model_guichet[0]['readOnly'] = false
        this.model_guichet[1]['readOnly'] = false

        let table: any[] = [];
            table.push(this.tab_RetourEnregistrement);
            var bodyrecu = {
              Objet: [
                {
                  TABLEMODEREGLEMENT: this.TableauEnvoi,
                },
              ],
            };
            this.tab_RetourEnregistrement = table.map(
              // @ts-ignore
              (item) => ({
                ...item,
                objetEnvoi: bodyrecu, // ajouter le body
              })
            );
            $('#modal_affiche_reglement').modal('hide');
            sessionStorage.setItem(
              'recu_operation',
              JSON.stringify(this.tab_RetourEnregistrement)
            );
            window.open('/admin/invoice/recu', '_blank');
        this.ListeCaracteristiques = []
        this.Initialisation()
      }
    });
  (error: any) => {
    this._loaderService._hide();

    this._alertService.ErrorAlert(
      'Erreur!',
      this.tab_RetourEnregistrement['SL_MESSAGE']
    );
  };
  
}





  ChoixEcran(info: any, libelle: any) {
    this.Initialisation()
    this.page = true;
    this.vapTypeCodeSchemaComptable = info.TS_CODETYPESCHEMACOMPTABLE;
    this.LibelleOperation = libelle
    if (libelle.includes('VERSEMENT')) {
      this.statutlibelle = 'Nom remettant';
      this.model_guichet[2]['obligatoire'] = 'N'
      this.model_guichet[3]['obligatoire'] = 'N'
    }
    if (libelle.includes('RETRAIT')) {
      this.statutlibelle = 'Retrait effectué par';
     this.model_guichet[2]['obligatoire'] = 'O'
      this.model_guichet[3]['obligatoire'] = 'O'
    }

    this.model_guichet[0]['readOnly'] = false
    this.model_guichet[1]['readOnly'] = false
  }

  SchemaComptable(schema:any) {
    this.ListeCaracteristiques = []
    let Option = 'pvgChargerDansDataSetSC_SCHEMACOMPTABLECODE';
    let body = {
      "Objet": [
        {
            "TS_CODETYPESCHEMACOMPTABLE": schema
        }
    ]
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeCaracteristiques = success;

        if (this.ListeCaracteristiques[0].SL_RESULTAT == 'TRUE') {
          this.ListeCaracteristiques = this.ListeCaracteristiques[1];
         this._loaderService._hide();
         for (let i = 0; i < this.ListeCaracteristiques.length; i++) {
          if (
            this.ListeCaracteristiques[i].SC_SENSBILLETAGE == 'E' ||
            this.ListeCaracteristiques[i].SC_SENSBILLETAGE == 'S'
          ) {
            this.vapSensBilletage =
              this.ListeCaracteristiques[i].SC_SENSBILLETAGE;
          }
        }
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ListeCaracteristiques[0].SL_RESULTAT
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

  CalculMontant(infomontant: any) {
    var regexMontant = '^[0-9]{1,15}$';
    infomontant = infomontant.toString().replace(/ /g, '');
    if (!infomontant.match(regexMontant)) {
      this._alertService.ErrorAlert( 'Information!',
        'Veuillez renseigner correctement le montant'
      );
    } else {
      this.resultat = parseInt(infomontant);
    
    }
 
  }
  FormatageMontantAlaSaisie(event: any) {
    console.log('event', event);
    // return;
    if (
      event.data == '0' ||
      event.data == '1' ||
      event.data == '2' ||
      event.data == '3' ||
      event.data == '4' ||
      event.data == '5' ||
      event.data == '6' ||
      event.data == '7' ||
      event.data == '8' ||
      event.data == '9' ||
      event.data == null
    ) {
      // Supprimez tous les séparateurs de milliers actuels (espaces)
      var valeur =
        this.ListeCaracteristiques[0].SC_MONTANTNUMERIQUE.toString().replaceAll(/\s/g, '');
        

      // Vérifiez si l'entrée est un nombre valide
      var montantNumerique = Number(valeur);
      if (!isNaN(montantNumerique)) {
        // Formatez le montant en ajoutant un espace comme séparateur de milliers
        var montantFormate = '';
        var longueur = valeur.length;

        for (var i = 0; i < longueur; i++) {
          montantFormate += valeur[i];
          if ((longueur - i - 1) % 3 === 0 && i !== longueur - 1) {
            montantFormate += ' ';
          }
        }

        // Mettez à jour le champ de saisie avec le montant formaté
        this.ListeCaracteristiques[0].SC_MONTANTNUMERIQUE =
          montantFormate == '' ? '0' : montantFormate;
      } else {
        this._alertService.ErrorAlert('Information!',
          'Veuillez saisir un montant valide.'
        );
      }
    } else {
      this.ListeCaracteristiques[0].SC_MONTANTNUMERIQUE =
        this.ListeCaracteristiques[0].SC_MONTANTNUMERIQUE.replace(/\D/g, '');

      setTimeout(() => {
        valeur = this.ListeCaracteristiques[0].SC_MONTANTNUMERIQUE;

        // Vérifiez si l'entrée est un nombre valide
        var montantNumerique = Number(valeur);
        if (!isNaN(montantNumerique)) {
          // Formatez le montant en ajoutant un espace comme séparateur de milliers
          var montantFormate = '';
          var longueur = valeur.length;

          for (var i = 0; i < longueur; i++) {
            montantFormate += valeur[i];
            if ((longueur - i - 1) % 3 === 0 && i !== longueur - 1) {
              montantFormate += ' ';
            }
          }

          // Mettez à jour le champ de saisie avec le montant formaté
          this.ListeCaracteristiques[0].SC_MONTANTNUMERIQUE =
            montantFormate == '' ? '0' : montantFormate;
        }
      }, 1000);
    }
  }
  Initialisation() {
    this.model_guichet.forEach((element, index) => {
       element['valeur'] = '';
    });
   
  }

  ngOnInit(): void {
    this.Initialisation()
    this.SoldeCompteOp()
    
  }
}
