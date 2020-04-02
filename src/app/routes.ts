import { MemoryListComponent } from '@memories/memory-list.component';
import { CardLinkComponent } from '@cards/card-link.component';
import { EditCardComponent } from '@cards/edit-card/edit-card.component';
import { AuthGuard } from '@core/auth.guard';
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export default [
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'memories', component: MemoryListComponent, canActivate: [AuthGuard] },
  { path: 'cards', component: CardLinkComponent, canActivate: [AuthGuard] },
  { path: 'cards/add', component: EditCardComponent },
  { path: 'cards/edit/:id', component: EditCardComponent },
  { path: 'login', component: LoginComponent },
] as Route[];
