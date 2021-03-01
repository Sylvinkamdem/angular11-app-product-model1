import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
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

  constructor(private productService:ProductsService, private rouer:Router) { }

  ngOnInit(): void {
  }

  onGetAllProduct() {
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
        this.onGetAllProduct();
      })
  }

  onNewProduct() {
    this.rouer.navigateByUrl('/newProduct');
  }

  onEdit(p:Product) {
    this.rouer.navigateByUrl('/editProduct/' + p.id);
  }
}
