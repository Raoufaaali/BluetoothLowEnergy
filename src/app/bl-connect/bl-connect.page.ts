import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx/';
import { BluetoothLE, InitParams, ScanParams, ScanStatus } from '@ionic-native/bluetooth-le/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx/';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-bl-connect',
  templateUrl: './bl-connect.page.html',
  styleUrls: ['./bl-connect.page.scss'],
})
export class BlConnectPage {


 public unpairedDevices: any[];
 public pairedDevices: any;
 public gettingDevices: boolean;
 

  constructor(private ble: BluetoothLE, private alertController: AlertController, private androidPermissions: AndroidPermissions, private diagnostic: Diagnostic) { }

  public ionViewWillEnter()
  {
    this.initBluetoothOnDevice();
    console.log('will Enter');
  }

  public initBluetoothOnDevice()
  {
    let initParms: InitParams = {request: true, restoreKey: 'PlayerMax Lock'};
    this.ble.initialize(initParms).subscribe(status => console.log(status));1
  }

  public async startScanning()
  {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then((data:any) => {
      if(data.hasPermission) {
         console.log("have permission ACCESS_COARSE_LOCATION");
      }      
   });

   this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then((data:any) => {
    if(data.hasPermission) {
       console.log("have permission ACCESS_FINE_LOCATION");
    }      
 });
     

    let scanPrams: ScanParams = {};
    scanPrams.isConnectable = true;
    // this.ble.startScan(scanPrams).subscribe(scanStatus => console.log(scanStatus.name));
    this.startScan();

  }

  public startScan() {
    console.log('Scanning for Bluetooth LE Devices');
    this.unpairedDevices = [];  // clear list
    this.ble.startScan({ services: [] }).subscribe((successScanStatus) => {
     // debugger;
      console.log("startScan: " + JSON.stringify(successScanStatus));
      this.addUniqueDevicesToList(successScanStatus);
    }, (error) => {
      console.log("error: " + JSON.stringify(error));
    })
    setTimeout(() => {
      console.log('Stopping the scan');
      this.disconnect()

    }, 5000, 'Scan complete');
  }

  public async disconnect()
  {
    var scanStopedStatus = await this.ble.stopScan();
    console.log(scanStopedStatus);

  }

  public addUniqueDevicesToList(scanStatus: ScanStatus)
  {
    if (this.unpairedDevices.indexOf(scanStatus.address) === -1)
    {
      this.unpairedDevices.push(scanStatus);
    }
  }

  public selectDevice(deviceAny)
  {

  }

}
