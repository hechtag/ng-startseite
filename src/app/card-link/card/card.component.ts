import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card.model';
import { Entity } from '@core/entity.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Entity<Card>;
  @Output() edit: EventEmitter<Entity<Card>> = new EventEmitter();
  @Output() delete: EventEmitter<Entity<Card>> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  editEvent() {
    this.edit.emit(this.card);
  }

  deleteEvent() {
    this.delete.emit(this.card);
  }
}
