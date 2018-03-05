import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import 'rxjs/add/operator/take'; // utilisé dans inscription.ts pour la recuperation des data d'un user

platformBrowserDynamic().bootstrapModule(AppModule);
