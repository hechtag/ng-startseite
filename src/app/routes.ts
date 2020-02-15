import { MemoryListComponent } from './memory-list/memory-list.component';
import { CardLinkComponent } from './card-link/card-link.component';
import { EditCardComponent } from './card-link/edit-card/edit-card.component';

export default [
    { path: '', redirectTo: '/cards', pathMatch: 'full' },
    { path: 'memories', component: MemoryListComponent },
    { path: 'cards', component: CardLinkComponent },
    { path: 'cards/add', component: EditCardComponent },
    { path: 'cards/edit/:id', component: EditCardComponent },
];
