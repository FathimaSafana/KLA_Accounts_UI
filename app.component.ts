import { Component, AfterViewInit, HostListener, Inject } from "@angular/core";
import { AuthService } from "./core/services";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { EditModel } from "./shared/models";
import { RoutedApp } from 'meta-spa-router';
import { ROUTED_APP } from "./app.tokens";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
// export class AppComponent {
//   title = "version-test";
// }
export class AppComponent implements AfterViewInit {
  messages = ''; alreadyFired = false;
  constructor(private translate: TranslateService, private authService: AuthService, private router: Router, @Inject(ROUTED_APP) private routedApp: RoutedApp,) {
    this.translate.setDefaultLang("mal");
    this.initRoutedApp();
  }

  initRoutedApp() {
    this.routedApp.config({
      appId: 'Accounts',
      handleNotification: (tag, data) => console.debug('received broadcast', { tag, data }),
      allowedOrigins: 'same-origin'
    });
    this.routedApp.init();

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      // When we change the route in the client app, tell the shell about it:
      this.routedApp.sendRoute(e.url);
    });
    // When the shell changes the route, we have to tell our router about it:
    this.routedApp.registerForRouteChange(url => this.router.navigateByUrl(url));
  }

  ngAfterViewInit() {
    this.authService.getSessionData();
  }

  ngOnInit() {
    if (window.opener)
      window.opener.postMessage('KLA_App', '*');
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    if (this.alreadyFired) {
      return;
    }
    this.alreadyFired = true;
    this.handleMessage(event);
  }

  reqObjectModel: EditModel;

  handleMessage(event) {
    console.log(event.data)
    this.reqObjectModel = event.data
    if (this.reqObjectModel.fromApp == 'KLA') {
      localStorage.removeItem('authToken');
      localStorage.setItem('authToken', this.reqObjectModel.authToken);
      localStorage.setItem('SSO', 'true')
    }
    else if (this.reqObjectModel.fromApp == 'FMS') {
      sessionStorage.setItem('authToken', this.reqObjectModel.authToken);
      localStorage.setItem('authToken', this.reqObjectModel.authToken);
      this.authService.setUserData(this.reqObjectModel.authToken)
      this.authService.setAuth(this.authService.setUserData(this.reqObjectModel.authToken))
      this.authService.isLoggedIn = true;
      sessionStorage.setItem('fromApp', this.reqObjectModel.fromApp)
      sessionStorage.setItem('id', this.reqObjectModel.refId);
      let url = '';
      switch (this.reqObjectModel.reqSubType) {
        case "Consolidated Budget Request": {
          let id = this.reqObjectModel.refId;
          url = '/budget/add-consolidated-budget-request/:id;id=' + id;
          break;
        }
        case "CouponDisbursement": {
          let id = this.reqObjectModel.refId;
          url = '/coupon/coupon-disbursement-add/:id;id=' + id;
          break;
        }
        case "TA DA Request": {
          let id = this.reqObjectModel.refId;
          url = '/claims/add-ta-da-request/:id;id=' + id;
          break;
        }
        default: {
          //statements;
          break;
        }
      }
      this.router.navigateByUrl(url)
    }
  }
}
