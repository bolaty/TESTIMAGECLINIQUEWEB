import { Component } from '@angular/core';

@Component({
  selector: 'app-pied-recu',
  templateUrl: './pied-recu.component.html',
  styleUrls: ['./pied-recu.component.scss'],
})
export class PiedRecuComponent {
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );

  ngOnInit(): void {
    this.session_de_connexion = JSON.parse(
      sessionStorage.getItem('donnee_de_connexion') || '{}'
    );
  }
}
