import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./bl-connect/bl-connect.module').then( m => m.BlConnectPageModule)
  },
  {
    path: '',
    redirectTo: 'connect',
    pathMatch: 'full'
  },
  {
    path: 'connect',
    loadChildren: () => import('./bl-connect/bl-connect.module').then( m => m.BlConnectPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
