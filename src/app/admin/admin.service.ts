import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { InternetStatutService } from '../services/internet-statut.service';
import { AppConfigService } from '../AppConfigService.service'; // Importez le service correctement
import { environment } from '../../environments/environment';
declare var $: any;
declare var feather: any;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // lien_serveur: any = 'https://appwebroyalimmo_test.app.mgdigitalplus.com/api/'; // lien test royal immobilier
  lien_serveur: any= this.AppConfigService.getConfig('apiBaseUrl');//'http://192.168.1.21:6001/api/'; // lien prod royal immobilier
 // lien_serveur: any=  environment.apiBaseUrl;
  
  lien_serveur_fichier: any =
    'http://192.168.1.16:6001/downloadfile/'; // lien prod royal immobilier
  
  statusConnect: boolean = false;
  libelleConnexion: any = '';
  for_phone: boolean = false;
  theme_actuel: any = '';
  active_menu_de_gauche: boolean = true;
  type_de_device: any = '';
  en_ligne!: boolean;

  constructor(
    private http: HttpClient,
    private AppConfigService :AppConfigService,
    private _internetStatutService: InternetStatutService
  ) {
    Network.addListener(
      'networkStatusChange',
      this.checkNetworkStatus.bind(this)
    );
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();

    if (status.connected) {
      this.statusConnect = true;
      this.libelleConnexion = 'Connexion internet retablie';
      console.log('Connexion internet retablie');
      this.appSet();
      // this.demarrerCompteur()
    } else {
      this.statusConnect = true;
      this.libelleConnexion = 'Connexion internet perdue';
      console.log('Connexion internet perdue');
      this.appSetn();
      // this.demarrerCompteur()
    }
  }

  AppelServeur(body: any, chemin_service: any) {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        // Configuration des options HTTP
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: '', // Vous devrez peut-être fournir un jeton d'autorisation ici
          }),
        };

        // Vérification de la connexion Internet
        if (status.connected) {
          // Envoi de la requête HTTP si la connexion est active
          return this.http
            .post(
              this.lien_serveur + chemin_service, //'Service/wsCoupure.svc/pvgChargerDansDataSet',
              body,
              httpOptions
            )
            .pipe(
              catchError((error) => {
                return throwError(error);
              })
            );
        } else {
          // Si la connexion Internet est perdue, renvoyer une erreur
          $('*').LoadingOverlay('hide');
          this.appSetn();
          return throwError('Connexion internet perdue');
        }
      })
    );
  }

  // envoi des images
  EnvoyerFormData(data: FormData, chemin_service: any): Observable<any> {
    return this.http.post(this.lien_serveur + chemin_service, data);
  }

  appSet() {
    'use strict';
    var notify = $.notify(
      '<i class="fa fa-bell-o"></i><strong>Notification</strong> connexion internet......',
      {
        type: 'theme',
        allow_dismiss: true,
        delay: 8000,
        showProgressbar: true,
        timer: 300,
      }
    );

    setTimeout(function () {
      notify.update(
        'message',
        '<i class="fa fa-bell-o"></i><strong>Connexion internet retablie</strong>.'
      );
    }, 1000);

    feather.replace();
  }

  appSetn() {
    'use strict';
    var notify = $.notify(
      '<i class="fa fa-bell-o"></i><strong>Notification</strong> connexion internet...',
      {
        type: 'theme',
        allow_dismiss: true,
        delay: 8000,
        showProgressbar: true,
        timer: 300,
      }
    );

    setTimeout(function () {
      notify.update(
        'message',
        '<i class="fa fa-bell-o"></i><strong>Connexion internet perdue</strong>.'
      );
    }, 1000);

    feather.replace();
  }

  ngOnInit() {
    this._internetStatutService._statut_connexion$.subscribe((status) => {
      this.en_ligne = status;
      if (status) {
        console.log('Connecté à internet');
      } else {
        console.log("Déconnecté d'internet");
      }
    });
  }
}
