import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Dashboard, TrendChart } from './dashboardmodel';
import { DataService } from './data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

  today: number = Date.now();

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scaleShowValues: true,
    scaleValuePaddingX: 10,
    scaleValuePaddingY: 10,
    exportEnabled: true,
    legend: {position: 'top'},
    animation: {
      onComplete: function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font = "12px Arial";
        ctx.fillStyle = "Black";
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
    scales: {
      xAxes: [{
        stacked: false,
        id: "bar-x-axis1",
        barThickness: 30,
      }],

      yAxes: [{
        id: "bar-y-axis1",
        stacked: false,
        ticks: {
          beginAtZero: true
        },
      },
      {
        id: "bar-y-axis2",
        display: false,
        stacked: false,
        ticks: {
          beginAtZero: true,
          max: 100000
        },
      }]

    }
  };

  public lineChartOptions : any = {
    responsive : true,
    scaleShowVerticalLines: true,
    legend: {position: 'right'},
    animation: {
      onComplete: function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font = "12px Arial";
        ctx.fillStyle = "Black";
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (line, index) {
            var data = dataset.data[index];
            ctx.fillText(data, line._model.x, line._model.y - 5);
          });
        });
      }
    }
    
  };


  public barChartData: any[];
  public lineChartData: any[];
  public line2ChartData: any[];
  public NoOfPrintOuts: any[] = [];
  public PrintoutsPerDayLastMonth: any[] = [];
  public PrintoutsPerDaySinceStart: any[] = [];

  public barChartLabels: string[] = [];
  public lineChartLabels: string[] = [];
  public line2ChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public lineChartType: string = 'line';
  public barChartLegend: boolean = true;
  public lineChartLegend: boolean = true;

  _trendata: TrendChart;
  _trendatas: TrendChart[] =[];
  _trendatas2: TrendChart[] =[];
  _dashoards: Dashboard[] = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.getDashboardData();
    this.getTrendChartData();
    this.getTrendMonthlyChartData();

  }

  getDashboardData(): void {


    let result;
    this._dataService.getDashboardData().subscribe(data => {
      data.forEach(element => {
        this._dashoards.push({
          Site: element.Site,
          NoOfPrintOuts: element.NoOfPrintOuts,
          PrintoutsPerDayLastMonth: element.PrintoutsPerDayLastMonth,
          PrintoutsPerDaySinceStart: element.PrintoutsPerDaySinceStart
        })

        this.barChartLabels.push(element.Site);
        this.NoOfPrintOuts.push(element.NoOfPrintOuts);
        this.PrintoutsPerDayLastMonth.push(element.PrintoutsPerDayLastMonth);
        this.PrintoutsPerDaySinceStart.push(element.PrintoutsPerDaySinceStart);
      });
      this.barChartData = [];

      this.barChartData.push(
        { data: this.NoOfPrintOuts, label: 'Number of PrintOuts', yAxisID: "bar-y-axis1" },
        { data: this.PrintoutsPerDayLastMonth, label: 'PrintOuts per day last month', yAxisID: "bar-y-axis2" },
        { data: this.PrintoutsPerDaySinceStart, label: 'PrintOuts per day Since Start', yAxisID: "bar-y-axis2" })
      console.log("Summary Chart is populated");
    });
  }

  getTrendChartData(): void {
    this._dataService.getTrendData().subscribe(data => {
      data.forEach(item => {
      this._trendata = item;
        this._trendatas.push(this._trendata);
      });      
      this.lineChartLabels = Object.keys(this._trendata).slice(1,-1);
      this.lineChartData = [];
      this._trendatas.forEach(element => {
        this.lineChartData.push(
          {data : [element.January,element.February,element.March,element.April,element.May,element.June,
          element.July,element.August,element.September,element.October,element.November,element.December] , label : element.Site })
      });
      console.log("Trend Chart is populated");

    })
  }

  getTrendMonthlyChartData(): void {
    
    this._dataService.getTrendMonthlyData().subscribe(data => {
      data.forEach(item => {
        this._trendata = item;
        this._trendatas2.push(item);
      });      
      this.line2ChartLabels = Object.keys(this._trendata).slice(1,-1);
      this.line2ChartData = [];
      this._trendatas2.forEach(element => {
        this.line2ChartData.push(
          {data : [element.January,element.February,element.March,element.April,element.May,element.June,
          element.July,element.August,element.September,element.October,element.November,element.December] , label : element.Site })
      });
      console.log("Trend Monthly report populated");
    })
  }

  public barChartColors: Array<any> = [
    { // grey
      backgroundColor: '#ffc107',
      borderColor: '#ffc107',
      pointBackgroundColor: '#ffc107',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ffc107'
    },
    { // dark grey
      backgroundColor: '#28a745',
      borderColor: '#28a745',
      pointBackgroundColor: '#28a745',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#28a745'
    },
    { // grey
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      pointBackgroundColor: '#007bff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#007bff'
    }
  ];

  public lineChartColors = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#F44336',      
      pointHoverBackgroundColor: '#F44336'          
    },
    { // dark grey
      backgroundColor: 'transparent',
      borderColor: '#03A9F4',
      pointHoverBackgroundColor : '#03A9F4'
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#9C27B0',
      pointHoverBackgroundColor : '#9C27B0'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#673AB7',
      pointHoverBackgroundColor : '#673AB7'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#3F51B5',
      pointHoverBackgroundColor : '#3F51B5'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#00BCD4',
      pointHoverBackgroundColor : '#00BCD4'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#0D47A1',
      pointHoverBackgroundColor : '#0D47A1'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#009688',
      pointHoverBackgroundColor : '#009688'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#4CAF50',
      pointHoverBackgroundColor : '#4CAF50'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#FF9800',
      pointHoverBackgroundColor : '#FF9800'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#880E4F',
      pointHoverBackgroundColor : '#880E4F'      
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#3E2723',
      pointHoverBackgroundColor : '#3E2723'      
    }
    
    ];



  // events

  public downloadCanvas(event) {
    // get the `<a>` element from click event
    var anchor = event.target;
    // get the canvas, I'm getting it by tag name, you can do by id
    // and set the href of the anchor to the canvas dataUrl
    anchor.href = document.getElementById('summarychart')[1].toDataURL();
    // set the anchors 'download' attibute (name of the file to be downloaded)
    anchor.download = "test.png";
}
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
