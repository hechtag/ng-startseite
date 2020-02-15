import { Component, OnInit } from '@angular/core';
import { Card } from './shared/card';
import { CardLinkService } from './services/card-link.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.scss']
})
export class CardLinkComponent implements OnInit {
  cards$: Observable<Card[]>;

  constructor(
    private readonly service: CardLinkService,
    private readonly router: Router,
  ) { }
  ngOnInit() {
    this.cards$ = this.service.getCards();
  }

  addCard() {
    this.router.navigate(['cards', 'add']);
  }

  handleEdit(card) {
    this.router.navigate(['cards', 'edit', card.id]);
  }

}
