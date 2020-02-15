import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap, delay } from 'rxjs/operators';
import { CardLinkService } from '../services/card-link.service';
import { Observable, iif } from 'rxjs';
import { Card } from '../shared/card';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
  isEdit = false;
  card: Card = { text: '', title: '', url: '', id: '' };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly service: CardLinkService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(0),
        tap(d => this.isEdit = !!d.id),
        switchMap(d => this.service.getCardById(d.id)),
      )
      .subscribe(card => {
        if (card) {
          this.card = card;
        }
      });
  }

  add() {
    this.service.addCard(this.card);
    this.router.navigate(['./']);
  }
  edit() {
    this.service.editCard(this.card);
    this.router.navigate(['./']);
  }
}
