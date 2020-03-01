import { Recipe } from "../recipes/recipe.model";
import { ShoppingService } from "./../shared/shopping.service";
import { Ingredient } from "./../shared/ingredient.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  @Input() recipe: Recipe;
  ingredients: Ingredient[];
  ingredient: Ingredient;
  constructor(private shoppingservice: ShoppingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingservice.getIngredients();
    this.shoppingservice.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
  }
}
