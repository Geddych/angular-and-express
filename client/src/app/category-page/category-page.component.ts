import { Component, OnInit } from '@angular/core';
import {СategoryService} from '../shared/services/category.service'
import { Category } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  
  categories$: Observable<Category[]>

  constructor(private categoriesService: СategoryService) { }

  ngOnInit() {

    this.categories$ = this.categoriesService.fetch()
    
  }

}
