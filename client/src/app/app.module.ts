import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoryFormComponent } from './category-page/category-form/category-form.component';
import { PositionFormComponent } from './category-page/category-form/position-form/position-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrdersPageComponent,
    CategoryPageComponent,
    LoaderComponent,
    CategoryFormComponent,
    PositionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    multi:true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
