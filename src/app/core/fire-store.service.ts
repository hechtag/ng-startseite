import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Memory } from '../memory-list/shared/memory';
import { map } from 'rxjs/operators';
import { Entity } from './entity.model';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(private db: AngularFirestore) { }

  getCollectionData$<T>(collectionName: string): Observable<Entity<T>[]> {
    return this.db.collection(collectionName).snapshotChanges().pipe(map(s => s.map(d => {
      const data = d.payload.doc.data() as T;
      return { data, id: d.payload.doc.id } as Entity<T>;
    })));

  }
  createEntity<T>(collectionName: string, record: T) {
    this.db.collection(collectionName).add(record);
  }

  deleteEntity(collectionName: string, id: string) {
    this.db.collection(collectionName).doc(id).delete();
  }

  patchEntity<T>(collectionName: string, id: string, patchRecord: T) {
    this.db.collection(collectionName).doc(id).get().subscribe(doc => {
      const patchedDoc = { ...doc.data(), ...patchRecord };
      this.db.collection(collectionName).doc(id).set(patchedDoc);
    });
  }
}
