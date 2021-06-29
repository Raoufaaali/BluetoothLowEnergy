import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx/';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx/';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [ BluetoothLE, AndroidPermissions, Diagnostic, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
