import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Memory } from '../memory-list/shared/memory';
import { map, tap, switchMap } from 'rxjs/operators';
import { Entity } from './entity.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  userPath$: Observable<string>;
  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
  ) {
    this.userPath$ = this.auth.user$.pipe(map(user => `users/${user.uid}/`));
  }

  getCollectionData$<T>(collectionName: string): Observable<Entity<T>[]> {
    return this.userPath$.pipe(
      switchMap(path => this.db.collection(path + collectionName).snapshotChanges()),
      map(s => s.map(d => {
        const data = d.payload.doc.data() as T;
        return { data, id: d.payload.doc.id } as Entity<T>;
      }))
    );
  }

  createEntity<T>(collectionName: string, record: T) {
    this.userPath$.subscribe(path => {
      this.db.collection(path + collectionName).add(record);
    });
  }

  deleteEntity(collectionName: string, id: string) {
    this.userPath$.subscribe(path => {
      this.db.collection(path + collectionName).doc(id).delete();
    });
  }

  getDocument<T>(collectionName, id: string): Observable<Entity<T>> {
    return this.userPath$.pipe(
      switchMap(path => this.db.collection(path + collectionName)
        .doc(id)
        .valueChanges()),
      map(d => {
        return { id, data: d } as Entity<T>;
      }));
  }

  patchEntity<T>(collectionName: string, id: string, patchRecord: T) {
    this.userPath$.pipe(switchMap(path => this.db.collection(path + collectionName).doc(id).get())).subscribe(doc => {
      const patchedDoc = { ...doc.data(), ...patchRecord };
      this.db.collection(collectionName).doc(id).set(patchedDoc);
    });
  }
}
