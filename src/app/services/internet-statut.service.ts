import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InternetStatutService {
  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    // ecoute les événements 'online' et 'offline'
    merge(
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    ).subscribe((status) => this.onlineSubject.next(status));
  }

  // retourne un observable pour surveiller letat de la connexion
  get _statut_connexion$(): Observable<boolean> {
    return this.onlineSubject.asObservable();
  }
}
