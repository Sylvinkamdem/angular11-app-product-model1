import {  ProductActionTypes } from "./../../../state/product.state";
import { Component, OnInit } from '@angular/core';
import { EventDriverService } from "src/app/services/event.driver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  
  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  }

  onGetAllProduct() {
    this.eventDriverService.publishEvent({ type: ProductActionTypes.GET_ALL_PRODUCTS });
  }

  onGetSelectedProduct() {
    this.eventDriverService.publishEvent ({ type: ProductActionTypes.GET_SELECTEC_PRODUCTS });
  }

  onGetAvailableProduct() {
    this.eventDriverService.publishEvent({ type: ProductActionTypes.GET_AVAILABLE_PRODUCTS });
  }

  onNewProduct() {
    this.eventDriverService.publishEvent({ type: ProductActionTypes.NEW_PRODUCT });
  }

  onSearch(value: string) {
    this.eventDriverService.publishEvent({ type: ProductActionTypes.SEARCH_PRODUCTS, payload: value });
  }

}
