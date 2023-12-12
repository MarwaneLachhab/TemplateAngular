// slider.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  sliderImages$: Observable<any[]> = new Observable<any[]>(); // Initialize it here

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.sliderImages$ = this.dataService.getSliderImages();
  }
}
