import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Position } from 'src/app/shared/interfaces';
import { OrderService } from '../order.service';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private order: OrderService) { }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
      ),
      map(
        (positions: Position[]) => {
          return positions.map(positions => {
            positions.quantity = 1  
            return positions
          })
        }
      )
    )
  }

  addToOrder(position: Position){
    MaterialService.toast(`Добавлено x${position.quantity}`)
    this.order.add(position)
  }
}
