import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppCoreComponent } from './app-core.component';

const routes: Routes = [{ path: '', component: AppCoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCoreRoutingModule { }
