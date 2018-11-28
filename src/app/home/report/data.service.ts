import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private  httpClient:  HttpClient) { }

  getSiteInfo(){
    return this.httpClient.get('http://localhost:60564/api/SiteChart/Labelok');
  }
}
