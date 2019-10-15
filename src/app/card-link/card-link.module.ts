import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLinkComponent } from './card-link.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [CardLinkComponent, CardComponent],
  imports: [
    CommonModule
  ]
})
export class CardLinkModule { }
