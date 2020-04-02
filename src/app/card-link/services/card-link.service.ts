import { Injectable } from '@angular/core';
import { Card } from '../card.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from '@core/entity.model';
import { FireStoreService } from '@core/fire-store.service';

@Injectable()
export class CardLinkService {
  private collectionName = 'cards';
  private cards$: Observable<Entity<Card>[]>;

  constructor(
    private firestore: FireStoreService
  ) {
    this.cards$ = this.firestore.getCollectionData$(this.collectionName);
  }


  addCard(newCard: Card) {
    this.firestore.createEntity(this.collectionName, newCard);
  }

  editCard(id: string, record: Card) {
    this.firestore.patchEntity(
      this.collectionName,
      id,
      record
    );
  }

  getCards(): Observable<Entity<Card>[]> {
    return this.cards$;
  }

  getCardById(id: string): Observable<Entity<Card>> {
    return this.firestore.getDocument(this.collectionName, id);
  }

  delete(id: string) {
    this.firestore.deleteEntity(this.collectionName, id);
  }
}
