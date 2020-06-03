import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GhostListComponent } from './ghost-list.component';

const routes: Routes = [{ path: '', component: GhostListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GhostListRoutingModule { }
