import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '@ionic-native/bluetooth-le/ngx';
import { BluetoothService } from '../services/bluetooth/bluetooth.service';

export interface DeviceViewModel {
  device: Device,
  deviceInfo: string
}

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage {
  public device: Device;

  public vm: DeviceViewModel = {
    /* tslint:disable-next-line */
    device: null,
    deviceInfo: ''
  };
  constructor(
    private blService: BluetoothService,
    private route: ActivatedRoute
    ) { }


  public async ionViewWillEnter()
  {
    const address: string = this.route.snapshot.paramMap.get('address');
    console.log(address);
    if (address) {

      let isConnected = await this.blService.isConnected(address);
      if (isConnected)
      {
        this.discover(address);
      }
      else 
      {
        let deviceInfo = await this.blService.connectDevice(address);
        console.log(JSON.stringify(deviceInfo));
      }
      
    }   
    /*
    IF device connected
      Discover
    ELSE 
    Connect





    */

      
  }

  public async discover(address: string)
  {
    this.vm.device = await this.blService.discover(address);
    this.vm.deviceInfo = JSON.stringify(this.vm.device);
    console.log(this.vm.deviceInfo);
  }

}
