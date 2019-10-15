import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemoryListComponent } from './memory-list/memory-list.component';
import { CardLinkComponent } from './card-link/card-link.component';


const routes: Routes = [
  { path: '', redirectTo: '/memories', pathMatch: 'full' },
  { path: 'memories', component: MemoryListComponent },
  { path: 'cards', component: CardLinkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
