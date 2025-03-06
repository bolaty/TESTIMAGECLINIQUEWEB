import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

declare var $: any;

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  constructor(
    public _adminService: AdminService,
    private _router: Router,
    public _themeService: ThemeService
  ) {}

  DashboardNavigation() {
    this._adminService.active_menu_de_gauche =
      !this._adminService.active_menu_de_gauche;
  }

  RunOnInit() {
    setTimeout(() => {
      const savedTheme = this._themeService._avoirLeTheme();
      $(`.bar`).css('background-color', 'white');

      if (savedTheme == 'dark') {
        $(`.btn-canvas`).css('background-color', '#0d1b2a');
        $(`.text-content-menu`).css('color', 'white');
      } else {
        $(`.btn-canvas`).css('background-color', 'white');
        $(`.text-content-menu`).css('color', 'black');
      }
    }, 1000);
  }

  ngOnInit(): void {
    // abonnement a levenement pour reagir lorsque la fonction est appelee
    this._themeService.triggerNgOnInit$.subscribe(() => {
      this.RunOnInit();
    });

    // initialisation normale
    this.RunOnInit();
  }
}
