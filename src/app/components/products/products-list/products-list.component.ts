import { ProductActionTypes } from "./../../../state/product.state";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  readonly DataStateEnum = DataStateEnum;
  readonly pat = ProductActionTypes;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(item:Product) {
    this.productEventEmitter.emit({ type: this.pat.SELECT_PRODUCT, payload: item });
  }

  onDelete(id: number) {
    this.productEventEmitter.emit({
      type: this.pat.DELETE_PRODUCT, payload: id
    });
  }

  onEdit(item:Product) {
    this.productEventEmitter.emit({
      type: this.pat.EDIT_PRODUCT, payload: item
    });
  }

  onProdItemEventEmitter($event:ActionEvent) {
    this.productEventEmitter.emit($event);
  }

}
