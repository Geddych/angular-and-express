import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialInstance, OrderPosition, Order } from '../shared/interfaces';
import { MaterialService } from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
  providers:[OrderService]
})
export class OrdersPageComponent implements OnInit,OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef : ElementRef
  isRoot: boolean
  modal : MaterialInstance
  pending = false
  oSub : Subscription

  constructor(private router : Router,
    private order : OrderService,
    private ordersService : OrdersService) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/orders'
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd) {
      this.isRoot = this.router.url === '/orders'}
    }
    )
  }
  ngOnDestroy() {
    this.modal.destroy()
    if(this.oSub) {
      this.oSub.unsubscribe()
    }

  }
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }
  removePosition(orderPosition : OrderPosition) {
    this.order.remove(orderPosition)
  }
  open() {
    this.modal.open()
  }
  cancel() {
    this.modal.close()
  }
  submit() {
    this.pending = true

    const order: Order = {
      list: this.order.list.map(item=>{
        delete item._id
        return item
      })
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ № ${newOrder.order} был создан`)
        this.order.clear()
      },error => MaterialService.toast(error.error.message),
      () =>{ this.modal.close()
      this.pending = false}
    )
  }

}
