import { ActionEvent, ProductActionTypes } from "./../../state/product.state";
import { Component, OnInit, NgModule } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map,startWith,catchError } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  readonly pat = ProductActionTypes;

  constructor(private productService:ProductsService, private rouer:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState:DataStateEnum.LOADING }),
      catchError(err=>of({ dataState:DataStateEnum.ERROR,  errorMessage: err.message}))
    );
  }

  onGetSelectedProduct() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetAvailableProduct() {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSelect(item:Product) {
    this.productService.select(item)
      .subscribe(data => {
        item.selected = data.selected;
    })
  }

  onDelete(id: number) {
    let v = confirm('êtes vous sure?');
    if(v===true)
    this.productService.delete(id)
      .subscribe(() => {
        this.onGetAllProducts();
      })
  }

  onNewProduct() {
    this.rouer.navigateByUrl('/newProduct');
  }

  onEdit(p:Product) {
    this.rouer.navigateByUrl('/editProduct/' + p.id);
  }

  onActionEvent($event:ActionEvent) {
    switch ($event.type) {
      case this.pat.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case this.pat.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProduct();
        break;
      case this.pat.GET_SELECTEC_PRODUCTS:
        this.onGetSelectedProduct();
        break;
      case this.pat.SEARCH_PRODUCTS:
        this.onSearch($event.payload);
        break;
      case this.pat.NEW_PRODUCT:
        this.onNewProduct();
        break;
      case this.pat.EDIT_PRODUCT:
        this.onEdit($event.payload);
        break;
      case this.pat.DELETE_PRODUCT:
        this.onDelete($event.payload);
        break;
      case this.pat.SELECT_PRODUCT:
        this.onSelect($event.payload);
        break;
      default:
        break;
    }
  }
}
