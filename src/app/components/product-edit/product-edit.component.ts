import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId: number;
  submitted: boolean = false;
  productFormGroup: FormGroup = new FormGroup({});

  constructor(private activatedRoute: ActivatedRoute, private productService:ProductsService, private fb:FormBuilder, private eventDriverService:EventDriverService) {
    this.productId = activatedRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(product => {
      this.productFormGroup = this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected, Validators.required],
        available: [product.available, Validators.required],
      })
    })
  }

  onUpdateProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.productService.update(this.productFormGroup.value)
      .subscribe(data => {
        this.eventDriverService.publishEvent({
          type: ProductActionTypes.PRODUCT_UPDATED
        });
        alert('success update')
      });
  }

}
