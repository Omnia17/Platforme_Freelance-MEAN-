import { Component } from '@angular/core';
import { ServiceService } from '../../../core/services/service.service';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent {


  services: any;

  constructor( private _service: ServiceService, private _user: UserService ){}

  ngOnInit(): void {
    
    this._service.getMyServices( this._user.getUserIdFromToken() ).subscribe({
      next: (res)=>{
        this.services = res;
        console.log(this.services);
        
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
       
        this._service.deleteService(id).subscribe({
          next: (res)=>{
            this.ngOnInit();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })

      }
    });

  }

  
}
