import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { ProductListResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolver implements Resolve<ProductListResolved> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductListResolved> {
    return this.productService.getProducts()
    .pipe(
      map(products => ({products: products})),
      catchError( error => {
       const somemessage = 'xyz message';
       return of({products: null , error: somemessage});
      })
    );
  }

}
