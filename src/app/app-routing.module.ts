import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemoryListComponent } from './memory-list/memory-list.component';


const routes: Routes = [{ path: '', component: MemoryListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
