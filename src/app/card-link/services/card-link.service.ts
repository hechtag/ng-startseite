import { Injectable } from '@angular/core';
import { Card } from '../shared/card';
import { BehaviorSubject, Observable } from 'rxjs';
import { IdService } from 'src/app/core/id.service';

@Injectable()
export class CardLinkService {
  private localStorageKey = 'cards';
  private cards$: BehaviorSubject<Card[]>;

  constructor(private idService: IdService) {
    this.cards$ = new BehaviorSubject(this.getFromStorage());
  }

  private default = [
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '1' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '2' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '3' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '4' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '5' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '6' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '7' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '8' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '9' },
    { title: 'Google', url: 'http://www.google.com', text: 'asd', id: '10' },
  ];

  addCard(newCard: Card) {
    newCard.id = this.idService.getNewId();

    const cards = this.cards$.value;
    cards.unshift(newCard);
    this.handleCards(cards);
  }

  getCards(): Observable<Card[]> {
    return this.cards$.asObservable();
  }

  delete(id: string) {
    const newVal = this.cards$.value.filter(m => m.id !== id);
    this.handleCards(newVal);
  }

  private handleCards(value: Card[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(value));
    this.cards$.next(value);
  }

  private getFromStorage(): Card[] {
    const cardString = localStorage.getItem(this.localStorageKey);
    const cards = JSON.parse(cardString) as Card[];
    return !!cards ? cards : this.default;
  }
}
