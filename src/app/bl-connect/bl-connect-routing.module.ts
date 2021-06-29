import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlConnectPage } from './bl-connect.page';

const routes: Routes = [
  {
    path: '',
    component: BlConnectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlConnectPageRoutingModule {}
