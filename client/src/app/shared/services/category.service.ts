import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Message } from '../interfaces';
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
        var jsoncat = {};
        fd.forEach((value, key) => {jsoncat[key] = value});
        var json = JSON.stringify(jsoncat);

        return this.http.post<Category>('/api/category',jsoncat)
    }

    update(id:string,name:string) {
        const fd = new FormData()
        fd.append('name',name)
        var jsoncat = {};
        fd.forEach((value, key) => {jsoncat[key] = value});
        var json = JSON.stringify(jsoncat);


        return this.http.patch<Category>(`api/category/${id}`,jsoncat)
    }


    delete (id:string): Observable<Message> {
        return this.http.delete<Message>(`api/category/${id}`)
    }


    }
