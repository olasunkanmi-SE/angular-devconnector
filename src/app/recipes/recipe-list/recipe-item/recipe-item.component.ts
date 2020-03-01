import { RecipesService } from "./../../../shared/recipes.service";
import { Recipe } from "./../../recipe.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipesservice: RecipesService) {}

  onRecipeSelected() {
    this.recipesservice.recipeSelected.emit(this.recipe);
  }

  ngOnInit() {}
}
