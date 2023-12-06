import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,
    private API: APIService) { }

  userModel: any = {
    name: '',
    phone: null,
    password: ''
  }

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.router.navigateByUrl('dashboard');
    }
  }

  signup() {
    console.log(this.userModel);
    this.validation();
  }

  validation() {
    if (!this.userModel.name) {
      Swal.fire({
        title: 'Oops!',
        text: 'Name is Required',
        icon: 'error',
        confirmButtonText: 'Got it!'
      });
    } else if (!this.userModel.phone) {
      Swal.fire({
        title: 'Oops!',
        text: 'Phone Number is required',
        icon: 'error',
        confirmButtonText: 'Got it!'
      });
    } else if (String(this.userModel.phone).length !== 10) {
      Swal.fire({
        title: 'Oops!',
        text: 'Invalid Phone Number',
        icon: 'error',
        confirmButtonText: 'Got it!'
      });
    } else if (!this.userModel.password) {
      Swal.fire({
        title: 'Oops!',
        text: 'Password is required',
        icon: 'error',
        confirmButtonText: 'Got it!'
      });
    } else if (String(this.userModel.password).length < 8) {
      Swal.fire({
        title: 'Oops!',
        text: 'Password must 8 charecters needed',
        icon: 'error',
        confirmButtonText: 'Got it!'
      });
    } else {
      this.checkExistingUser();
    } 
  }

  checkExistingUser() {
    this.API.searchDocumentsByPhone(this.userModel.phone).subscribe((response: any) => {
      if (response.docs && response.docs.length > 0) {
        Swal.fire({
          title: 'Oops!',
          text: 'This PhoneNumber is Already Used!',
          icon: 'error',
          confirmButtonText: 'Got it!'
        });
      } else {
        this.createUser();
      }
    });
  }

  createUser() {
    this.API.createDocument(this.userModel).subscribe((res => {
      console.log(res);
      if (res && res.ok) {
        localStorage.setItem('userToken', res.id);
        this.router.navigateByUrl('dashboard');
      }
    }));
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

}
