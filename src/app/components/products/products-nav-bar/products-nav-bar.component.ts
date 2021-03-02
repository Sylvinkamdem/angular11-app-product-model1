import { ActionEvent, ProductActionTypes } from "./../../../state/product.state";
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProduct() {
    this.productEventEmitter.emit({type:ProductActionTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProduct() {
    this.productEventEmitter.emit({ type: ProductActionTypes.GET_SELECTEC_PRODUCTS });
  }

  onGetAvailableProduct() {
    this.productEventEmitter.emit({ type: ProductActionTypes.GET_AVAILABLE_PRODUCTS });
  }

  onNewProduct() {
    this.productEventEmitter.emit({ type: ProductActionTypes.NEW_PRODUCT });
  }

  onSearch(value: string) {
    this.productEventEmitter.emit({ type: ProductActionTypes.SEARCH_PRODUCTS, payload: value });
  }

}
