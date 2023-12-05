import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from 'app/product/models/product.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProductsAdminComponent implements OnInit {
  productDialog: boolean;
  products: Product[];
  product: any;
  selectedProducts: Product[];
  submitted: boolean;
  statuses: any[];

  constructor(private productsService: ProductsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(response => {
      this.products = response.data;
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.productsService.removeSelectedProducts(this.selectedProducts.map(selectedProduct => selectedProduct.id)).subscribe();
              this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
              this.selectedProducts = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.productsService.removeProduct(product.id).subscribe();
              this.products = this.products.filter((val) => val.id !== product.id);
              this.product = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name.trim()) {
          if (this.product.id) {
              this.fillUpProductInfos();
              this.productsService.updateProduct(this.product).subscribe();
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          } else {
              this.product.code = this.createCode();
              this.fillUpProductInfos();
              this.productsService.createNewProduct(this.product).subscribe();
              this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createCode(): string {
      let code = '';
      var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 9; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
  }

  fillUpProductInfos() {
    this.product.description = this.product.description ? this.product.description : "Product Description";
    this.product.price = this.product.price ? this.product.price : 0;
    this.product.quantity = this.product.quantity ? this.product.quantity : 0;
    this.product.category = this.product.category ? this.product.category : "Accessories";
    this.product.image = this.product.image ? this.product.image : 'product-placeholder.svg';
    this.product.rating = this.product.rating ? this.product.rating : 5;
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
      }
  }

}
