import { AdministradoresService } from './../../services/administradores.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'app/classes/admin';

@Component({
  selector: 'menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  @Input() notificacoes;
  admin: Admin = new Admin();
  contNotificacoes: number;
  
  constructor(private _adminService: AdministradoresService,
              private _router: Router) { }

  ngOnInit() {
    this._adminService.admin.subscribe(
      (admin: Admin) => { this.admin = admin }
    );

    this._adminService.verificaLogin().subscribe();
  
    this.contNotificacoes = this.notificacoes["denuncias"] + this.notificacoes["escritores"] + this.notificacoes["mensagens"]
    + this.notificacoes["categorias"];
    
    if (this.contNotificacoes > 99)
      this.contNotificacoes = 99;
  }
  
  logout(){
    this._adminService.logout();
    this._router.navigate(['/admin/login']);
  }

  editar(){
    this._router.navigate(['/admin/editar', this.admin.id]);
  }

}
