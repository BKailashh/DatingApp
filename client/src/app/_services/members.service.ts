import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl=environment.apiUrl;
  members:Member[]=[];

  constructor(private http:HttpClient) { }

  //old way
  /*getMembers()
  {

    return this.http.get<Member[]>(this.baseUrl+'users');
  }*/

  //new way
  getMembers()
  {
    if(this.members.length>0) return of(this.members);

    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      map(members=>{
        this.members=members;
        return members;
      }
      )
    )
  }

  //old way
  /*getMember(username: string)
  {
    return this.http.get<Member>(this.baseUrl+'users/'+username);
  }*/
  
  //new way
  getMember(username:string)
  {
    const member=this.members.find(x=>x.username===username);
    if(member!==undefined) return of(member);
    return this.http.get<Member>(this.baseUrl+'users/'+username);
  }

  //old way
  /*updateMember(member: Member)
  {
    return this.http.put(this.baseUrl+'users',member);
  }*/
 
  //new way
  updateMember(member: Member)
  {
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(
        ()=>{
          const index=this.members.indexOf(member);
          this.members[index]=member;
        }
      )
    )
  }
}
