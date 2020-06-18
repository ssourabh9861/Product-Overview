import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Notes} from '../../data-variables/overview/notes';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _url:string = "/assets/data/notes_mockdata.json";
  constructor(private http : HttpClient) { }
  getData():Observable<Notes[]>{
    return this.http.get<Notes[]>(this._url);
  }
}
