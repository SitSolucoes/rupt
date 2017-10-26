import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Http, Response } from '@angular/http';

@Injectable()
export class TimelineService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  getTimeline(leitor_id): Observable<any>{
      return this._http.get(this._url + 'timeline/getTimeline/'+ leitor_id).map(
        ( response:Response ) => { return response.json().timeline }
      )
  }
  
}
