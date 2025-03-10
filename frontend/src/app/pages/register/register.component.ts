import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule ,ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

registerForm:FormGroup;

constructor(private fb: FormBuilder , private _user : UserService,  private router:Router) { 

let controls ={
  firstname:new FormControl('',[Validators.required]),
  lastname:new FormControl('',[Validators.required]),
  email:new FormControl('',[Validators.required, Validators.email]),
  password:new FormControl('',[Validators.required]),
}
this.registerForm= fb.group(controls);
}


createAccount()
{
  this._user.register(this.registerForm.value).subscribe({
    next:(res)=>{
      this.router.navigate(['/login']);
    }
  })
  console.log(this.registerForm.value);

}


}
