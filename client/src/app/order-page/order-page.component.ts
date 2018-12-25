import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { OrderPosition, Order } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance  
  isRoot: boolean
  pending = false
  oSub: Subscription

  constructor(private router: Router,
              private order: OrderService,
              private ordersService: OrdersService) { }

  ngOnInit() {
    this.isRoot = this.router.url === "/order"
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === "/order"
      }
    })
  }

  ngOnDestroy(){
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  removePosition(orderPosition: OrderPosition){
    this.order.remove(orderPosition)
  }

  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)
  }

  open(){
    this.modal.open()
  }

  cancel(){
    this.modal.close()
  }

  submit(){ 
    this.pending = true

    this.modal.close()

    const order: Order = {
      list: this.order.list.map( item => {
        delete item._id
        return item
      })
    }
    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Order №${newOrder.order} successful`)
        this.order.clear()
      },
        error => MaterialService.toast(error.error.message),
        () => {
          this.modal.close()
          this.pending = false
        }
    )
  }
}
