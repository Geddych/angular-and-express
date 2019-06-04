import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { СategoryService } from 'src/app/shared/services/category.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';



@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  form : FormGroup
  isNew = true
  category : Category

  constructor(private route:ActivatedRoute,
    private categoriesService: СategoryService,
    private router: Router
   ) { }

  ngOnInit() {
   this.form = new FormGroup({
     name: new FormControl(null,Validators.required)
   })
   
    this.route.params.pipe(switchMap(
        (params:Params)=> {
          if (params['id']) {
            this.isNew = false
            return this.categoriesService.getById(params['id'])
          } 
          return of(null) 
        }
      )
    ).subscribe(
      category => {
        if (category) {
          this.category = category
          this.form.patchValue({
            name: category.name
          })

          MaterialService.updateTextInputs()
        }
    },
    error => MaterialService.toast(error.error.message))
    
     
    }
  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
    obs$ =  this.categoriesService.create(this.form.value.name)
    } else {
     obs$ = this.categoriesService.update(this.category._id,this.form.value.name)
    }
    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены')
        this.form.enable()

      },
      error => {
        this.form.enable()
        MaterialService.toast(error.error.message)
      }
    )
      }

      deleteCategory() {
        const decision = window.confirm(`Уверены что хотите удалить категорию ${this.category.name}`)
        if (decision) {
          this.categoriesService.delete(this.category._id).subscribe(
            response => MaterialService.toast(response.message),
            error => MaterialService.toast(error.error.message),
            ()=> this.router.navigate(['/categories'])
          )
        }
      }
  
  
    }


