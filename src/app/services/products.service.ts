import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({ providedIn : 'root'})
export class ProductsService
{
    constructor(private http:HttpClient) {
        
    }

    getAllProducts(): Observable<Product[]> {
        let host = environment.host ;
        return this.http.get<Product[]>(host + '/products');
    }

    getSelectedProducts(): Observable<Product[]> {
        let host =  environment.host;
        return this.http.get<Product[]>(host + '/products?selected=true');
    }

    getAvailableProducts(): Observable<Product[]> {
        let host =  environment.host ;
        return this.http.get<Product[]>(host + '/products?available=true');
    }

    searchProducts(keyword: string): Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host + '/products?name_like=' + keyword);
    }

    select(produit: Product): Observable<Product> {
        let host = environment.host;
        produit.selected = !produit.selected;
        return this.http.put<Product>(host + '/products/' + produit.id,produit);
    }

    available(produit: Product): Observable<Product> {
        let host = environment.host;
        produit.available = !produit.available;
        return this.http.put<Product>(host + '/products/' + produit.id, produit);
    }

    delete(id: number): Observable<void> {
        let host = environment.host;
        return this.http.delete<void>(host + '/products/' + id);
    }

    save(produit: Product): Observable<Product> {
        let host = environment.host;
        return this.http.post<Product>(host + '/products', produit);
    }

    getProduct(id:number): Observable<Product> {
        let host = environment.host;
        return this.http.get<Product>(host + '/products/' + id);
    }

    update(produit: Product): Observable<Product> {
        let host = environment.host;
        produit.available = produit.available && produit.quantity > 0;
        return this.http.put<Product>(host + '/products/'+produit.id, produit);
    }
}