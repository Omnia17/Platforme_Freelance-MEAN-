import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProposalService } from '../../../core/services/proposal.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-proposals',
  standalone: true,
  imports: [],
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.css'
})
export class ProposalsComponent {

  proposals: any;

  constructor( private _proposal: ProposalService, private _user: UserService ){}

  ngOnInit(): void {
    
    this._proposal.getProposalByUserId( this._user.getUserIdFromToken() ).subscribe({
      next: (res)=>{
        this.proposals = res;
        console.log(this.proposals);
        
      }
    })

  }


  delete(id: any){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       

        this._proposal.deleteProposal(id).subscribe({
          next: (res)=>{
            this.ngOnInit();
          }
        })

      }
    });

  }

}
