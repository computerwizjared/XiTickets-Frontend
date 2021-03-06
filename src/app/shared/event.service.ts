import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Event, Show } from '../shared';

@Injectable()
export class EventService {
  constructor(private http: Http) { }

  getEvents(show: Show): Observable<Event[]> {
    return this.http.get('http://localhost:3000/api/shows/' + show.id + '/events').map(res => res.json()).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
