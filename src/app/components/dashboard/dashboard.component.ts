import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: any;
  userData: any;
  products: any;

  constructor (private API: APIService,
    private router: Router) {}

  ngOnInit(): void {

    this.userId = localStorage.getItem('userToken');

    // if (!this.userId) {
    //   this.router.navigateByUrl('');
    // }
    this.getAllProducts();
  }

  getAllProducts() {
    this.API.getAllproducts().subscribe( (res) => {
      console.log(res);
      this.products = res.rows.map((row: any) => row.doc);
    });
  }

  getUserData() {
    this.API.readDocument(this.userId)
    .subscribe(document => {
      console.log('Read Document Response: ', document);
      this.userData = document;
    });
  }

}
