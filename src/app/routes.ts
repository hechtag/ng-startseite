import { MemoryListComponent } from './memory-list/memory-list.component';
import { CardLinkComponent } from './card-link/card-link.component';

export default [
    { path: '', redirectTo: '/memories', pathMatch: 'full' },
    { path: 'memories', component: MemoryListComponent },
    { path: 'cards', component: CardLinkComponent },
];
