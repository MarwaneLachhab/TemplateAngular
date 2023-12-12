// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobileView: boolean = false;
  isSidebarOpen: boolean = false;
  parentLinks: any[] = [];
  semiLinks: any[] = [];
  constructor(private dataService: DataService) { }
  toggleChildLinks(parentLink: any) {
    parentLink.showChildren = !parentLink.showChildren;
  }

  ngOnInit(): void {
    this.fetchData();
    this.apiData$ = this.dataService.getApiData();
    this.unique_table$ = this.dataService.getUniqueTable();
  }

  fetchData(): void {
    this.dataService.getParentLinks().subscribe(
      (data: any[]) => {
        this.parentLinks = data;
      },
      (error) => {
        console.error('Error fetching parent links:', error);
      }
    );

    this.dataService.getSemiLinks().subscribe(
      (data: any[]) => {
        this.semiLinks = data;
      },
      (error) => {
        console.error('Error fetching semi links:', error);
      }
    );
    this.parentLinks.forEach(link => {
      link.showChildren = false; // Initially hide child links
    });
  }
  apiData$: Observable<any> = new Observable<any>();
  unique_table$: Observable<any> = new Observable<any>();





  sidebarActive: boolean = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  closeSidebar() {
    this.sidebarActive = false;
  }
  getCorrespondingSemiLinks(parentLinkId: number): any[] {
    return this.semiLinks.filter(link => link.ParentLinkID === parentLinkId);
  }
  // constructor(private dataService: DataService) {}


}

