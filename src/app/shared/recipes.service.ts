import { ShoppingService } from "./shopping.service";
import { Ingredient } from "./ingredient.model";
import { Recipe } from "./../recipes/recipe.model";
import { Injectable, EventEmitter, Output, Input } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  @Output() ingredientUpdated = new EventEmitter<Ingredient[]>();
  constructor(private shoppingservice: ShoppingService) {}

  @Input() ingredients: Ingredient[];

  recipes: Recipe[] = [
    new Recipe(
      "My first Recipe",
      "This is a test",
      "https://static01.nyt.com/images/2017/09/27/dining/27KITCHENSAUSAGES1/27KITCHENSAUSAGES-articleLarge.jpg",
      [
        { name: "Onions", amount: 50 },
        { name: "FLour", amount: 2 }
      ]
    ),
    new Recipe(
      "My other Recipe",
      "This is a test",
      "https://static01.nyt.com/images/2017/09/27/dining/27KITCHENSAUSAGES1/27KITCHENSAUSAGES-articleLarge.jpg",
      [
        { name: "French Fries", amount: 5 },
        { name: "vegetables", amount: 7 }
      ]
    )
  ];

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.shoppingservice.addIngredientsToShoppingList(ingredient);
  }
}
