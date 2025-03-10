import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ServiceService } from '../../../core/services/service.service';
import { UserService } from '../../../core/services/user.service';
import { subscribeOn } from 'rxjs';
import { ProposalService } from '../../../core/services/proposal.service';
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  basicData: any;
 myservices :any;
 allservices:any;
  proposalsCount: any;
  myproposals: any;
  constructor( private _service: ServiceService, private _user: UserService , private _proposal : ProposalService){}

  
  ngOnInit(): void {
    // Fetch the user's services
    this._service.getMyServices(this._user.getUserIdFromToken()).subscribe({
      next: (res) => {
        this.myservices = res;
        console.log(this.myservices);

        // Reset the proposal count before calculation
        this.proposalsCount = 0;

        // For each service, fetch proposals and accumulate count
        this.myservices.forEach((service: { _id: any; }) => {
          this._proposal.getProposalsByServiceId(service._id).subscribe({
            next: (proposals) => {
              if (Array.isArray(proposals)) {
                this.proposalsCount += proposals.length; // Sum up proposals if it's an array
                console.log(`Proposals for Service ${service._id}:`, proposals.length);
              } else {
                console.log(`No proposals for Service ${service._id}`);
              }
              this.updateChartData();

            }
          });
        });
      }
    });

    //fetch my proposals 
    this._proposal.getProposalByUserId( this._user.getUserIdFromToken() ).subscribe({
      next: (res)=>{
        this.myproposals = res;
        console.log(this.myproposals);
        this.updateChartData();

      }

    });

    // Fetch all services for other purposes
    this._service.getAllServices().subscribe({
      next: (res) => {
        this.allservices = res;
        console.log(this.allservices);
        this.updateChartData();

      }

    });
  }
    updateChartData() {

    // Set up the basic data for the chart
    this.basicData = {
      labels: ['users', 'services', 'proposals', 'accepted proposal'],
      datasets: [
        {
          label: 'Sales',
          data: [this.myservices.length,this.proposalsCount , this.myproposals.length, this.allservices.length], // Use dynamic proposals count
          backgroundColor: [
            'rgba(249, 115, 22, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgb(107, 114, 128, 0.2)',
            'rgba(139, 92, 246, 0.2)',
          ],
          borderColor: [
            'rgb(249, 115, 22)',
            'rgb(6, 182, 212)',
            'rgb(107, 114, 128)',
            'rgb(139, 92, 246)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
