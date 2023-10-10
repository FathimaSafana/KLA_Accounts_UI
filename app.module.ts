import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core";
declare let $: any;
import * as jquery from "jquery";
import * as AdminLte from "angular-admin-lte";
import { AuthService } from "./core/services/auth.service";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelpService } from "./shared/services/help.service";
import { ConfigService } from "./core/services/config.service";
import { LayoutModule } from "angular-admin-lte";
//Loading layout module
import { BoxModule } from "angular-admin-lte";
// import { SnackbarModule } from "ngx-snackbar";
import { NgxSpinnerModule } from "ngx-spinner";
import { SnotifyModule } from "ng-snotify";
import { DatePickerComponent } from "./admin/shared/date-picker.component";
import { TabsComponent } from "./layout/tabs/tabs.component";
import { TabComponent } from "./layout/tabs/tab.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { PagerService } from 'src/app/shared/services';
// import { TicketApprovedService } from 'src/app/tourism/shared/services/ticket-approved';
import { ButtonRendererComponent } from '../app/renderer/button-renderer.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  HTTP_INTERCEPTORS,
  HttpClient
} from "@angular/common/http";
import { ButtonViewRendererComponent } from './renderer/button-view-renderer.component';
import { LinkRendererComponent } from './renderer/link-renderer.component';
import { ButtonEditDeleteRendererComponent } from './renderer/button-edit-delete-renderer.component';
//import { EmployerContComponent } from './employer-cont/employer-cont.component';
//import { AddStaffComponent } from './add-staff/add-staff.component';
import { HeadofAccountEditRendererComponent } from './renderer/headofaccount-edit-renderer.component';
import { InterviewReqRendererComponent } from "./renderer/interview-request-renderer.component";
import { RecruitmentRendererComponent } from "./renderer/recruitment-renderer.component";
// import { SelProcessCandListRendererComponent } from "./renderer/selection-proc-cand-list-renderer.component";
import { ShortlistedRequestRendererComponent } from "./renderer/shortlisted-request-renderer.component";
import { DatePipe } from "@angular/common";
//import { TaxMasterComponent } from './tax-master/tax-master.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RoutedApp } from 'meta-spa-router';
import { ROUTED_APP } from "./app.tokens";
import { ConfigLoader } from "./core/services/config.loader";
import { ITDeclarationActionsRendererComponent } from 'src/app/renderer/it-declaration-actions-renderer.component';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
};
//Box component

@NgModule({
  declarations: [AppComponent,
    DatePickerComponent,
    TabsComponent,
    ButtonRendererComponent,
    TabComponent,
    ButtonViewRendererComponent,
    LinkRendererComponent,
    ButtonEditDeleteRendererComponent,
    InterviewReqRendererComponent,
    RecruitmentRendererComponent,
    // SelProcessCandListRendererComponent,
    ShortlistedRequestRendererComponent,
    //EmployerContComponent,
    //AddStaffComponent,
    HeadofAccountEditRendererComponent,
    ITDeclarationActionsRendererComponent
    //TaxMasterComponent,
  ],
  imports: [
    // SnackbarModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    HttpModule,
    HttpClientModule,
    CoreModule,
    LayoutModule,
    BoxModule,
    SnotifyModule,
    NgxSpinnerModule,
    FullCalendarModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    AgGridModule.withComponents([]),
    AgGridModule.withComponents([LinkRendererComponent]),
    AgGridModule.withComponents([ButtonRendererComponent]),
    AgGridModule.withComponents([ButtonViewRendererComponent]),
    AgGridModule.withComponents([ButtonEditDeleteRendererComponent]),
    AgGridModule.withComponents([HeadofAccountEditRendererComponent]),
    AgGridModule.withComponents([ITDeclarationActionsRendererComponent]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [HelpService, AuthService, ConfigService, PagerService, DatePipe,
    [{
      provide: ROUTED_APP,
      useFactory: () => new RoutedApp()
    },
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true,
    }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
