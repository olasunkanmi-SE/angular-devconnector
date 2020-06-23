import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReplyComponent } from './reply.component';

const routes: Routes = [{ path: '', component: ReplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplyRoutingModule { }
