import { RecipesService } from "./../../shared/recipes.service";
import { Recipe } from "./../recipe.model";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  constructor(private recipeservice: RecipesService) {}

  recipes: Recipe[];

  ngOnInit() {
    this.recipes = this.recipeservice.recipes;
  }
}
