import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { SiteGraphComponent } from './site-graph/site-graph.component';
import { SiteGridComponent } from './site-grid/site-grid.component';
import { NgbModule } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    TranslateModule,
    FormsModule,
    NgbModule.forRoot(),
    
  ],
  declarations: [ReportComponent, SiteGraphComponent, SiteGridComponent]
})
export class ReportModule { }
