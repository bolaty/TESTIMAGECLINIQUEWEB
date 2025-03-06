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
  selector: 'app-module-od-ordinaire',
  templateUrl: './module-od-ordinaire.component.html',
  styleUrls: ['./module-od-ordinaire.component.scss']
})
export class ModuleOdOrdinaireComponent {
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  ComboJournal: any = [];
  ComboTypeTiers: any = [];
  Soldecompte: any =0;
  Soldecomptetiers: any =0;
  Soldeoperation: any =0;
  //formOperationDivers:any={}
  formOperationDivers: any[] = [
    //dans cet objet afficher: false, permet de cacher l'element dans le tableau afficher
    // 0
    {
      id: 'idJournal',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Journal',
      afficher: false,
      readOnly: false,
    },
    // 1
    {
      id: 'idTypetiers',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Type tiers',
      afficher: false,
      readOnly: true,
    },
    // 2
    {
      id: 'idDatepiece',
      type: 'text',
      valeur: this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
      obligatoire: 'O',
      label: 'Date piece',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idComptegeneral',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Numéro Compte general',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idComptetiers',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "Compte tiers",
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'idReferencepiece',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: "Reference piece",
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idLibelleoperation',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Libelle opération',
      afficher: true,
      readOnly: true,
    },
    // 7
    {
      id: 'idDebit',
      type: 'text',
      valeur: '0',
      obligatoire: 'N',
      label: 'Debit',
      afficher: true,
      readOnly: true,
    },
    // 8
    {
      id: 'idCredit',
      type: 'text',
      valeur: '0',
      obligatoire: 'N',
      label: 'Credit',
      afficher: true,
      readOnly: true,
    },
    // 9
    {
      id: 'idPatient',
      type: 'text',
      valeur: '0',
      obligatoire: 'N',
      label: 'Patient',
      afficher: false,
      readOnly: true,
    },
    // 10
    {
      id: 'idPlCodeNumCompte',
      type: 'text',
      valeur: '0',
      obligatoire: 'N',
      label: 'PlCodeNumCompte',
      afficher: false,
      readOnly: true,
    },
    // 11
    {
      id: 'idNomtiers',
      type: 'text',
      valeur: '0',
      obligatoire: 'N',
      label: 'Nomtiers',
      afficher: false,
      readOnly: true,
    },
    // 12
    {
      id: 'idContacttiers',
      type: 'text',
      valeur: '0',
      obligatoire: 'N',
      label: 'Contacttiers',
      afficher: false,
      readOnly: true,
    },
    // 13
    {
      id: 'idEmailtiers',
      type: 'text',
      valeur: '0',
      obligatoire: 'N',
      label: 'Emailtiers',
      afficher: false,
      readOnly: true,
    }
  ];

  InformationCompteTiers:any;
  InfoNumCompteTiers: any=[]
  InfoNumCompteGnrl: any=[]
  tab_liste_patient: any=[]
  ComboNumCompte: any=[]
  TableauEnvoi: any=[]
  tab_RetourEnregistrement: any=[]
  Bordereau: any

  totalDebit: number = 0;
  totalCredit: number = 0;
  difference: number = 0;
  index: any; // Stocke l'index d'une ligne sélectionnée (utilisé dans onMenuClick)
  data: any[] = []; // Tableau qui contient toutes les écritures comptables
  isEditing: boolean = false; // Indique si on est en mode modification
  editIndex: number = -1; // Stocke l'index de la ligne en cours de modification
  InformationCompteGneral: any;


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

