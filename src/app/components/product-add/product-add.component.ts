import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(private fb:FormBuilder, private productService:ProductsService, private evenDriverService:EventDriverService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    })
  }

  onSaveProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.productService.save(this.productFormGroup.value)
      .subscribe(data => {
        this.evenDriverService.publishEvent({
          type: ProductActionTypes.PRODUCT_ADDED
        });
        alert('success saving')
      });
  }

}
