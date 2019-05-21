import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class СategoryService {
    constructor(private http:HttpClient) {
    }
    fetch(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/category')
    }

    getById(id:string):Observable<Category> {
        
       return this.http.get<Category>(`/api/category/${id}`)
    }
    create(name:string):Observable<Category> {
        const fd = new FormData()
        fd.append('name',name)


        return this.http.post<Category>('/api/category',fd)
    }

    update(id:string,name:string) {
        const fd = new FormData()
        fd.append('name',name)


        return this.http.patch<Category>(`api/category/${id}`,fd)
    }
    }
