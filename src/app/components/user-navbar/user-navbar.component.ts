import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})

export class UserNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    Swal.fire({
      title: 'Are you sure to Log out?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken');
        this.router.navigateByUrl('');
      }
    });
  }

}
