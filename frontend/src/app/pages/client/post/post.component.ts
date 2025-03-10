import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ServiceService } from '../../../core/services/service.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {


  postForm: FormGroup;
  image: any;
  idUser:any;
  
  constructor(private fb: FormBuilder, private _user:UserService , private _service:ServiceService, private _router : Router) { 

  let controls={
    name: new FormControl('', [ Validators.required ]),
    categorie: new FormControl('', [ Validators.required ]),
    location: new FormControl('', [ Validators.required ]),
    salary: new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required ])

  }
  this.postForm=fb.group(controls);
}

selectImage(e: any){
  this.image = e.target.files[0];
}


create(){

  let fd = new FormData();
  fd.append('name', this.postForm.value.name);
  fd.append('categorie', this.postForm.value.categorie);
  fd.append('location', this.postForm.value.location);
  fd.append('salary', this.postForm.value.salary);
  fd.append('description', this.postForm.value.description);
  fd.append('image', this.image);
  fd.append('idUser', this._user.getUserIdFromToken());

  this._service.create(fd).subscribe({
    next: (res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your post has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      this._router.navigate(['/client/myservices'])
    }
  })
}
}
