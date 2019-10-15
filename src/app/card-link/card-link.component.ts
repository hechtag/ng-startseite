import { Component, OnInit } from '@angular/core';
import { Card } from './shared/card';

@Component({
  selector: 'app-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.scss']
})
export class CardLinkComponent implements OnInit {

  constructor() { }
  cards: Card[] = [
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
    { title: "Google", url: 'http://www.google.com', text: 'asd' },
  ];

  ngOnInit() {
  }

}
