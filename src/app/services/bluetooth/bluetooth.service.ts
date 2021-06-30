import { Injectable } from '@angular/core';
import { BluetoothLE, ConnectionParams, Device, DeviceInfo } from '@ionic-native/bluetooth-le/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  constructor(
    private ble: BluetoothLE) { }

  public async discover(address: string): Promise<Device>
  {
    let params = {
      address: address,
      clearCache: true
    }

    let device: Device = await this.ble.discover(params);
        if (device)
      {
        console.log(JSON.stringify(device));
      }
      return device;
  }

  public async isConnected(address: string): Promise<boolean> {
    debugger;
    let params = {
      address: address
    }

    let connectionStatus = await this.ble.isConnected(params).then(() => {
      return true;
    }, (error) => {
      console.log(JSON.stringify(error))
      return false;
        });

    return connectionStatus;
  }

  public connectDevice(address: string): Observable<DeviceInfo>
  {
    let deviceInfo;
    let params: ConnectionParams = {address: address};
    this.ble.connect(params).subscribe((deviceInfo) => {
      console.log(deviceInfo);
      return deviceInfo;
      
    },
    (error) => {
      console.log(JSON.stringify(error));
        }
    );

   return deviceInfo;
  }


}
