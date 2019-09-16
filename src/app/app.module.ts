import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemoryListModule } from './memory-list/memory-list.module';
import { CardLinkModule } from './card-link/card-link.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MemoryListModule,
    CardLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
