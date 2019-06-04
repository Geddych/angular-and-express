import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { CategoryFormComponent } from './category-page/category-form/category-form.component';
import { OrderCategoriesComponent } from './orders-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './orders-page/order-positions/order-positions.component';

const routes: Routes = [
    {
        path:'',
        component: AuthLayoutComponent,
        children:[
            {path:'',redirectTo:'/login',pathMatch:'full'},
            {
                path:'login',component:LoginPageComponent
            },
            {
                path:'register',component:RegisterPageComponent
            }
        ]
    },
    {
        path:'',
        component:SiteLayoutComponent,
        canActivate:[AuthGuard],
        children:[
            {path:'overview',component:OverviewPageComponent},
            {path:'analytics',component:AnalyticsPageComponent},
            {path:'history',component:HistoryPageComponent},
            {path:'orders',component:OrdersPageComponent,children: [
               { path:'', component:OrderCategoriesComponent},
               {path:':id',component: OrderPositionsComponent}
            ]},
            {path:'categories',component:CategoryPageComponent},
            {path:'categories/new',component:CategoryFormComponent},
            {path:'categories/:id',component:CategoryFormComponent}

        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule {
    
}