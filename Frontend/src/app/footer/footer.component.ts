import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer_link$!: Observable<any[]>; // Note the "!" to tell TypeScript that it will be initialized in ngOnInit

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.footer_link$ = this.dataService.getFooterrLinkes();
  }
}
