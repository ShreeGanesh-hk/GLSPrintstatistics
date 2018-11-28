import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import {Dashboard,TrendChart} from './dashboardmodel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private  httpClient:  HttpClient) { }

  getDashboardData() {
    return this.httpClient.get<Dashboard[]>('http://localhost:60564/api/SiteChart/GetDashboard');
  }

  getTrendData() {
    return this.httpClient.get<TrendChart[]>('http://localhost:60564/api/SiteChart/TrendChart');
  }

  getTrendMonthlyData() {
    return this.httpClient.get<TrendChart[]>('http://localhost:60564/api/SiteChart/TrendMonthlyChart');
  }
}
