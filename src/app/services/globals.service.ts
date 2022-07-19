import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  constructor() { }

  readonly CURRENT_USER = btoa('user_data');

  // Test
  readonly API_URL = 'http://api.viatesting.com.ar/';

  // Produccion
  // readonly API_URL = 'https://ws.busplus.com.ar/';
  // PRIORIDADES
  readonly ALTA = 1;
  readonly MEDIA = 2;
  readonly BAJA = 3;

  // SISTEMA
  // readonly IdSitema = 7;

  // Comando para compilar
  // node --max-old-space-size=4096 ./node_modules/@angular/cli/bin/ng build --prod --base-href  
}


