import { RecipesService } from "./../shared/recipes.service";
import { Recipe } from "./recipe.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"]
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipesservice: RecipesService) {}

  ngOnInit() {
    this.recipesservice.recipeSelected.subscribe(
      (recip: Recipe) => (this.recipe = recip)
    );
  }
}
