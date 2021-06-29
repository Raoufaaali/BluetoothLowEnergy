import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlConnectPageRoutingModule } from './bl-connect-routing.module';

import { BlConnectPage } from './bl-connect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlConnectPageRoutingModule
  ],
  declarations: [BlConnectPage]
})
export class BlConnectPageModule {}
