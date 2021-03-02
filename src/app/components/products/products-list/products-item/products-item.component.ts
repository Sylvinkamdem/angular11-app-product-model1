import { ProductActionTypes } from "./../../../../state/product.state";
import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from "src/app/services/event.driver.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product?: Product;
  readonly pat = ProductActionTypes;

  constructor(private eventDriverService:EventDriverService, private productsService : ProductsService) { 
    
  }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.eventDriverService.publishEvent({
      type: this.pat.SELECT_PRODUCT,
      payload: product
    });
  }

  onDelete(id: number) {
    let v = confirm("Are you sure?");
    if(v===true)
    this.eventDriverService.publishEvent({
      type: this.pat.DELETE_PRODUCT,
      payload: id
    });
  }

  onEdit(product:Product) {
    this.eventDriverService.publishEvent({
      type: this.pat.EDIT_PRODUCT,
      payload: product
    });
  }

  onAvailable(product:Product) {
    this.productsService.available(product).subscribe((data) => {
      product.available = data.available;
      this.eventDriverService.publishEvent({ type: this.pat.PRODUCT_UPDATED });
    });
  }

}
