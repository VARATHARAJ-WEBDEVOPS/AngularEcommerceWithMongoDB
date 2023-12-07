import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: any;
  userData: any;
  products: any;

  constructor (private API: UserService,
    private Product_API: ProductService,
    private router: Router) {}

  ngOnInit(): void {

    this.userId = localStorage.getItem('userToken');
    if (!this.userId) {
      this.router.navigateByUrl('');
    }
    this.getAllProducts();
  }

  getAllProducts() {
    this.Product_API.getAllproducts().subscribe( (res) => {
      console.log(res);
      this.products = res
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
