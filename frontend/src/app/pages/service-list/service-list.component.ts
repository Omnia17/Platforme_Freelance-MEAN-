import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../../core/services/service.service';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent {

  services: any;

  constructor( private _service: ServiceService ){}


  ngOnInit(): void {
    
    this._service.getAllServices().subscribe({
      next: (res)=>{
        this.services = res;
      }
    })

  }
}
