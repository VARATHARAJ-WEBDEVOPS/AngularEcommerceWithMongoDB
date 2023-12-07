import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userModel: any = {
    phone: null,
    password: ''
  }

  constructor(private router: Router,
    private API: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    const admin = localStorage.getItem('adminToken');
    if (token) {
      this.router.navigateByUrl('dashboard');
    } else if (admin) {
      this.router.navigateByUrl('create');

    }
  }
  navigateToSignUp() {
    this.router.navigateByUrl('signup');
  }

  validation() {

    if (this.userModel.phone && this.userModel.password) {
      if (this.userModel.phone === 1234567890 && this.userModel.password === 'admin') {
        localStorage.setItem('adminToken', 'admin');
        this.router.navigateByUrl('create');
      } else {
        this.login();
      }
    } else {
      Swal.fire({
        title: 'Oops!',
        text: 'Please fill all Fields',
        icon: 'error',
        confirmButtonText: 'Got it!'
      });
    }
  }

  login() {
    this.API.searchDocumentsByPhone(this.userModel.phone)
      .subscribe(response => {
        console.log(response.user);
        
          const user = response.user;
          if (user.phone === this.userModel.phone && user.password === this.userModel.password) {

            localStorage.setItem('userToken', user._id);
            console.log(user._id);
            this.router.navigateByUrl('dashboard');

          } else {
            Swal.fire({
              title: 'Oops!',
              text: 'Phone number or password is incorrect.',
              icon: 'error',
              confirmButtonText: 'Got it!'
            });
          }
      },error => {
        Swal.fire({
          title: 'Oops!',
          text: 'User not found.',
          icon: 'error',
          confirmButtonText: 'Got it!'
        });
      });
  }
}
