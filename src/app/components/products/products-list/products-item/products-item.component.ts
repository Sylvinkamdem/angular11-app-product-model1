import { ProductActionTypes } from "./../../../../state/product.state";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product?: Product;
  @Output() prodItemEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly pat = ProductActionTypes;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.prodItemEventEmitter.emit({
      type: this.pat.SELECT_PRODUCT,
      payload: product
    });
  }

  onDelete(id: number) {
    this.prodItemEventEmitter.emit({
      type: this.pat.DELETE_PRODUCT,
      payload: id
    });
  }

  onEdit(product:Product) {
    this.prodItemEventEmitter.emit({
      type: this.pat.EDIT_PRODUCT,
      payload: product
    });
  }

}
