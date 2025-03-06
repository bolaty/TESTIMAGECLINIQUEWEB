import { AfterViewInit, Component } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(public AdminService: AdminService, private _router: Router) {}
}
