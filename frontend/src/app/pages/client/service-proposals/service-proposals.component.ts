import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProposalService } from '../../../core/services/proposal.service';

@Component({
  selector: 'app-service-proposals',
  standalone: true,
  imports: [],
  templateUrl: './service-proposals.component.html',
  styleUrl: './service-proposals.component.css'
})
export class ServiceProposalsComponent {
id : any ;
proposals : any; 
constructor(
  private _proposal: ProposalService,
  private _act: ActivatedRoute
) {}

ngOnInit(): void {
  this.id = this._act.snapshot.paramMap.get('id');
  this._proposal.getProposalsByServiceId(this.id).subscribe({
    next: (res) => {
      this.proposals = res;
      console.log(this.proposals);
    },
  });
}

delete(id: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      this._proposal.deleteProposal(id).subscribe({
        next: (res) => {
          this.ngOnInit();
        },
      });
    }
  });
}


accept(id: any){

  this._proposal.acceptProposal(id).subscribe({
    next: (res)=>{
      this.ngOnInit();
    }
  })

}

}