  // soumettre le formulaire d'Enregistrement
    EnregistrerOperationOD() {

      //La saisie des données dans la grille est vide !!!
      if (this.data.length == 0) {
        this._alertService.WarningAlert(
          'Information!',
          "La saisie des données dans la grille est vide."
        );
        return;
      }

      //verifier que pièce comptable n'est pas équilibrée !!!
      if (this.Soldeoperation != '0') {
        this._alertService.WarningAlert(
          'Information!',
          "La pièce comptable n'est pas équilibrée.!!!"
        );
        return;
      }
      
      let Options =  'pvgAjouterComptabilisation';

      this.TableauEnvoi = [];

      for (let i = 0; i < this.data.length; i++) {

        let ObjetEnvoi = {
          "AG_CODEAGENCE": this.session_de_connexion['AG_CODEAGENCE'].toString(),
          "MC_DATEPIECE": this.session_de_connexion['JT_DATEJOURNEETRAVAIL'],
          "MC_NUMPIECE": "",
          "MC_NUMSEQUENCE": "",
          "MR_CODEMODEREGLEMENT": "001",//"001",
          "PT_IDPATIENT": this.data[i].idPatient,//nouveau a mettre
          "FT_CODEFACTURE": "",
          "OP_CODEOPERATEUR": this.session_de_connexion['OP_CODEOPERATEUR'],
          "MC_MONTANTDEBIT": this.data[i].idDebit,
          "MC_MONTANTCREDIT": this.data[i].idCredit,
          "MC_DATESAISIE": this.data[i].idDatepiece,
          "MC_ANNULATION": "N",
          "JO_CODEJOURNAL": this.data[i].idJournal,
          "MC_REFERENCEPIECE": this.data[i].idReferencepiece,
          "MC_LIBELLEOPERATION": this.data[i].idLibelleoperation,
          "PL_CODENUMCOMPTE": this.data[i].idPlCodeNumCompte,//nouveau a mettre,
          "MC_NOMTIERS": this.data[i].idNomtiers,//nouveau a mettre,
          "MC_CONTACTTIERS":  this.data[i].idContacttiers,//nouveau a mettre,
          "MC_EMAILTIERS": this.data[i].idEmailtiers,//nouveau a mettre,
          "MC_NUMPIECETIERS": "",//SI CA NE FONCTIONNE PAS REVOIR RAPIDEMENT CE POINT 
          "MC_TERMINAL": "",
          "MC_AUTRE": "",
          "MC_AUTRE1": "",
          "MC_AUTRE2": "",
          "MC_AUTRE3": "",
          "TS_CODETYPESCHEMACOMPTABLE":  '',//nouveau a mettre,
          "EM_MONTANT": parseInt(this.data[i].idDebit)  + parseInt(this.data[i].idCredit),
          "MC_SENSBILLETAGE": "N",
          "MC_LIBELLEBANQUE": "",

        };


        //Dans le cas ou le compte n'est pas un compte de tiers ou client,le typeschemacomptable sera en dur,sinon le typeschémacomptable est definit sur le produit.
        if (
          ObjetEnvoi.PT_IDPATIENT == '' ||
          ObjetEnvoi.PT_IDPATIENT == undefined ||
          ObjetEnvoi.PT_IDPATIENT == null
        ) {
          ObjetEnvoi.TS_CODETYPESCHEMACOMPTABLE = '00033';
        } else {
          ObjetEnvoi.TS_CODETYPESCHEMACOMPTABLE = '00033';//'00001';
            
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
          this.data = []
          // Réinitialise le formulaire après l'ajout ou la modification
          this.formOperationDivers.forEach(field => field.valeur = '');

          this.formOperationDivers[2]['valeur'] = this.session_de_connexion['JT_DATEJOURNEETRAVAIL']
          this.formOperationDivers[7]['valeur'] = '0'
          this.formOperationDivers[8]['valeur'] = '0'

          this.Soldecompte = 0;
          this.Soldecomptetiers = 0;
          this.Soldeoperation = 0;
          // Recalculer les totaux
          this.calculerTotaux();
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


  //recuperation des informations du compte general
  SelectionLigneCompte(indexCompte: any,ligne: any) {
    this.InformationCompteGneral = ligne
    this.formOperationDivers[3]['valeur'] =
          this.ComboNumCompte[indexCompte].PL_NUMCOMPTE;
    this.formOperationDivers[10]['valeur'] = this.ComboNumCompte[indexCompte].PL_CODENUMCOMPTE;
    this.chargementDetailNumCompteGnrl()      
    $('#centermodal').modal('hide');
  }

  //recuperation des informations du compte patient
  selectPatient(infoPatient:any){
    this.InformationCompteTiers = infoPatient
    this.formOperationDivers[4]['valeur'] = infoPatient.PT_CODEPATIENT
    this.formOperationDivers[9]['valeur'] = infoPatient.PT_IDPATIENT
    this.formOperationDivers[11]['valeur'] = infoPatient.PT_NOMPRENOMS
    this.formOperationDivers[12]['valeur'] = infoPatient.PT_CONTACT
    this.formOperationDivers[13]['valeur'] = infoPatient.PT_EMAIL
    this.chargementDetailNumCompteTiers()
    $('#centermodal2').modal('hide');
  }
  /**
   * Ajoute ou modifie une ligne dans la table `data`
   */
  ajouterLigne(tableau_recu: any) {
    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;
    var JO_CODEJOURNAL = this.formOperationDivers[0]['valeur']

    this.formOperationDivers[7]['valeur'] = this.formOperationDivers[7]['valeur'].replaceAll(' ', '')
    this.formOperationDivers[8]['valeur'] = this.formOperationDivers[8]['valeur'].replaceAll(' ', '')

    const debit = parseFloat(this.getValeur('idDebit')) || 0;
    const credit = parseFloat(this.getValeur('idCredit')) || 0;

    // Vérifier que Débit et Crédit ne sont pas tous les deux vides
    if (debit === 0 && credit === 0) {
      this._alertService.WarningAlert(
        'Information!',
        'Veuillez saisir au moins un montant dans Débit ou Crédit. !!!'
      );
      return;
    }

    // Vérifier que Débit et Crédit ne sont pas tous les deux renseigner
    if (debit != 0 && credit != 0) {
      this._alertService.WarningAlert(
        'Information!',
        'Veuillez saisir un montant dans Débit ou Crédit. !!!'
      );
      return;
    }

    // Vérifier que Le compte général saisi appartient obligatoirement à un client ou tiers à saisir
    if (this.formOperationDivers[4]['valeur'] == '' && this.InfoNumCompteGnrl[0]?.PL_COMPTETIERS == 'O') {
      this._alertService.WarningAlert(
        'Information!',
        'Le compte général saisi appartient obligatoirement à un patient à saisir. !!!'
      );
      return;
    }

    //le Test permet de s'assurer que la date effet se trouve dans l'exercice en cours
    if (
      this.formOperationDivers[2]['valeur'].substr(6, 4) !=
      this.session_de_connexion['EX_EXERCICE']
    ) {
      this._alertService.WarningAlert(
        'Information!',
        `La date de debut doit être dans l'exercice en cours: ${this.session_de_connexion['EX_EXERCICE']}`
      );
      return;
    }

    //Le tiers étant saisi,il faut obligatoirement selectionner son compte tiers !!!
    if (
      this.InformationCompteTiers?.PT_CODEPATIENT == '' &&
      this.formOperationDivers[4]['valeur'] != ''
    ) {
      this._alertService.WarningAlert(
        'Information!',
        `Le tiers étant saisi, il faut obligatoirement selectionner son compte tiers`
      );
      return;
    }


    // Création d'un objet `newEntry` basé sur les valeurs du formulaire
    const newEntry = this.formOperationDivers.reduce((acc, field) => {
      acc[field.id] = field.valeur; // Associe chaque id avec sa valeur
      return acc;
    }, {});
  
    if (this.isEditing) {
      // Mode édition : on met à jour la ligne sélectionnée
      this.data[this.editIndex] = newEntry;
      this.isEditing = false; // On quitte le mode édition
      this.editIndex = -1;
    } else {
      // Mode ajout : on ajoute une nouvelle ligne
      this.data.push(newEntry);
    }
  
    // Réinitialise le formulaire après l'ajout ou la modification
    this.formOperationDivers.forEach(field => field.valeur = '');
    this.formOperationDivers[2]['valeur'] = this.session_de_connexion['JT_DATEJOURNEETRAVAIL']
    this.formOperationDivers[7]['valeur'] = '0'
    this.formOperationDivers[8]['valeur'] = '0'
    this.formOperationDivers[0]['valeur'] = JO_CODEJOURNAL
    this.InformationCompteGneral = {}
    this.InformationCompteTiers = {}
    // Recalculer les totaux
    this.calculerTotaux();
  }
  
  /**
   * Charge les données d'une ligne sélectionnée dans le formulaire pour modification
   * @param event - Événement du clic (empêche le rechargement de la page si utilisé dans un lien)
   * @param index - Index de la ligne sélectionnée dans `data`
   */
  modifierLigne(event: Event, index: number) {
    event.preventDefault(); // Empêche le comportement par défaut (ex: si utilisé dans un <a>)
  
    // Remplit le formulaire avec les valeurs de la ligne sélectionnée
    this.formOperationDivers.forEach(field => {
      field.valeur = this.data[index][field.id]; 
    });
  
    this.isEditing = true; // Active le mode édition
    this.editIndex = index; // Stocke l'index de la ligne en cours de modification
  }
  
  /**
   * Supprime une ligne du tableau `data`
   * @param index - Index de la ligne à supprimer
   */
  supprimerLigne(index: number) {
    this.data.splice(index, 1); // Supprime l'élément à l'index donné
    this.calculerTotaux();
  }
  
  /**
   * Gère un clic sur un menu contextuel ou une action spécifique liée à une ligne
   * @param event - Événement du clic (empêche le comportement par défaut)
   * @param idline - Identifiant ou index de la ligne sélectionnée
   */
  onMenuClick(event: Event, idline: any): void {
    event.preventDefault(); // Empêche la redirection naturelle du clic (utile si c'est un <a>)
    this.index = idline; // Stocke l'index sélectionné pour un traitement ultérieur
  }
  

  calculerTotaux() {
    this.totalDebit = this.data.reduce((acc, item) => acc + (parseFloat(item.idDebit) || 0), 0);
    this.totalCredit = this.data.reduce((acc, item) => acc + (parseFloat(item.idCredit) || 0), 0);
    this.difference = Math.abs(this.totalDebit - this.totalCredit);
    this.Soldeoperation = this.difference
  }

  getValeur(id: string): string {
    const field = this.formOperationDivers.find(f => f.id === id);
    return field ? field.valeur : '';
  }

  chargementComboJournal() {
    let Option = 'pvgComboJournal';
    let body = {
      Objet: [{}],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboJournal = success;
        if (this.ComboJournal[0].SL_RESULTAT == 'TRUE') {
          this.ComboJournal = this.ComboJournal[1];
          this.chargementComboTypeTiers()
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboJournal[0].SL_RESULTAT
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

  chargementComboTypeTiers() {
    let Option = 'pvgComboTypeTiers';
    let body = {
      Objet: [{}],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboTypeTiers = success;
        if (this.ComboTypeTiers[0].SL_RESULTAT == 'TRUE') {
          this.ComboTypeTiers = this.ComboTypeTiers[1];
        
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboTypeTiers[0].SL_MESSAGE
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
 

  ChargerLaListePatient() {
    
    $('#' + this.formOperationDivers[1]['id']).css(
      'background-color',
      'white'
    );
    $('#' + this.formOperationDivers[3]['id']).css(
      'background-color',
      'white'
    );

    if (this.formOperationDivers[1]['valeur'] == '') {
      this._alertService.WarningAlert(
        'Information!',
        'Le type de tiers doit être obligatoirement sélectionné.'
      );
      $('#' + this.formOperationDivers[1]['id']).css(
        'background-color',
        'MistyRose'
      );
      return;
    }
    if (this.InfoNumCompteGnrl[0]?.PL_COMPTETIERS != 'O') {
     
      this._alertService.WarningAlert(
        'Information!',
        'Il faut obligatoirement saisir un compte général lié au tiers.'
      );
      $('#' + this.formOperationDivers[3]['id']).css(
        'background-color',
        'MistyRose'
      );
      return;
    }
    //if(this.formOperationDivers[4]['valeur'] == "" && this.formOperationDivers[4]['valeur'] == "") return
    this._loaderService._show();
    let lien_du_service = 'ListeComptePatient';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PT_CODEPATIENT: this.formOperationDivers[4]['valeur'].trim(),
          TC_CODETYPETIERS: this.formOperationDivers[1]['valeur'].trim(),
          PT_MATRICULE:  "",
          PT_NOMPRENOMS:  "",
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
          $('#centermodal2').modal('hide');
        } else {
          this.tab_liste_patient = this.tab_liste_patient[1];
          console.log('tab_liste_patient', this.tab_liste_patient);
          $('#centermodal2').modal('show');
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

  chargementDetailNumCompteGnrl() {
    let Option = 'pvgTableLabelAvecSolde';
    let body = {
      Objet: [
        {
          SO_CODESOCIETE: this.session_de_connexion['SO_CODESOCIETE'],
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PL_NUMCOMPTE: this.InformationCompteGneral.PL_NUMCOMPTE,
          MC_DATEPIECE: this.session_de_connexion['JT_DATEJOURNEETRAVAIL']
        },
      ],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.InfoNumCompteGnrl = success;
        if (this.InfoNumCompteGnrl[0]?.SL_RESULTAT == 'TRUE') {
          this.InfoNumCompteGnrl = this.InfoNumCompteGnrl[1];
          this.Soldecompte = this.InfoNumCompteGnrl[0]?.PL_SOLDECOMPTE
          
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            "Le compte génerale n'a pas été correctement charger veuillez réessayer"
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

  chargementDetailNumCompteTiers() {
    let Option = 'pvgSoldeCompteClient';
    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          PT_IDPATIENT: this.InformationCompteTiers?.PT_IDPATIENT,
          PL_CODENUMCOMPTE: this.InformationCompteTiers?.PL_CODENUMCOMPTE,
          
        },
      ],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.InfoNumCompteTiers = success;
        if (this.InfoNumCompteTiers[0].SL_RESULTAT == 'TRUE') {
          this.InfoNumCompteTiers = this.InfoNumCompteTiers[1];
          this.Soldecomptetiers = this.InfoNumCompteTiers 
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.InfoNumCompteTiers[0].SL_MESSAGE
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


  ngOnInit(): void {
   this.chargementComboJournal()
  }
}
