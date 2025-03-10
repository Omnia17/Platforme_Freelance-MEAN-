import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor (public _user:UserService){}
  user:any;
  userId:any;
  ngOnInit(): void {
    this.userId = this._user.getUserIdFromToken();
  
    this._user.getUserById(this.userId).subscribe({
      next: (res)=>{
        this.user = res;
      }
    })
  }

}
