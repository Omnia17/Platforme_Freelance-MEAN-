import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  user: any;


  constructor( private router: Router , private _user: UserService ){}


  ngOnInit(): void {
    
    this._user.getUserById( this._user.getUserIdFromToken() ).subscribe({
      next: (res)=>{
        this.user = res;
      }
    })

  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}