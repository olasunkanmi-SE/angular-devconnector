import { Ingredient } from "./ingredient.model";
import { Injectable, EventEmitter, Output } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ShoppingService {
  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Egusi", 1),
    new Ingredient("Broccholi", 5)
  ];

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
