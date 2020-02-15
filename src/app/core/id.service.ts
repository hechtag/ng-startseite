import { Injectable } from '@angular/core';

@Injectable()
export class IdService {

  constructor() { }
  getNewId(): string {
    const date = new Date();
    const rand = Math.random();
    return date.toISOString() + '-' + rand.toString();
  }
}
