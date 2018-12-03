import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private auth: AuthService,
              private recipeService: RecipeService) {}

  saveData() {
    const token = this.auth.getToken();
    return this.http.put(
      environment.apiUrl + '?auth=' + token,
      this.recipeService.getRecipes());
  }

  fetchData() {
    const token = this.auth.getToken();
    return this.http.get(
      environment.apiUrl + '?auth=' + token
    ).pipe(map(
      (response: Recipe[]) => {
        const recipes: Recipe[] = response;
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }


}
