import { Product } from './product';

export class MockProduct implements Product {
  id: 1;
  categoryId: 1;
  description: 'Product desc';
  price: 25.5;
  productCode: 'AB45';
  productName: 'Infant Toy';
  quantityInStock: 100;
  searchKey: ["Toy","Infant"];
  supplierIds: [1,4,5];
}
