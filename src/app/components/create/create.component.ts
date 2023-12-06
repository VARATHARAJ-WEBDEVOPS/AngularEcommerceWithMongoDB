import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  productModel: any = {
    productname: "",
    quantity: '',
    stock: null,
    category: "",
    imgUrl: '',
    price: null
  }

  constructor(private API: APIService) { }

  ngOnInit(): void {

  }

  alert(message: string) {
    Swal.fire({
      title: 'Oops!',
      text: `${message}`,
      icon: 'error',
      confirmButtonText: 'Got it!'
    });
  }

  validation() {
    if (!this.productModel.productname ||
      !this.productModel.quantity ||
      !this.productModel.stock ||
      !this.productModel.category ||
      !this.productModel.imgUrl ||
      !this.productModel.price) {
      this.alert('please fill all the fields');
    } else if (this.productModel.stock < 0 || this.productModel.price < 0) {
      this.alert('Negative values are not valid');
    } else {
      console.log(this.productModel);
      this.API.createProduct(this.productModel).subscribe((res) => {
        console.log(res);
        this.resetForm();
          Swal.fire({
            title: 'Yep!',
            text: 'Item Created',
            icon: 'success',
            confirmButtonText: 'Okey!'
          });
      });
    }
  }

  resetForm() {
    this.productModel.productname = "";
    this.productModel.quantity = '';
    this.productModel.stock = null;
    this.productModel.category = "";
    this.productModel.imgUrl = '';
    this.productModel.price = null;
  }

}
