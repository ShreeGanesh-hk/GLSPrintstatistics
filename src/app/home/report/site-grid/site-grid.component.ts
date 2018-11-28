import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import { networkInterfaces } from 'os';

@Component({
  selector: 'app-site-grid',
  templateUrl: './site-grid.component.html',
  styleUrls: ['./site-grid.component.scss']
})


export class SiteGridComponent implements OnInit {
  public isCollapsed = false;
  today: number = Date.now();
  
  
  private SiteList :Array<object> =[];
  constructor(private _dataService:DataService) { }
  ngOnInit() {
    this.getSiteDetails();
    
  }
  public getSiteDetails(){
    this._dataService.getSiteInfo().subscribe((data:Array<Object>)=>{
      this.SiteList = data;
      console.log(data);
    })
  }

  
  

}

