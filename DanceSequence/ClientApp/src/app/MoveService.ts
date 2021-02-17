import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Count } from './model/count';
import { Dance } from './model/dance';
import { Move } from './model/move';
import { MoveDetails } from './model/moveDetails';
import { AddMove } from './model/addMove';
import { AddTags } from './model/addTags';
import { ConnectMoves } from './model/connectMoves';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AddAlternation } from './model/addAlternation';

const URL = "/api/Moves"
const URL2 = "/api/Dances"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })}

@Injectable({
  providedIn: 'root'
})  
export class MoveService {

  constructor(private http: HttpClient) {
   }

   CountEntity() {
    return this.http.get<Count>(URL + "/CountEntities", httpOptions );
   }
    GetDances() {
      return this.http.get<Dance[]>(URL2 + "/GetDances", httpOptions );
  }

  GetMoves(danceId: number) {
    return this.http.get<Move[]>(URL + "/GetMoves/"+danceId, httpOptions );
}

GetMove(moveId: number) {
  return this.http.get<Move>(URL + "/GetMove/"+moveId, httpOptions );
}

GetMoveDetails(moveId: number) {
  return this.http.get<MoveDetails>(URL + "/GetMove/"+moveId, httpOptions );
}

GetPostMove(moveId: number) {
  return this.http.get<Move[]>(URL + "/GetPostMoves/"+moveId, httpOptions );
}

AddMove(addMove: AddMove)
{
  return this.http.post<Move>(URL + "/AddMove/", addMove, httpOptions );
}

UpdateMove(addMove: AddMove)
{
  return this.http.post<boolean>(URL + "/UpdateMove/", addMove, httpOptions );
}

AddTags(addTags: AddTags)
{
  return this.http.post<boolean>(URL + "/AddTags/", addTags, httpOptions );
}

ConnectPostMoves(connectMoves: ConnectMoves)
{
  return this.http.post<boolean>(URL + "/ConnectPostMoves/", connectMoves, httpOptions );
}

ConnectPreMoves(connectMoves: ConnectMoves)
{
  return this.http.post<boolean>(URL + "/ConnectPreMoves/", connectMoves, httpOptions );
}

AddAlternations(addAlternation: AddAlternation)
{
  return this.http.post<boolean>(URL + "/AddAlternation/", addAlternation, httpOptions );
}

DeleteMove(moveId: number)
{
  return this.http.delete<boolean>(URL + "/DeleteMove/"+ moveId, httpOptions );
}
}
