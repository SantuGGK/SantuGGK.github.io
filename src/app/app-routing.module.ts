import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';



/**
 * DashboardModule function call
 * @returns DashboardModule
 */
export function loadDashboardModule() {
  return DashboardModule;
}

const routes: Routes = [
  { path: '', component: LoginComponent, data: { routeName: "Login" } },
  { path: 'report', loadChildren: loadDashboardModule,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
