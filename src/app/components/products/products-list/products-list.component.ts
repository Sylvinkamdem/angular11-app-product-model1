import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/model/product.model';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { EventDriverService } from "src/app/services/event.driver.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;

  readonly DataStateEnum = DataStateEnum;

  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  }

}
