import { Component, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { LangueService } from 'src/app/services/langue.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';

declare var $: any;

@Component({
  selector: 'app-langues',
  templateUrl: './langues.component.html',
  styleUrls: ['./langues.component.scss'],
})
export class LanguesComponent implements OnInit {
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    public _langueService: LangueService,
    public _toolsService: ToolsService,
    public renderer: Renderer2,
    public _themeService: ThemeService,
    private zone: NgZone,
    public _loaderService: LoaderService
  ) {}

  ActiverLaLangue(id_langue: any, la_lague: any) {
    this._loaderService._show();
    if (id_langue == 'idLangueFr') {
      $(`#${id_langue}`).css('background-color', '#2e37a4'); // couleur bleu du theme
      $(`#${id_langue}`).css('color', 'white');

      $(`#idLangueEn`).css('color', '#00d3c7');
      $(`#idLangueEn`).css('background-color', '#00d3c71a');

      sessionStorage.setItem('langue_en_cours', 'current_fr');
    } else {
      $(`#${id_langue}`).css('background-color', '#2e37a4');
      $(`#${id_langue}`).css('color', 'white');

      $(`#idLangueFr`).css('color', '#00d3c7');
      $(`#idLangueFr`).css('background-color', '#00d3c71a');

      sessionStorage.setItem('langue_en_cours', 'current_en');
    }

    this._langueService._changerLaLangue(la_lague);
    this._loaderService._hide();
  }

  ngOnInit(): void {
    // this._loaderService._show();
    if (
      sessionStorage.getItem('langue_en_cours') == 'current_fr' ||
      !sessionStorage.getItem('langue_en_cours')
    ) {
      $(`#idLangueFr`).css('background-color', '#2e37a4');
      $(`#idLangueFr`).css('color', 'white');

      $(`#idLangueEn`).css('color', '#00d3c7');
      $(`#idLangueEn`).css('background-color', '#00d3c71a');
    } else if (sessionStorage.getItem('langue_en_cours') == 'current_en') {
      $(`#idLangueEn`).css('background-color', '#2e37a4');
      $(`#idLangueEn`).css('color', 'white');

      $(`#idLangueFr`).css('color', '#00d3c7');
      $(`#idLangueFr`).css('background-color', '#00d3c71a');
    }

    // this._loaderService._hide();
  }
}
