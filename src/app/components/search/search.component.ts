import { Post } from "./../../shared/post";
import { DataService } from "./../../shared/data.service";
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  @Input() post: Post;
  myForm: FormGroup;
  constructor(private dataservice: DataService) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      search: new FormControl("")
    });
  }

  onSelectOption() {
    this.dataservice.handleSelect(this.post);
  }
}
