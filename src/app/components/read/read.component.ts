import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/service/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  products: any;
  isEditContainer: boolean = false;
  productForm!: FormGroup;

  constructor(
    private Product_API: ProductService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      this.router.navigateByUrl('');
    }
    this.getallProducts();

    this.productForm = this.fb.group({
      productname: [''],
      quantity: [''],
      stock: [null],
      category: [''],
      imgUrl: [''],
      price: [null],
      _id: ['']
    });
  }

  alert(message: string) {
    Swal.fire({
      title: 'Yep!',
      text: `${message}`,
      icon: 'success',
      confirmButtonText: 'Got it!'
    });
  }

  getallProducts() {
    this.Product_API.getAllproducts().subscribe((Response) => {
      this.products = Response
      console.log(this.products);

    });
  }

  editAction(editProduct: any) {
    console.log(editProduct);
    this.isEditContainer = true;
    this.productForm.patchValue(editProduct);
  }

  updatePoduct() {
    Swal.fire({
      title: 'Are you sure to Edit?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, edit!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Product_API.updateProduct(this.productForm.value._id, this.productForm.value)
          .subscribe((res) => {
            console.log(res);
            this.getallProducts();
            this.isEditContainer = false;
            this.alert('Successfully Update! :)')
          });
      }
    });
  }

  deleteProduct () {
    Swal.fire({
      title: 'Are you sure to delete?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Product_API.deleteProduct(this.productForm.value._id, this.productForm.value._rev)
          .subscribe((res) => {
            console.log(res);
            this.getallProducts();
            this.alert('Deleted Successfully! :)')
          });
      }
    });
  }
}
