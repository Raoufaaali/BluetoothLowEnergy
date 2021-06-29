import { Component } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private bluetoothle: BluetoothLE,
    private platform: Platform
  ) {

    this.initializeApp();
  }

  public initializeApp(): void {
    this.platform.ready().then(() => {

      console.log('Platform ready from');
     
    });

  }


}
