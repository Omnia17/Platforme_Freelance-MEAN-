import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

 private url ='http://localhost:5000/proposals/';

  constructor(private http:HttpClient) { }


  create(proposal:any){
    return this.http.post(this.url +'create',proposal);
  
  }
  
  getProposalsByServiceId(id:any){
    return this.http.get(this.url+ 'service/'+ id);
  }
  
  getProposalByUserId(id:any){
    return this.http.get(this.url +'my/'+id);
  }

  acceptProposal(id:any){
    return this.http.put(this.url+id ,{});
  }
  
  deleteProposal(id:any){
    return this.http.delete(this.url+ id );
  }
  
 

}

