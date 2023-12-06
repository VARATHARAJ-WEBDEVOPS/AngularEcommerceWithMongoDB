import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
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
    private API: APIService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.router.navigateByUrl('dashboard');
    }
  }
  navigateToSignUp() {
    this.router.navigateByUrl('signup');
  }

  validation() {

    if (this.userModel.phone && this.userModel.password) {
      if (this.userModel.phone === 1234567890 && this.userModel.password === 'admin') {
        this.router.navigateByUrl('create');
      } else {
        this.login();
      }
    } else {
      Swal.fire({
        title: 'Oops!',
        text: 'Please fill all Fields',
        icon: 'error',
        showConfirmButton: false
      });
    }
  }

  login() {
    this.API.searchDocumentsByPhone(this.userModel.phone)
      .subscribe((response: any) => {
        const matchedDocs = response.docs;
        if (matchedDocs.length > 0) {
          const user = matchedDocs[0];

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
        } else {
          Swal.fire({
            title: 'Oops!',
            text: 'User not found.',
            icon: 'error',
            confirmButtonText: 'Got it!'
          });
        }
      });
  }
}
