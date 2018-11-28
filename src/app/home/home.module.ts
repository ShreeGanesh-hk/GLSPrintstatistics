import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {HeaderComponent} from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    NgbDropdownModule.forRoot()
  ],
  declarations: [HomeComponent, HeaderComponent, SliderComponent]
})
export class HomeModule { }
