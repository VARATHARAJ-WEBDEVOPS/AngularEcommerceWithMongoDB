import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  products: any;
  isEditContainer: boolean = false;
  productForm!: FormGroup;

  constructor(private API: APIService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getallProducts();

    this.productForm = this.fb.group({
      productname: [''],
      quantity: [''],
      stock: [null],
      category: [''],
      imgUrl: [''],
      price: [null],
      _id: [''],
      _rev: [''],
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
    this.API.getAllproducts().subscribe((Response) => {
      this.products = Response.rows.map((row: any) => row.doc);
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
        this.API.updateProduct(this.productForm.value._id, this.productForm.value)
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
        this.API.deleteProduct(this.productForm.value._id, this.productForm.value._rev)
          .subscribe((res) => {
            console.log(res);
            this.getallProducts();
            this.alert('Deleted Successfully! :)')
          });
      }
    });
  }
}
