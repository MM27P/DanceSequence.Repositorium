import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';
import { Sequence } from './model/sequence';
import { AddSequence } from './model/addSequence';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = "/api/Users"
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })}

@Injectable({
  providedIn: 'root'
})  
export class UserService {

  constructor(private http: HttpClient) {
   }

  CheckUser(user: User) {
    return this.http.post<boolean>(URL + "/CheckUser", user, httpOptions );
  }

  GetUser(login:string): Observable<User>{
    
    let user = this.http.get<User>(URL + "/CheckUser/"+login, httpOptions );
    console.log(user);
    return user;
  }

  GetSequence(userId: number): Observable<Sequence[]>
  {
    console.log(userId);
    let sequences = this.http.get<Sequence[]>(URL + "/GetSequence/"+userId, httpOptions );
    console.log(sequences);
    return sequences;
  }

  AddSequence(addSequence:AddSequence)
  {
    return this.http.post<boolean>(URL + "/AddSequence/", addSequence, httpOptions );
  }

  DeleteSequence(id:number)
  {
    return this.http.delete<boolean>(URL + "/DeleteSeqeunce/"+ id, httpOptions );
  }
}
