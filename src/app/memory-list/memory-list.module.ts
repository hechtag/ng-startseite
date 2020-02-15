import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryListComponent } from './memory-list.component';
import { FormsModule } from '@angular/forms';
import { MemoryService } from './services/memory.service';



@NgModule({
  declarations: [MemoryListComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [MemoryService],
  exports: [MemoryListComponent]
})
export class MemoryListModule { }
