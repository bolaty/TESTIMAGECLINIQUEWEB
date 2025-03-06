import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return this.http
      .get('/assets/config/config.json')
      .toPromise()
      .then((data) => {
        this.config = data;
        //environment.apiBaseUrl = this.config.apiBaseUrl; // Met à jour la variable d'environnement
      });
  }

  getConfig(key: string): any {
    return this.config[key];
  }
}
