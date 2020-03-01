import { Ingredient } from "./../../shared/ingredient";
import { ShoppingService } from "./../../shared/shopping.service";
import { RecipesService } from "./../../shared/recipes.service";
import { Recipe } from "./../recipe.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  depend: boolean = false;

  constructor(private recipeservices: RecipesService) {}

  handleToggle() {
    this.depend = !this.depend;
  }

  updateShoppingList() {
    this.recipeservices.addIngredientsToShoppingList(this.recipe.ingredients);
    console.log(this.recipe.ingredients);
  }

  ngOnInit() {}
}
