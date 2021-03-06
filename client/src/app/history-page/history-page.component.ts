import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order, Filter } from '../shared/interfaces';

const STEP = 4

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild('tooltip') tooltipRef : ElementRef
  tooltip : MaterialInstance
  isFilterVisible = false
  orders:Order[] = []
  oSub: Subscription
  offset = 0
  limit = STEP
  loading = false
  reloading = false
  noMore = false
  filter:Filter = {}

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }
  private fetch() {
    const params = Object.assign({},this.filter,{
      offset:this.offset,
      limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params).subscribe(
      orders => {
        this.orders = this.orders.concat(orders)
        this.noMore = orders.length < STEP 
        this.loading = false
        this.reloading = false
      })
  }
  ngOnDestroy() {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }
  ngAfterViewInit() {
    this.tooltip = MaterialService.initTT(this.tooltipRef)
  }
  loadMore() {
    this.offset+= STEP
    this.fetch()
    this.loading = true
  }
  applyFilter(filter:Filter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()

  }
  isFiltered(): boolean {
    return Object.keys(this.filter).length !==0
  }

}
