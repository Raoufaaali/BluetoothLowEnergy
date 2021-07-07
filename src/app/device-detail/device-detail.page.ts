import { ChangeDetectorRef, Component } from '@angular/core';
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
    device:  { address: '', status: null, services: null, name: '' } as Device,
    deviceInfo: ''
  };
  constructor(
    private blService: BluetoothService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
    ) { }


  public async ionViewWillEnter()
  {
    const address: string = this.route.snapshot.paramMap.get('address');
    console.log(address);
    if (address) {

      let isConnected = await this.blService.isConnected(address);
      if (isConnected)
      {
        console.log('device is connected, Going to discover');
        await this.discover(address);
      }
      else 
      {
        console.log('device is not connected. Attempting to connect....');
        this.connectDevice(address);
      }
    }   
      
  }

  public async discover(address: string)
  {
    this.vm.device = await this.blService.discover(address);
    this.vm.deviceInfo = JSON.stringify(this.vm.device);
    console.log(JSON.stringify(this.vm.device));
    console.log(this.vm.deviceInfo);
    this.cdr.detectChanges();
  }

  public connectDevice(address: string)
  {

    let deviceInfo = this.blService.connectDevice(address).subscribe((successDeviceInfo) => {

      console.log('Connection Success!');
      console.log(JSON.stringify(successDeviceInfo));
      console.log('Discovering...');
      this.discover(address);
    }, 
    (error) => {
      console.log(JSON.stringify(error));
    });

  }

  public sendPing(address: string) {
    this.blService.sendPing(address);
  }

}
