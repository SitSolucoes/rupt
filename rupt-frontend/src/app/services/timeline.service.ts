import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class TimelineService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  getTimeline(autor_id, leitor_id): Observable<any>{
      return this._http.get(this._url + 'timeline/getTimeline/'+ autor_id +'/'+leitor_id).map(
        ( response:Response ) => { 
          return response.json().timeline;
        }
      )
  }

  deletePost(timeline_id): Observable<any>{
    const body = JSON.stringify({
      timeline_id: timeline_id
    })

    return this._http.post(this._url + 'timeline/deleteTimeline', body, { headers: this.headers }).map(
      ( response ) => { return true }
    )
  }
  
}
