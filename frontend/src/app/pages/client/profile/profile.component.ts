import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


user:any;
userId:any;
registerForm:FormGroup;
image:any;
constructor(private fb: FormBuilder , private _user : UserService) { 

let controls ={
  firstname:new FormControl('',[Validators.required]),
  lastname:new FormControl('',[Validators.required]),
  email:new FormControl('',[Validators.required, Validators.email]),
  password: new FormControl('', []),
}
this.registerForm= fb.group(controls);
}
selectImage(e: any){
  this.image = e.target.files[0];
}

ngOnInit(): void {
  this.userId = this._user.getUserIdFromToken();

  this._user.getUserById(this.userId).subscribe({
    next: (res)=>{
      this.user = res;
      this.registerForm.reset(res);
    }
  })
}

save(){

  let fd = new FormData();
  fd.append('firstname', this.registerForm.value.firstname);
  fd.append('lastname', this.registerForm.value.lastname);
  fd.append('email', this.registerForm.value.email);
  if(this.registerForm.value.password){
    fd.append('password', this.registerForm.value.password);
  }

  if(this.image){
    fd.append('image', this.image);
  }

  this._user.editUser( this.userId, fd ).subscribe({
    next: (res)=>{
      window.location.reload();
    }
  })
}

}
