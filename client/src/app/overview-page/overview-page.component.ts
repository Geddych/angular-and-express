import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverviewPage, MaterialInstance } from '../shared/interfaces';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit,OnDestroy,AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef : ElementRef

  data$ : Observable<OverviewPage>
  tapTarget : MaterialInstance
  yesterday = new Date

  constructor(private service: AnalyticsService) { }

  ngOnInit() {
    this.data$ = this.service.getOverview()
    this.yesterday.setDate(this.yesterday.getDate()-1)

  }
  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTTarget(this.tapTargetRef)

  }
  ngOnDestroy() {
    this.tapTarget.destroy()
  }
  openInfo() {
    this.tapTarget.open()
  }

}
