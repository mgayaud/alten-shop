import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { PrimeNGModule } from '../shared/utils/primeng/primeng.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsAdminComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  exports: [
    ProductsComponent,
    ProductsAdminComponent
  ]
})
export class ProductModule { }
