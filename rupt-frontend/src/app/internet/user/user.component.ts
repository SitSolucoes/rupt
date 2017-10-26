import { Timeline } from './../../classes/timeline';
import { TimelineService } from './../../services/timeline.service';
import { ConnectionFactory } from 'app/classes/connection-factory';
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
  timeline: Timeline;
  url = ConnectionFactory.API_IMAGEM + 'profile/';

  constructor(private _activatedRoute: ActivatedRoute,
              private _leitorService: LeitoresService, 
              private _timelineService: TimelineService) { }

  ngOnInit() {
      this.leitor = new Leitor();
      this.leitor.escritor = new Escritor();
      this.leitorLogado = new Leitor();

      this._activatedRoute.params.subscribe(params => {
        this._leitorService.getLeitorByNick(params['nick']).subscribe(
          (leitor: Leitor) => {
            this.leitor = leitor;
            this.getTimeline();
          }
        );
      });

      this._leitorService.leitor.subscribe(
        (leitor: Leitor) => { this.leitorLogado = leitor }
      );
      this._leitorService.verificaLogin().subscribe();
  }

  getTimeline(){
      this._timelineService.getTimeline(this.leitor.id).subscribe(
        ( timeline: Timeline ) => { this.timeline = timeline }
      )
  }

}
