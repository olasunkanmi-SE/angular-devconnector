import { Recipe } from "./recipes/recipe.model";
import { RecipesService } from "./shared/recipes.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  loadedPage: string = "recipes";
  onNavigate(feature: string) {
    this.loadedPage = feature;
  }

  constructor(private recipesservice: RecipesService) {}

  ngOnInit() {}
}
