import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverviewPage } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit{
  
  @ViewChild('tapTarget') tapTargetRef: ElementRef
  data$: Observable<OverviewPage>
  tapTarget: MaterialInstance
  yesterday = new  Date()


  constructor(private service: AnalyticsService) { }

  ngOnInit() {
    this.data$ = this.service.getOverview()

    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngOnDestroy(){
    this.tapTarget.destroy()
  }
  
  ngAfterViewInit(){
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  openInfo(){
    
  }

}
