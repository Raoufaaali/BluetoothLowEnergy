import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx/';
import { BluetoothLE, ConnectionParams, InitParams, ScanParams, ScanStatus } from '@ionic-native/bluetooth-le/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx/';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-bl-connect',
  templateUrl: './bl-connect.page.html',
  styleUrls: ['./bl-connect.page.scss'],
})
export class BlConnectPage {


 public unpairedDevices: ScanStatus[];
 public pairedDevices: any;
 public gettingDevices: boolean;
 
  constructor(private ble: BluetoothLE, private alertController: AlertController, private androidPermissions: AndroidPermissions, private diagnostic: Diagnostic) { }

  public ionViewWillEnter()
  {
    this.initBluetoothOnDevice();
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
        // console.log("have permission ACCESS_COARSE_LOCATION");
      }      
   });

   this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then((data:any) => {
    if(data.hasPermission) {
      // console.log("have permission ACCESS_FINE_LOCATION");
    }      
 });
    this.startScan();
  }

  public startScan() {

    let scanPrams: ScanParams = {};
    scanPrams.isConnectable = true;
    scanPrams.allowDuplicates = false;

    console.log('Scanning for Bluetooth LE Devices');
    this.unpairedDevices = [];  // clear list
    this.gettingDevices = true;
    this.ble.startScan(scanPrams).subscribe( successScanStatus => {
     // debugger;
     // console.log(JSON.stringify(successScanStatus));
     console.log(successScanStatus);
      this.addUniqueDevicesToList(successScanStatus);
    }, (error) => {
      console.log("error: " + JSON.stringify(error));
    })
    setTimeout(() => {
      console.log('Stopping the scan');
      this.stopScan()

    }, 2000, 'Scan complete');
  }

  public async stopScan()
  {
    var scanStopedStatus = await this.ble.stopScan();
    this.gettingDevices = false;
    this.presentAlert(scanStopedStatus.status);
  }
  
  public addUniqueDevicesToList(scanStatus: ScanStatus)
  {
   // debugger;
    console.log(`scan status to check ${scanStatus}`);
    // only add the device if it has an address and wasnt seen before
   if ( scanStatus?.address && !this.unpairedDevices.some(e => e.address == scanStatus.address))
    {
      console.log(`going to add address ${scanStatus.address}`);
      this.unpairedDevices.push(scanStatus);
    }
    else {
      console.log(`address ${scanStatus.address} already exists`);
    }
  }

  public selectDevice(deviceAny)
  {

  }

  public connectDevice(deviceAddress: string)
  {
    this.gettingDevices = true;
    let params: ConnectionParams = {address: deviceAddress};
    this.ble.connect(params).subscribe((deviceInfo) => {
      this.gettingDevices = false;
      this.presentAlert(`Success! DeviceInfo.status = ${deviceInfo.status} !`);
      console.log(deviceInfo);
      this.discover(deviceAddress);
      
    },
    (error) => {
      this.gettingDevices = false;
      this.presentAlert('connection fail!');
      this.presentAlert(error.message);
        }
    
    );


  }

  public async discover(address: string)
  {
    this.gettingDevices = true;
    let params = {
      address: address,
      clearCache: true
    }

    var device = await this.ble.discover(params);
    this.gettingDevices = false;

      if (device)
      {
        this.presentAlert(JSON.stringify(device));
        console.log(JSON.stringify(device));
      }

  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Info!',
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          //  this.doNothing();
          }
        }
      ]
    });

    await alert.present();
  }



}
