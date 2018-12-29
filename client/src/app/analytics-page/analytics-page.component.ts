import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { Chart }  from 'chart.js';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  aSub: Subscription
  average: Number
  pending = true

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)'
    }
    
    const orderConfig: any = {
      label: 'Order',
      color: 'rgb(53, 162, 233)'
    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average
      
      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.gain)

      // gainConfig.labels.push('28.12.2018')
      // gainConfig.labels.push('28.12.2018')
      // gainConfig.labels.push('28.12.2018')
      // gainConfig.data.push(1500)
      // gainConfig.data.push(500)
      // gainConfig.data.push(2500)

      // orderConfig.labels.push('28.12.2018')
      // orderConfig.labels.push('28.12.2018')
      // orderConfig.labels.push('28.12.2018')
      // orderConfig.data.push(1500)
      // orderConfig.data.push(500)
      // orderConfig.data.push(2500)
    

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'

      new Chart(gainCtx, createChartConfig(gainConfig))
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending = false
    })
  }

  ngOnDestroy(){
    if (this.aSub){
      this.aSub.unsubscribe()
    }
    

  }

}

function createChartConfig({labels, data, label, color}){
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
