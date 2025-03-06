import { Component, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

declare var $: any;
@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class FooterMenuComponent {
  date:any=''
constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {}

  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );

  

  ngOnInit(): void {
    var d = new Date();
      var jour = d.getDate();
      var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
      var annee = d.getFullYear();

      // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
      this.date =
        (jour < 10 ? '0' + jour : jour) +
        '-' +
        (mois < 10 ? '0' + mois : mois) +
        '-' +
        annee;
  }
}
