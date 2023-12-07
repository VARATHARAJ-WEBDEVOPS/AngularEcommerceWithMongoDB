import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private router: Router) { }

  navigateToCreate() {
    this.router.navigateByUrl('create');
  }

  navigateToRead() {
    this.router.navigateByUrl('read');''
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
        localStorage.removeItem('adminToken');
        this.router.navigateByUrl('/');
      }
    });
  }
  
}
