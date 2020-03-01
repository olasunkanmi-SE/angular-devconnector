import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  @Output() recipeSelected = new EventEmitter<string>();

  displayRecipes(recieved: string) {
    this.recipeSelected.emit(recieved);
  }
}
