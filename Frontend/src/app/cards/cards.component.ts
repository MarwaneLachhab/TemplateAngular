// cards.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cards$!: Observable<any[]>; // Note the "!" to tell TypeScript that it will be initialized in ngOnInit

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cards$ = this.dataService.getCards();
  }
}
