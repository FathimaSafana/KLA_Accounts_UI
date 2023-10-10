import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthService } from "./core/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

const routes: Routes = [

  {
    path: "",
    loadChildren: "./layout/layout.module#LayoutModule",
    canActivate: [AuthService]
  },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
