import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  @Input() notificacoes;
  contNotificacoes: number;
  admin_name: string = localStorage.getItem('adminLogado');

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this.contNotificacoes = this.notificacoes["denuncias"] + this.notificacoes["escritores"] + this.notificacoes["mensagens"];
    if (this.contNotificacoes > 99)
      this.contNotificacoes = 99;
  }

  logout(){
    this._authService.logout();
    this._router.navigate(['/admin/login']);
  }

  editAdmin(){
    this._router.navigate(['/admin/editAdmin', localStorage.getItem('admin_id')]);
  }

}
