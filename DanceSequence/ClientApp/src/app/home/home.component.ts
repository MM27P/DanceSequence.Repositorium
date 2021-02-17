import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Count } from '../model/count';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public  count: Count;
  constructor(public main: AppComponent)
  {}

  ngOnInit() {
    console.log("Home.Components.Constructor");
    this.main.moveService.CountEntity().subscribe(
      data=>
      {
        this.count = new Count(data["danceNumber"], data["moveNumber"], data["sequenceNumber"]);
      }
    )
  }
}
