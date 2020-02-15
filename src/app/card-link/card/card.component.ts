import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../shared/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Output() edit: EventEmitter<Card> = new EventEmitter();
  @Output() delete: EventEmitter<Card> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  editEvent() {
    this.edit.emit(this.card);
  }

  deleteEvent() {
    this.delete.emit(this.card);
  }
}
