import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplyRoutingModule } from './reply-routing.module';
import { ReplyComponent } from './reply.component';


@NgModule({
  declarations: [ReplyComponent],
  imports: [
    CommonModule,
    ReplyRoutingModule
  ]
})
export class ReplyModule { }
