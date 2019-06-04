import { Component, OnInit } from '@angular/core';
import { СategoryService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  constructor(private categoriesService: СategoryService) { }

  categories$ : Observable<Category[]>

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()

  }

}
