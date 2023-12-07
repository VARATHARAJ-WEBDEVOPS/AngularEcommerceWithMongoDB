import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    const admin = localStorage.getItem('adminToken');
    if (token) {
      this.router.navigateByUrl('dashboard');
    } else if (admin) {
      this.router.navigateByUrl('create');

    }
  }

}
