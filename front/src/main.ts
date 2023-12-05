import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { ProductModule } from 'app/product/product.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
