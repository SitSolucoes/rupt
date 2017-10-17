import { Escritor } from './../../classes/escritor';
import { LeitoresService } from './../../services/leitores.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Leitor } from 'app/classes/leitor';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  leitor: Leitor;
  leitorLogado: Leitor;

  constructor(private _activatedRoute: ActivatedRoute,
              private _leitorService: LeitoresService) { }

  ngOnInit() {
      this.leitor = new Leitor();
      this.leitor.escritor = new Escritor();
      this.leitorLogado = new Leitor();

      this._leitorService.getLeitorByNick(this._activatedRoute.snapshot.params['nick']).subscribe(
        (leitor: Leitor) => {
          this.leitor = leitor;
        }
      )
  }

}
