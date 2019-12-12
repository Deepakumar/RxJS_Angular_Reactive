import { MockProduct } from './../mockProduct';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable, of, from, interval } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId;
  mockProductObservable: Observable<Product>;

  products: Product[] = [];
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe(
      products => this.products = products,
      error => this.errorMessage = error
    );

    this.mockProductObservable = this.mockProducts();

    const productObserver = {
      next: product => console.log(product),
      error: err => console.log(err),
      complete: () => console.log('No more products')
    };

    const sub = this.mockProductObservable.subscribe(productObserver);

    //sub.unsubscribe();

    const num = interval(1000).subscribe(console.log);

    console.log('RxJs Operators');
    of(2, 4, 6, 8).pipe(
      map(item => item * 2)
    ).subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }

  mockProducts(): Observable<Product> {
    const product1: { base: Product; } = {
      base: {
        id: 1,
        categoryId: 1,
        description: 'desc',
        price: 105,
        productCode: 'AC45',
        productName: 'TOY',
        quantityInStock: 45,
        searchKey: ['In', 'Toy'],
        supplierIds: [1, 2, 5]
      }
  };
    //Option 1
    // const productStream = new Observable<Product>(productObserver => {
    //   productObserver.next(product1.base);
    //   productObserver.next(product1.base);
    //   productObserver.complete();
    // });

    //Option 2
    //const productStream = of(product1.base, product1.base);

    //Option 3
    const productStream = from([product1.base, product1.base]);

    return productStream;
  }

}
