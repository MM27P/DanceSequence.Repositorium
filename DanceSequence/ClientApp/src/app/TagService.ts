import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from './model/tag';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = "/api/Tags"
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })}

@Injectable({
  providedIn: 'root'
})  
export class TagService {

  constructor(private http: HttpClient) {
   }

   GetTags() {
    return this.http.get<Tag[]>(URL + "/GetTags", httpOptions );
    }

    AddTag(tag: Tag) {
        return this.http.post<Tag>(URL + "/AddTag", tag,httpOptions );
  }

  UpdateTag(tag: Tag) {
    return this.http.post<boolean>(URL + "/UpdateTag", tag,httpOptions );
}
    DeleteTag(id: number) {
        return this.http.delete<boolean>(URL + "/DeleteTag/"+id,httpOptions );
    }
}
