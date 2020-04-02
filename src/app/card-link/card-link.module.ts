import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLinkComponent } from './card-link.component';
import { CardComponent } from './card/card.component';
import { CardLinkService } from './services/card-link.service';
import { EditCardComponent } from './edit-card/edit-card.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CardLinkComponent, CardComponent, EditCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  exports: [CardComponent, CardLinkComponent],
  providers: [CardLinkService]
})
export class CardLinkModule { }
