import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginForm: FormGroup;

constructor(private fb: FormBuilder , private _user : UserService,  private router:Router) { 

  
  let controls ={
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required]),
  }
  this.loginForm= fb.group(controls);
  }
  login(){

    this._user.login( this.loginForm.value ).subscribe({
      next: (res: any)=>{
        localStorage.setItem('token', res.token);
        this.router.navigate(['/client']);
      },
      error: (err)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Email or password invalid",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }
}

