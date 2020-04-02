import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap, delay } from 'rxjs/operators';
import { CardLinkService } from '../services/card-link.service';
import { Observable, iif } from 'rxjs';
import { Card } from '../card.model';
import { Entity } from '@core/entity.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit, AfterViewInit {
  isEdit = false;
  // card: Card = { text: '', title: '', url: '' };
  id = '';

  cardForm = new FormGroup({
    text: new FormControl(''),
    title: new FormControl(''),
    url: new FormControl(''),
  });

  @ViewChild('firstInput') firstInput: ElementRef;
  ngAfterViewInit() {
    this.firstInput.nativeElement.focus();
  }
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
      ).subscribe(card => {
        if (card) {
          // this.card = card.data;
          this.cardForm.setValue(card.data);
          this.id = card.id;
        }
      }, err => {
        console.log(err, 'no doc');
      });
  }

  private add() {
    this.service.addCard(this.cardForm.value);
    this.router.navigate(['./']);
  }

  private edit() {
    this.service.editCard(this.id, this.cardForm.value);
    this.router.navigate(['./']);
  }

  submit() {
    if (this.isEdit) {
      this.edit();
    } else {
      this.add();
    }
  }

  cancel() {
    this.router.navigate(['./']);
  }
}
