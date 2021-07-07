import { Injectable } from '@angular/core';
import { BluetoothLE, ConnectionParams, Device, DeviceInfo, OperationResult, WriteCharacteristicParams } from '@ionic-native/bluetooth-le/ngx';
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
      return device;
  }

  public async isConnected(address: string): Promise<boolean> {
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
    let params: ConnectionParams = {address: address};
    return this.ble.connect(params);
  }

  public sendPing(address: string): Promise<OperationResult>
  {
    let params: WriteCharacteristicParams = {address: address, value: 'V3JpdGUgSGVsbG8gV29ybGQ=', characteristic: '2A06', service: '1802', type: 'noResponse'  };

    return this.ble.write(params);
  }

}
