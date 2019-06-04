import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewPage, AnalyticPage } from '../interfaces';


@Injectable({
    providedIn:'root'
})
export class  AnalyticsService {
    constructor(private http: HttpClient) {}

    getOverview():Observable<OverviewPage> {
        return this.http.get<OverviewPage>('/api/analytic/overview')
    }

    getAnalytic(): Observable<AnalyticPage> {
        return this.http.get<AnalyticPage>('/api/analytic/analytic')
    }
}