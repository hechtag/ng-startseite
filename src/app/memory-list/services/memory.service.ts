import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Memory } from '../shared/memory';
import { FireStoreService } from 'src/app/core/fire-store.service';
import { Entity } from 'src/app/core/entity.model';

@Injectable()
export class MemoryService {
  private collectionName = 'memories';
  private memories$: Observable<Entity<Memory>[]>;

  constructor(
    private firestore: FireStoreService
  ) {
    this.memories$ = firestore.getCollectionData$(this.collectionName);
  }

  addMemory(memoryString: string) {
    const memory = { text: memoryString, done: false } as Memory;
    this.firestore.createEntity(this.collectionName, memory);
  }

  getMemories(): Observable<Entity<Memory>[]> {
    return this.memories$;
  }

  delete(id: string) {
    this.firestore.deleteEntity(this.collectionName, id);
  }

  isDone(id: string) {
    this.firestore.patchEntity(this.collectionName, id, { done: true });
  }

  cleanUpDones() {
    const sub = this.firestore.getCollectionData$<Memory>(this.collectionName).subscribe(entities => {
      entities.filter(d => d.data.done === true).forEach(d => {
        this.firestore.deleteEntity(this.collectionName, d.id);
      });
      timer(500).subscribe(() => sub.unsubscribe());
    });
  }
}
