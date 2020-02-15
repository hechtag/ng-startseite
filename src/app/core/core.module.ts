import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdService } from './id.service';
import { ModalService } from './modal.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [IdService, ModalService]
})
export class CoreModule { }
