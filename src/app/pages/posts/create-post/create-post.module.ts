import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostRoutingModule } from './create-post-routing.module';
import { CreatePostComponent } from './create-post.component';


@NgModule({
  declarations: [CreatePostComponent],
  imports: [
    CommonModule,
    CreatePostRoutingModule
  ]
})
export class CreatePostModule { }
